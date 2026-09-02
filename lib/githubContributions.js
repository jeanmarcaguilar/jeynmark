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

const LEVELS = [
  'NONE',
  'FIRST_QUARTILE',
  'SECOND_QUARTILE',
  'THIRD_QUARTILE',
  'FOURTH_QUARTILE',
];

function wrapCalendar(totalContributions, contributionDays) {
  return {
    data: {
      user: {
        contributionsCollection: {
          contributionCalendar: {
            totalContributions,
            weeks: [{ contributionDays }],
          },
        },
      },
    },
  };
}

async function fetchFromPublicApi(username, year) {
  const response = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=${year}`,
    { headers: { 'User-Agent': 'portfolio-github-contributions' } }
  );
  const data = await response.json();

  if (!response.ok) {
    return {
      status: response.status,
      body: { error: data.error || 'Public contributions API returned an error.' },
    };
  }

  const contributions = data.contributions ?? [];
  const total = data.total?.[String(year)] ?? contributions.reduce((sum, day) => sum + (day.count ?? 0), 0);

  return {
    status: 200,
    body: wrapCalendar(
      total,
      contributions.map((day) => ({
        date: day.date,
        contributionCount: day.count ?? 0,
        contributionLevel: LEVELS[day.level] ?? 'NONE',
      }))
    ),
  };
}

export async function fetchGithubContributions({ token, username, year }) {
  if (token) {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'User-Agent': 'portfolio-github-contributions',
      },
      body: JSON.stringify({
        query: GH_QUERY,
        variables: {
          login: username,
          from: `${year}-01-01T00:00:00Z`,
          to: `${year}-12-31T23:59:59Z`,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        status: response.status,
        body: { error: data.message || 'GitHub API returned an error.' },
      };
    }

    if (data.errors) {
      return {
        status: 502,
        body: { error: data.errors[0]?.message || 'GitHub GraphQL returned an error.' },
      };
    }

    return { status: 200, body: data };
  }

  return fetchFromPublicApi(username, year);
}
