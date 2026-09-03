import { existsSync, mkdirSync, readFileSync, writeFile } from 'node:fs';
import { dirname, resolve } from 'node:path';

const FILE_PATH = resolve(process.cwd(), 'data/live-viewers.json');
const TTL_MS = 12_000;
const REDIS_KEY = 'portfolio:live-viewers';
const sessions = new Map();
let saveTimeout = null;

function isValidId(id) {
  return typeof id === 'string' && /^[a-zA-Z0-9_-]{8,64}$/.test(id);
}

function prune(now = Date.now()) {
  for (const [id, seenAt] of sessions) {
    if (now - seenAt > TTL_MS) sessions.delete(id);
  }
}

function readFileSessions() {
  if (!existsSync(FILE_PATH)) return;
  try {
    const data = JSON.parse(readFileSync(FILE_PATH, 'utf8'));
    const now = Date.now();
    for (const [id, seenAt] of Object.entries(data.sessions || {})) {
      if (isValidId(id) && now - seenAt <= TTL_MS) sessions.set(id, seenAt);
    }
  } catch {
    // Ignore a corrupt local cache and start from the in-memory map.
  }
}

function queueWriteFileSessions() {
  if (saveTimeout) return;
  saveTimeout = setTimeout(() => {
    saveTimeout = null;
    try {
      mkdirSync(dirname(FILE_PATH), { recursive: true });
      writeFile(
        FILE_PATH,
        `${JSON.stringify({ sessions: Object.fromEntries(sessions) }, null, 2)}\n`,
        () => {},
      );
    } catch {
      // Ignore background file writing errors.
    }
  }, 3_000);
}

async function upstash(commands, env) {
  const url = env.UPSTASH_REDIS_REST_URL;
  const token = env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  const endpoint = `${String(url).replace(/\/$/, '')}/pipeline`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commands),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Upstash request failed.');
  return data;
}

function liveCount() {
  prune();
  return sessions.size;
}

export async function updateLiveViewers({ env, id, leave = false }) {
  const now = Date.now();
  const canUseFile = !env.VERCEL && !env.NOW_REGION;

  if (canUseFile && sessions.size === 0) readFileSessions();

  try {
    const redis = await upstash(
      [
        leave && id ? ['ZREM', REDIS_KEY, id] : id ? ['ZADD', REDIS_KEY, now, id] : ['ZCARD', REDIS_KEY],
        ['ZREMRANGEBYSCORE', REDIS_KEY, 0, now - TTL_MS],
        ['ZCARD', REDIS_KEY],
      ].filter(Boolean),
      env,
    );

    if (redis) {
      const card = Array.isArray(redis) ? redis[redis.length - 1]?.result : redis.result;
      return { status: 200, body: { live: Number(card) || 0 } };
    }
  } catch (error) {
    return { status: 502, body: { error: error.message } };
  }

  if (id) {
    if (leave) sessions.delete(id);
    else sessions.set(id, now);
  }

  prune(now);
  if (canUseFile) queueWriteFileSessions();

  return { status: 200, body: { live: liveCount() } };
}

export function readJsonBody(req) {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    return Promise.resolve(req.body);
  }

  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8');
      if (!raw) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
}

export { isValidId };
