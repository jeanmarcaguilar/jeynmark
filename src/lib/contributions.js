const USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'jeanmarcaguilar';
export const CONTRIB_YEAR = new Date().getFullYear();

const LEVELS = [
  'NONE',
  'FIRST_QUARTILE',
  'SECOND_QUARTILE',
  'THIRD_QUARTILE',
  'FOURTH_QUARTILE',
];

const CACHE_KEY = `gh-contrib:${USERNAME}:${CONTRIB_YEAR}`;
const PUBLIC_URL = `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=${CONTRIB_YEAR}`;

export function readContribCache() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (!parsed?.weeks) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeContribCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    /* quota / private mode */
  }
}

function fromPublicApi(data) {
  const contributions = data.contributions ?? [];
  const total =
    data.total?.[String(CONTRIB_YEAR)] ??
    contributions.reduce((sum, day) => sum + (day.count ?? 0), 0);

  return {
    total,
    weeks: [
      {
        contributionDays: contributions.map((day) => ({
          date: day.date,
          contributionCount: day.count ?? 0,
          contributionLevel: LEVELS[day.level] ?? 'NONE',
        })),
      },
    ],
  };
}

function fromGraphql(json) {
  const cal = json?.data?.user?.contributionsCollection?.contributionCalendar;
  if (!cal?.weeks) throw new Error('Invalid contribution payload');
  return { total: cal.totalContributions, weeks: cal.weeks };
}

async function loadContributions() {
  try {
    const res = await fetch(PUBLIC_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = fromPublicApi(await res.json());
    writeContribCache(data);
    return data;
  } catch {
    const res = await fetch('/api/github-contributions');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = fromGraphql(await res.json());
    writeContribCache(data);
    return data;
  }
}

let inflight = null;

export function prefetchContributions(force = false) {
  if (force || !inflight) {
    inflight = loadContributions().catch((err) => {
      inflight = null;
      throw err;
    });
  }
  return inflight;
}

if (typeof window !== 'undefined') {
  prefetchContributions();
}
