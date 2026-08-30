export default async function handler(req, res) {
  // Access the server-side environment variable
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_USERNAME = process.env.VITE_GITHUB_USERNAME || 'jeanmarcaguilar';
  const YEAR = new Date().getFullYear();

  if (!GITHUB_TOKEN) {
    return res.status(500).json({ 
      error: 'Missing GITHUB_TOKEN in environment variables.' 
    });
  }

  const GH_QUERY = `
    query($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        // GitHub requires a User-Agent header; missing it causes 403 Forbidden
        'User-Agent': 'Vercel-Serverless-Function-App',
      },
      body: JSON.stringify({
        query: GH_QUERY,
        variables: {
          login: GITHUB_USERNAME,
          from: `${YEAR}-01-01T00:00:00Z`,
          to: `${YEAR}-12-31T23:59:59Z`,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ 
        error: data.message || 'GitHub API returned an error.' 
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}