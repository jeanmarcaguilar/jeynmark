import { isValidId, readJsonBody, updateLiveViewers } from '../lib/liveViewers.js';

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let id;
    let leave = false;
    if (req.method === 'POST') {
      const body = await readJsonBody(req);
      id = body.id;
      leave = Boolean(body.leave);
      if (!isValidId(id)) {
        return res.status(400).json({ error: 'A valid viewer id is required.' });
      }
    }

    const { status, body } = await updateLiveViewers({
      env: process.env,
      id,
      leave,
    });
    res.setHeader('Cache-Control', 'no-store');
    return res.status(status).json(body);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
