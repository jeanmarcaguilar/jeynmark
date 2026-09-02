import { createServer } from 'node:http';
import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawn } from 'node:child_process';

const PORT = 8888;
const REDIRECT_URI = `http://127.0.0.1:${PORT}/callback`;
const ENV_PATH = resolve(process.cwd(), '.env');
const SCOPES = [
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-read-playback-state',
].join(' ');

function loadEnv() {
  if (!existsSync(ENV_PATH)) return;
  for (const line of readFileSync(ENV_PATH, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^['"]|['"]$/g, '');
    if (!(key in process.env)) process.env[key] = value;
  }
}

function upsertEnv(key, value) {
  let content = existsSync(ENV_PATH) ? readFileSync(ENV_PATH, 'utf8') : '';
  const line = `${key}=${value}`;
  const pattern = new RegExp(`^${key}=.*$`, 'm');
  if (pattern.test(content)) {
    content = content.replace(pattern, line);
  } else {
    content = `${content.trimEnd()}\n${line}\n`;
  }
  writeFileSync(ENV_PATH, content);
}

function openBrowser(url) {
  if (process.platform === 'win32') {
    spawn('cmd', ['/c', 'start', '', url], {
      detached: true,
      stdio: 'ignore',
      windowsHide: true,
    }).unref();
    return;
  }

  spawn(process.platform === 'darwin' ? 'open' : 'xdg-open', [url], {
    detached: true,
    stdio: 'ignore',
  }).unref();
}

function htmlPage(title, body) {
  return `<!doctype html>
<html><head><meta charset="utf-8"><title>${title}</title></head>
<body style="font-family:sans-serif;background:#050505;color:#fff;padding:2rem">
${body}
</body></html>`;
}

loadEnv();

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  console.error('Add SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET to your .env file first.');
  process.exit(1);
}

const authorizeUrl =
  'https://accounts.spotify.com/authorize?' +
  new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    scope: SCOPES,
    show_dialog: 'true',
  }).toString();

const server = createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT_URI);

  if (url.pathname !== '/callback') {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
    return;
  }

  const error = url.searchParams.get('error');
  const code = url.searchParams.get('code');

  if (error) {
    res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(htmlPage('Spotify login failed', `<p>Spotify returned: ${error}</p>`));
    console.error(`Spotify login failed: ${error}`);
    return;
  }

  if (!code) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(htmlPage(
      'Waiting for Spotify',
      `<p>This tab opened without a login code. Keep this window running and sign in from the Spotify page, or open the authorize URL from the terminal.</p>`
    ));
    return;
  }

  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });

  const data = await tokenRes.json();
  if (!tokenRes.ok || !data.refresh_token) {
    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(htmlPage(
      'Token exchange failed',
      `<p>${data.error_description || data.error || 'Could not get a refresh token. Try again.'}</p>`
    ));
    console.error(data);
    return;
  }

  upsertEnv('SPOTIFY_REFRESH_TOKEN', data.refresh_token);
  console.log('\nSpotify connected. Refresh token saved to .env\n');

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(htmlPage('Spotify connected', '<p>Spotify connected. You can close this tab and return to the terminal.</p>'));
  setTimeout(() => process.exit(0), 250);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('Waiting for Spotify login.');
  console.log('In the Spotify Dashboard, Redirect URI must be exactly:');
  console.log(`  ${REDIRECT_URI}\n`);
  console.log('If the Spotify page does not open, paste this URL in your browser:\n');
  console.log(authorizeUrl + '\n');
  openBrowser(authorizeUrl);
});
