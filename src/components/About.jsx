// ==========================================
// FILE 2: src/components/About.jsx
// ==========================================

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, GitCommit, RefreshCw } from 'lucide-react';
import profileImg from '../assets/images/profile.jpg';
import { CONTRIB_YEAR, prefetchContributions, readContribCache } from '../lib/contributions';

const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'jeanmarcaguilar';
const YEAR = CONTRIB_YEAR;
const initialCache = typeof window !== 'undefined' ? readContribCache() : null;

const COLOR_LEVELS = [
  'bg-zinc-900',      // 0 – none
  'bg-emerald-950',   // 1 – low
  'bg-emerald-800',   // 2 – medium
  'bg-emerald-600',   // 3 – high
  'bg-emerald-400',   // 4 – very high
];

const LEVEL_MAP = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

/** Build Sun-aligned grid from API weeks data */
function buildGrid(weeks, year) {
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const dayMap = {};
  weeks.forEach(week =>
    week.contributionDays.forEach(d => { dayMap[d.date] = d; })
  );

  const startDate = new Date(year, 0, 1);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  const endDate = new Date(year, 11, 31);
  endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

  const days = [];
  let cur = new Date(startDate);

  while (cur <= endDate) {
    const y = cur.getFullYear();
    const mo = String(cur.getMonth() + 1).padStart(2, '0');
    const d = String(cur.getDate()).padStart(2, '0');
    const key = `${y}-${mo}-${d}`;

    const isCurrentYear = y === year;
    const isPastOrToday = isCurrentYear && cur <= today;
    const apiDay = dayMap[key];
    const level = apiDay ? (LEVEL_MAP[apiDay.contributionLevel] ?? 0) : 0;

    days.push({
      date: new Date(cur),
      count: apiDay?.contributionCount ?? 0,
      level: isPastOrToday ? COLOR_LEVELS[level] : 'bg-zinc-900/30',
    });

    cur.setDate(cur.getDate() + 1);
  }

  return days;
}

/** Compute pixel-accurate month label positions */
function buildMonthHeaders(days, year) {
  const names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const totalWeeks = Math.ceil(days.length / 7);
  const headers = [];

  for (let w = 0; w < totalWeeks; w++) {
    const wStart = days[w * 7].date;
    const wEnd = days[w * 7 + 6].date;

    for (let m = 0; m < 12; m++) {
      const first = new Date(year, m, 1);
      if (first >= wStart && first <= wEnd) {
        headers.push({ name: names[m], colStart: w + 1 });
      }
    }
  }

  return headers;
}

/** Lightweight placeholder — one element, not 370 cells */
function ContribSkeleton() {
  return (
    <div className="flex items-start gap-1.5 animate-pulse min-w-max">
      <div className="shrink-0 w-7" style={{ height: 95 }} />
      <div className="flex flex-col gap-1">
        <div className="h-4 w-64 rounded bg-zinc-800/60" />
        <div
          className="rounded-sm bg-zinc-800/40"
          style={{ width: 53 * 14, height: 11 * 7 + 3 * 6 }}
        />
      </div>
    </div>
  );
}

const About = () => {
  const [weeks, setWeeks] = useState(initialCache?.weeks ?? null);
  const [totalContrib, setTotalContrib] = useState(initialCache?.total ?? null);
  const [loading, setLoading] = useState(!initialCache);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchContributions = async (force = false) => {
    const hasData = Boolean(weeks);
    if (force) setRefreshing(true);
    else if (!hasData) setLoading(true);
    setError(false);
    try {
      const data = await prefetchContributions(force);
      setWeeks(data.weeks);
      setTotalContrib(data.total);
    } catch (err) {
      console.error('GitHub contributions fetch failed:', err);
      if (!hasData) setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchContributions(false); }, []);

  const { contributionData, monthHeaders } = useMemo(() => {
    if (!weeks) return { contributionData: [], monthHeaders: [] };
    const days = buildGrid(weeks, YEAR);
    return { contributionData: days, monthHeaders: buildMonthHeaders(days, YEAR) };
  }, [weeks]);

  return (
    <section id="about" className="min-h-screen bg-[#050505] text-white flex flex-col justify-center relative overflow-hidden select-none">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full flex-1 flex flex-col justify-center relative z-10 px-4 sm:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto w-full">

          {/* Top Grid: Bio + Headshot */}
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-4"
            >
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-[#00FF9D] text-[11px] font-code tracking-wide shadow-[0_0_12px_rgba(0,255,157,0.1)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF9D] animate-pulse" />
                  Open for new opportunities
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
                About Me
              </h2>

              <div className="font-code text-zinc-400 text-sm sm:text-base leading-relaxed space-y-3 max-w-lg">
                <p>
                  As a <span className="text-white font-medium">Full Stack Developer</span>,
                </p>
                <p>
                  I focus on the synergy between <span className="text-white font-medium">clean architecture</span> and <span className="text-white font-medium">thoughtful interfaces</span>.
                </p>
                <p>
                  I specialize in building digital products that are not just functional but <span className="text-emerald-400 font-medium">robust</span>, <span className="text-emerald-400 font-medium">scalable</span>, and crafted to deliver exceptional experiences from <span className="text-white font-medium">API to UI</span>.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-5 flex justify-center lg:justify-end"
            >
              <div className="relative group max-w-xs w-full rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-900/50 shadow-xl transition-all duration-300 hover:border-emerald-500/40">
                <img
                  src={profileImg}
                  alt="Jean Marc Aguilar Profile"
                  className="w-full h-56 sm:h-64 object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>
            </motion.div>
          </div>

          {/* GitHub Contribution Heatmap */}
          <motion.div
            initial={false}
            className="mt-8 p-4 sm:p-5 rounded-2xl bg-zinc-950/40 border border-zinc-900 space-y-3 w-full max-w-full mx-auto"
          >
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between text-zinc-300 text-xs font-code font-medium gap-2 sm:gap-8">
              <div className="flex items-center gap-2">
                <GitCommit size={14} className="text-emerald-400 shrink-0" />
                <span>
                  GitHub Contributions
                  <span className="text-emerald-400 font-semibold ml-1">({YEAR})</span>
                  {totalContrib !== null && (
                    <span className="text-zinc-500 ml-2 font-normal hidden sm:inline">
                      — {totalContrib.toLocaleString()} total
                    </span>
                  )}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => fetchContributions(true)}
                  title="Refresh contributions"
                  disabled={loading || refreshing}
                  className="text-zinc-600 hover:text-emerald-400 transition-colors disabled:opacity-40 cursor-pointer"
                >
                  <RefreshCw size={12} className={refreshing ? 'animate-spin' : ''} />
                </button>
                <a
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-zinc-500 hover:text-emerald-400 transition-colors"
                >
                  @{GITHUB_USERNAME}
                </a>
              </div>
            </div>

            {/* Grid Container */}
            <div className="py-1 overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
              {loading && !weeks ? (
                <ContribSkeleton />
              ) : error && !weeks ? (
                <div className="flex flex-col items-center justify-center gap-2 py-6 text-zinc-600 font-code text-xs">
                  <span>Failed to load contribution data.</span>
                  <button
                    onClick={() => fetchContributions(true)}
                    className="text-emerald-500 hover:text-emerald-400 transition-colors underline underline-offset-2"
                  >
                    Try again
                  </button>
                </div>
              ) : (
                <div className="flex items-start gap-1.5 min-w-max pb-2">
                  <div
                    className="relative shrink-0 w-7 text-[9px] text-zinc-600 font-code select-none"
                    style={{ height: 11 * 7 + 3 * 6 }}
                  >
                    <span className="absolute" style={{ top: 14 }}>Mon</span>
                    <span className="absolute" style={{ top: 42 }}>Wed</span>
                    <span className="absolute" style={{ top: 70 }}>Fri</span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="relative h-4 text-[10px] text-zinc-500 font-code">
                      {monthHeaders.map((m) => (
                        <span
                          key={m.name}
                          className="absolute whitespace-nowrap"
                          style={{ left: (m.colStart - 1) * 14 }}
                        >
                          {m.name}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-rows-7 grid-flow-col" style={{ gap: 3 }}>
                      {contributionData.map((item, idx) => (
                        <div
                          key={idx}
                          title={`${item.date.toDateString()}${item.count > 0 ? ` — ${item.count} contribution${item.count !== 1 ? 's' : ''}` : ''}`}
                          className={`rounded-xs ${item.level} hover:ring-1 hover:ring-emerald-400 transition-all`}
                          style={{ width: 11, height: 11 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-1.5 text-[10px] text-zinc-500 font-code pt-1">
              <span>Less</span>
              <span className="w-2 h-2 rounded-xs bg-zinc-900" />
              <span className="w-2 h-2 rounded-xs bg-emerald-950" />
              <span className="w-2 h-2 rounded-xs bg-emerald-800" />
              <span className="w-2 h-2 rounded-xs bg-emerald-600" />
              <span className="w-2 h-2 rounded-xs bg-emerald-400" />
              <span>More</span>
            </div>
          </motion.div>

          {/* Bottom Grid: Education & Stack */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-4 p-5 rounded-2xl bg-zinc-950/40 border border-zinc-900 hover:border-zinc-800 transition-colors"
            >
              <h3 className="text-2xl font-heading font-bold text-white tracking-tight">
                Education
              </h3>
              <p className="font-code text-zinc-400 text-sm sm:text-base leading-relaxed">
                My foundation is a <span className="text-white font-medium">BS in Information Technology</span>, which solidified my grasp of modern engineering standards and design thinking — letting me transition smoothly into a production-ready professional.
              </p>
              <div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => scrollToSection(e, 'projects')}
                  className="bg-zinc-950 border border-zinc-800 hover:border-zinc-600 text-white font-code text-xs px-4 py-2 rounded-full inline-flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  View Projects
                  <ArrowUpRight size={14} strokeWidth={2.5} />
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4 p-5 rounded-2xl bg-zinc-950/40 border border-zinc-900 hover:border-zinc-800 transition-colors"
            >
              <h3 className="text-2xl font-heading font-bold text-white tracking-tight">
                Stack
              </h3>
              <p className="font-code text-zinc-400 text-sm sm:text-base leading-relaxed">
                I operate across the full product lifecycle using <span className="text-emerald-400 font-medium">React</span>, <span className="text-emerald-400 font-medium">Node.js</span>, <span className="text-emerald-400 font-medium">TypeScript</span>, and modern CSS frameworks like <span className="text-white font-medium">Tailwind</span>. My philosophy prioritizes performance, accessibility, and modular design end-to-end.
              </p>
              <div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => scrollToSection(e, 'skills')}
                  className="bg-zinc-950 border border-zinc-800 hover:border-zinc-600 text-white font-code text-xs px-4 py-2 rounded-full inline-flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  View Stack
                  <ArrowUpRight size={14} strokeWidth={2.5} />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;