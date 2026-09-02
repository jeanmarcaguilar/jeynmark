import { fetchSpotifyNowPlaying } from '../lib/spotifyNowPlaying.js';

export default async function handler(req, res) {
  try {
    const { status, body } = await fetchSpotifyNowPlaying({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      refreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
    });

    if (status === 200 && body.configured !== false) {
      res.setHeader('Cache-Control', 'public, s-maxage=8, stale-while-revalidate=20');
    } else {
      res.setHeader('Cache-Control', 'no-store');
    }

    return res.status(status).json(body);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
