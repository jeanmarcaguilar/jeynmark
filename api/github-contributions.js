import { fetchGithubContributions } from '../lib/githubContributions.js';

export default async function handler(req, res) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_USERNAME = process.env.VITE_GITHUB_USERNAME || 'jeanmarcaguilar';
  const YEAR = new Date().getFullYear();

  try {
    const { status, body } = await fetchGithubContributions({
      token: GITHUB_TOKEN,
      username: GITHUB_USERNAME,
      year: YEAR,
    });
    if (status === 200) {
      res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=86400');
    }
    return res.status(status).json(body);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
