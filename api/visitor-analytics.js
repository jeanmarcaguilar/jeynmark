import { processVisitorAnalytics } from '../lib/visitorAnalytics.js';
import { readJsonBody } from '../lib/liveViewers.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const payload = await readJsonBody(req);
    const { status, body } = await processVisitorAnalytics({
      req,
      env: process.env,
      payload,
    });
    res.setHeader('Cache-Control', 'no-store');
    return res.status(status).json(body);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
