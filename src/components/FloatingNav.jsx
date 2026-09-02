import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, User, Code2, FolderKanban, Briefcase, Mail } from 'lucide-react';

/* ─── Inline SVG icons not available in this lucide version ── */
const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedinIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

/* ─── nav items ───────────────────────────────────────────── */
const NAV_ITEMS = [
  { id: 'home',       label: 'HOME',       icon: Home        },
  { id: 'about',      label: 'ABOUT',      icon: User        },
  { id: 'skills',     label: 'SKILLS',     icon: Code2       },
  { id: 'projects',   label: 'PROJECTS',   icon: FolderKanban},
  { id: 'experience', label: 'EXPERIENCE', icon: Briefcase   },
  { id: 'contact',    label: 'CONTACT',    icon: Mail        },
];

const FloatingNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeNav, setActiveNav]         = useState('home');
  const [isScrolling, setIsScrolling]     = useState(false);
  const [mobileOpen, setMobileOpen]       = useState(false);

  /* ── scrollspy ─────────────────────────────────────────── */
  useEffect(() => {
    if (location.pathname !== '/') return;
    const onScroll = () => {
      if (isScrolling) return;
      const offset = window.innerWidth < 1024 ? 120 : 200;
      const scrollPos = window.scrollY + offset;
      let current = 'home';
      let maxVis = 0;

      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const top  = rect.top + window.scrollY;
        const bot  = top + rect.height;
        if (scrollPos >= top && scrollPos < bot) {
          const visTop = Math.max(top, window.scrollY);
          const visBot = Math.min(bot, window.scrollY + window.innerHeight);
          const vis = Math.max(0, visBot - visTop);
          if (vis > maxVis) { maxVis = vis; current = item.id; }
        }
      }
      setActiveNav(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [isScrolling, location.pathname]);

  /* ── set active nav based on route ───────────────────────── */
  useEffect(() => {
    if (location.pathname.startsWith('/project')) {
      setActiveNav('projects');
    }
  }, [location.pathname]);

  /* ── handle redirect scroll ───────────────────────────── */
  useEffect(() => {
    if (location.pathname === '/' && location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;
      setActiveNav(sectionId);
      const timer = setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          const offset = window.innerWidth < 1024 ? 64 : 0;
          const targetPos = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: targetPos, behavior: 'smooth' });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [location]);

  /* ── scroll to section ─────────────────────────────────── */
  const scrollTo = (e, id) => {
    e.preventDefault();
    setActiveNav(id);
    setMobileOpen(false);

    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
      return;
    }

    setIsScrolling(true);
    const el = document.getElementById(id);
    if (!el) return;
    const offset = window.innerWidth < 1024 ? 64 : 0;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    const done = () => { setIsScrolling(false); window.removeEventListener('scroll', done); };
    setTimeout(done, 2000);
    window.addEventListener('scroll', done, { passive: true });
  };

  return (
    <>
      {/* ══════════════════════════════════════════════
          DESKTOP — fixed floating pill + top/bottom chrome
          ══════════════════════════════════════════════ */}
      <div className="hidden lg:flex fixed left-0 top-0 h-screen w-[240px] xl:w-[260px] flex-col justify-between z-40 pointer-events-none">

        {/* ── Name / title block (top-left) ── */}
        <motion.a
          href="#home"
          onClick={(e) => scrollTo(e, 'home')}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55 }}
          className="pointer-events-auto p-6 xl:p-8 group"
        >
          <div className="text-xl xl:text-2xl font-black font-heading tracking-tight text-white leading-tight relative">
            <span className="group-hover:text-[#00FF9D] transition-colors duration-300 relative">
              Jean Marc Aguilar
              <span className="absolute -inset-1 bg-[#00FF9D]/15 blur-md rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="text-[10px] xl:text-[11px] font-mono tracking-widest text-zinc-500 uppercase">
              Full Stack Web Developer
            </span>
          </div>
        </motion.a>

        {/* ── Floating pill nav (center) ── */}
        <div className="pointer-events-auto flex items-center pl-6 xl:pl-8 pb-24">
          {/* Pill capsule container */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex flex-col items-center gap-1 py-4 px-3 rounded-[2rem]"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)',
            }}
          >
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === activeNav;

              return (
                <div key={item.id} className="relative flex items-center">
                  {/* Icon button */}
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => scrollTo(e, item.id)}
                    aria-label={`Navigate to ${item.label}`}
                    className="relative flex items-center justify-center rounded-full transition-all duration-400 cursor-pointer"
                    style={{
                      width:  isActive ? '56px' : '46px',
                      height: isActive ? '56px' : '46px',
                      border: isActive
                        ? '2px solid #00FF9D'
                        : '1.5px solid rgba(255,255,255,0.10)',
                      background: isActive
                        ? 'rgba(0,255,157,0.09)'
                        : 'rgba(255,255,255,0.04)',
                      color: isActive ? '#00FF9D' : 'rgba(255,255,255,0.38)',
                      boxShadow: isActive
                        ? '0 0 18px rgba(0,255,157,0.30), 0 0 40px rgba(0,255,157,0.12), inset 0 0 12px rgba(0,255,157,0.15)'
                        : 'none',
                      transition: 'all 0.35s cubic-bezier(0.25,0.1,0.25,1)',
                    }}
                  >
                    <Icon size={isActive ? 22 : 18} strokeWidth={isActive ? 2 : 1.5} />

                    {/* Glow pulse ring on active */}
                    {isActive && (
                      <span
                        className="absolute inset-0 rounded-full animate-ping opacity-20"
                        style={{ border: '2px solid #00FF9D', animationDuration: '2.5s' }}
                      />
                    )}
                  </a>

                  {/* Label pill — slides in to the right of the active item */}
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, x: -12, scale: 0.85 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -12, scale: 0.85 }}
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                        className="absolute left-[calc(100%+10px)] whitespace-nowrap px-4 py-2 rounded-xl font-heading font-bold text-[12px] tracking-[0.07em] text-[#050706]"
                        style={{
                          background: 'rgba(255,255,255,0.96)',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.35), 0 0 18px rgba(0,255,157,0.10)',
                        }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* ── Social links + copyright (bottom-left) ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="pointer-events-auto p-6 xl:p-8 flex flex-col gap-4"
        >
          {/* Social icon row */}
          <div className="flex items-center gap-3">
            {[
              { href: 'https://github.com/jeanmarcaguilar', icon: GithubIcon,   label: 'GitHub'   },
              { href: 'https://www.linkedin.com/in/jiim/', icon: LinkedinIcon, label: 'LinkedIn' },
              { href: '#contact', icon: Mail, label: 'Email', onClick: (e) => scrollTo(e, 'contact') },
            ].map(({ href, icon: Icon, label, onClick }) => (
              <a
                key={label}
                href={href}
                onClick={onClick}
                target={onClick ? undefined : '_blank'}
                rel={onClick ? undefined : 'noopener noreferrer'}
                aria-label={label}
                className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-zinc-500 hover:text-emerald-400 hover:border-emerald-400/30 hover:bg-emerald-400/[0.07] transition-all duration-300"
              >
                <Icon size={15} strokeWidth={1.5} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-[10px] text-zinc-600 leading-relaxed font-mono">
            © 2025 Jean Marc Aguilar<br />All rights reserved.
          </p>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════
          MOBILE — sticky top header + slide-down menu
          ══════════════════════════════════════════════ */}
      <header className="lg:hidden z-40 w-full bg-[#050706]/95 border-b border-zinc-800/80 px-4 py-4 flex items-center justify-between sticky top-0 backdrop-blur-md">
        <a
          href="#home"
          onClick={(e) => scrollTo(e, 'home')}
          className="text-2xl font-black font-mono text-white tracking-tight"
        >
          JM.
        </a>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-[#00FF9D] text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[#00FF9D] animate-pulse" />
            Available
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-zinc-400 hover:text-white focus:outline-none cursor-pointer"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-x-0 top-16 z-40 bg-[#080d09] border-b border-zinc-800 p-6 shadow-2xl"
          >
            <nav className="flex flex-col space-y-2 font-heading text-sm tracking-wider">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => scrollTo(e, item.id)}
                    className={`flex items-center gap-4 py-3 px-4 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'text-[#00FF9D] bg-emerald-950/30 border border-emerald-500/20'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/30 border border-transparent'
                    }`}
                  >
                    <span
                      className={`w-10 h-10 rounded-full grid place-items-center border-2 transition-all duration-300 ${
                        isActive
                          ? 'border-[#00FF9D] bg-[#00FF9D]/10 shadow-[0_0_12px_rgba(0,255,157,0.3)]'
                          : 'border-zinc-700 bg-zinc-800/50'
                      }`}
                    >
                      <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                    </span>
                    <span className="font-semibold">{item.label}</span>
                    {isActive && (
                      <span className="ml-auto w-2 h-2 rounded-full bg-[#00FF9D] shadow-[0_0_8px_rgba(0,255,157,0.6)]" />
                    )}
                  </a>
                );
              })}
            </nav>

            <div className="mt-6 pt-4 border-t border-zinc-800">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-[#00FF9D] text-xs font-mono w-max">
                <span className="w-2 h-2 rounded-full bg-[#00FF9D] animate-pulse" />
                Open to Work
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingNav;
