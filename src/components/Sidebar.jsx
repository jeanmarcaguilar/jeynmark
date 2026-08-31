import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, User, Code2, FolderKanban, Briefcase, Mail } from 'lucide-react';

const Sidebar = () => {
  const [activeNav, setActiveNav] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const navItems = [
    { id: 'home', label: 'HOME', icon: Home },
    { id: 'about', label: 'ABOUT', icon: User },
    { id: 'skills', label: 'SKILLS', icon: Code2 },
    { id: 'projects', label: 'PROJECTS', icon: FolderKanban },
    { id: 'experience', label: 'EXPERIENCE', icon: Briefcase },
    { id: 'contact', label: 'CONTACT', icon: Mail },
  ];

  const activeIndex = navItems.findIndex((item) => item.id === activeNav);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    setActiveNav(sectionId);
    setMobileMenuOpen(false);
    setIsScrolling(true);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = window.innerWidth < 1024 ? 64 : 0;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });

      const checkScrollComplete = () => {
        const currentScroll = window.scrollY;
        const targetScroll = elementPosition - offset;
        const isNearTarget = Math.abs(currentScroll - targetScroll) < 10;

        if (isNearTarget) {
          setIsScrolling(false);
          window.removeEventListener('scroll', checkScrollComplete);
        }
      };

      const fallbackTimeout = setTimeout(() => {
        setIsScrolling(false);
        window.removeEventListener('scroll', checkScrollComplete);
      }, 2000);

      window.addEventListener('scroll', checkScrollComplete);
    }
  };

  // Scrollspy logic
  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;

      const offset = window.innerWidth < 1024 ? 120 : 200;
      const scrollPosition = window.scrollY + offset;

      let currentSection = 'home';
      let maxIntersection = 0;

      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const offsetTop = rect.top + window.scrollY;
          const offsetHeight = rect.height;
          const sectionBottom = offsetTop + offsetHeight;

          const sectionStartInView = scrollPosition >= offsetTop && scrollPosition < sectionBottom;

          const viewportTop = window.scrollY;
          const viewportBottom = window.scrollY + window.innerHeight;
          const visibleTop = Math.max(offsetTop, viewportTop);
          const visibleBottom = Math.min(sectionBottom, viewportBottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);

          if (sectionStartInView && visibleHeight > maxIntersection) {
            maxIntersection = visibleHeight;
            currentSection = item.id;
          }
        }
      }

      setActiveNav(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolling]);

  // ────────────────────────────────────────────
  // Wheel geometry helpers
  // ────────────────────────────────────────────

  const ITEM_SPACING = 95; // px between items vertically (more breathing room)

  // Calculate position for each item on the straight line
  const getItemTransform = (index, activeIdx) => {
    const offset = index - activeIdx;

    // Y position: straight vertical spacing from center
    const y = offset * ITEM_SPACING;

    // Scale: active item = 1, non-active items slightly smaller (0.75)
    const distFromCenter = Math.abs(offset);
    const scale = distFromCenter === 0 ? 1 : Math.max(0.7, 1 - distFromCenter * 0.08);

    // Opacity: active item = 1 (fully opaque), all other items = 0.55 (clearly visible and clickable)
    const opacity = distFromCenter === 0 ? 1 : 0.55;

    return { y, scale, opacity };
  };

  return (
    <>
      {/* ═══════════════════════════════════════════
          Desktop — Vertical Carousel Wheel Sidebar
          ═══════════════════════════════════════════ */}
      <aside className="hidden lg:flex lg:w-64 xl:w-72 flex-col justify-between bg-[#050706]/95 z-30 h-screen sticky top-0 shrink-0 shadow-[5px_0_30px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Top Logo */}
        <div className="p-6 xl:p-8">
          <motion.a
            href="#home"
            onClick={(e) => scrollToSection(e, 'home')}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="block"
          >
            <div className="group cursor-pointer">
              <div className="text-xl xl:text-2xl font-black font-heading tracking-tight text-white transition-colors relative block leading-tight">
                <span className="text-white group-hover:text-[#00FF9D] transition-colors relative">
                  Jean Marc Aguilar
                  <span className="absolute -inset-1 bg-[#00FF9D]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity rounded" />
                </span>
              </div>
              <span className="block text-[10px] xl:text-[11px] font-mono tracking-widest text-zinc-500 uppercase mt-1">
                Full Stack Web Developer
              </span>
            </div>
          </motion.a>
        </div>

        {/* ── Wheel Navigation ── */}
        <div className="flex-1 relative flex items-center justify-start pl-16 pb-100">
          {/* Nav items in a straight vertical line */}
          <div className="relative flex flex-col items-start" style={{ height: '360px' }}>
            {navItems.map((item, index) => {
              const { y, scale, opacity } = getItemTransform(index, activeIndex);
              const isActive = item.id === activeNav;
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.id}
                  className="absolute flex items-center gap-3"
                  style={{
                    left: '0px',
                    top: '50%',
                  }}
                  animate={{
                    y: y,
                    scale,
                    opacity,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 28,
                    mass: 0.8,
                  }}
                >
                  {/* Icon circle */}
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => scrollToSection(e, item.id)}
                    className={`wheel-nav-item ${isActive ? 'wheel-nav-active' : ''}`}
                    aria-label={`Navigate to ${item.label}`}
                  >
                    <Icon size={isActive ? 24 : 20} strokeWidth={isActive ? 2 : 1.5} />
                  </a>

                  {/* Label pill (only for active, appears to the right) */}
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, x: -15, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -15, scale: 0.8 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="wheel-nav-label font-heading"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>


      </aside>

      {/* ═══════════════════════════════════════════
          Mobile — Top Navigation Header
          ═══════════════════════════════════════════ */}
      <header className="lg:hidden z-30 w-full bg-[#050706]/95 border-b border-zinc-800/80 px-4 py-4 flex items-center justify-between sticky top-0 backdrop-blur-md">
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, 'home')}
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
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-400 hover:text-white focus:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-x-0 top-16 z-40 bg-[#080d09] border-b border-zinc-800 p-6 shadow-2xl"
          >
            <nav className="flex flex-col space-y-2 font-heading text-sm tracking-wider">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => scrollToSection(e, item.id)}
                    className={`flex items-center gap-4 py-3 px-4 rounded-xl transition-all duration-300 ${isActive
                      ? 'text-[#00FF9D] bg-emerald-950/30 border border-emerald-500/20'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/30 border border-transparent'
                      }`}
                  >
                    <span
                      className={`w-10 h-10 rounded-full grid place-items-center border-2 transition-all duration-300 ${isActive
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
            <div className="mt-6 pt-4 border-t border-zinc-800 flex flex-col gap-2">
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

export default Sidebar;
