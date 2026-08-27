import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Sidebar = () => {
  const [activeNav, setActiveNav] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    setActiveNav(sectionId);
    setMobileMenuOpen(false);
    setIsScrolling(true);
    const element = document.getElementById(sectionId);
    if (element) {
      // Offset for sticky header on mobile
      const offset = window.innerWidth < 1024 ? 64 : 0;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
      
      // Listen for scroll to complete and then reset the scrolling state
      const checkScrollComplete = () => {
        const currentScroll = window.scrollY;
        const targetScroll = elementPosition - offset;
        const isNearTarget = Math.abs(currentScroll - targetScroll) < 10;
        
        if (isNearTarget) {
          setIsScrolling(false);
          window.removeEventListener('scroll', checkScrollComplete);
        }
      };
      
      // Fallback timeout in case scroll doesn't complete as expected
      const fallbackTimeout = setTimeout(() => {
        setIsScrolling(false);
        window.removeEventListener('scroll', checkScrollComplete);
      }, 2000);
      
      window.addEventListener('scroll', checkScrollComplete);
    }
  };

  // Scrollspy logic to automatically update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      // Don't update active section during programmatic scrolling
      if (isScrolling) return;

      const offset = window.innerWidth < 1024 ? 120 : 200;
      const scrollPosition = window.scrollY + offset;

      // Find the section that's currently in view
      let currentSection = 'home';
      let maxIntersection = 0;

      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const offsetTop = rect.top + window.scrollY;
          const offsetHeight = rect.height;
          const sectionBottom = offsetTop + offsetHeight;

          // Check if section is currently in viewport
          const sectionStartInView = scrollPosition >= offsetTop && scrollPosition < sectionBottom;
          
          // Calculate how much of the section is visible in the viewport
          const viewportTop = window.scrollY;
          const viewportBottom = window.scrollY + window.innerHeight;
          const visibleTop = Math.max(offsetTop, viewportTop);
          const visibleBottom = Math.min(sectionBottom, viewportBottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);

          // Prioritize sections that are actually in view and have more visible area
          if (sectionStartInView && visibleHeight > maxIntersection) {
            maxIntersection = visibleHeight;
            currentSection = item.id;
          }
        }
      }

      setActiveNav(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger initially
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolling]);

  return (
    <>
      {/* Left Sidebar Layout (Desktop) */}
      <aside className="hidden lg:flex lg:w-64 xl:w-72 flex-col justify-between border-r border-zinc-800/80 bg-[#050706]/95 z-30 p-6 xl:p-8 h-screen sticky top-0 shrink-0 shadow-[5px_0_30px_rgba(0,0,0,0.5)]">
        {/* Top Logo */}
        <div className="space-y-8">
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

          {/* Navigation Links Vertical */}
          <nav className="flex flex-col space-y-6 font-heading text-sm xl:text-base tracking-wider font-semibold">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className={`transition-all flex items-center gap-3 py-1.5 duration-300 relative group/link ${activeNav === item.id
                    ? 'text-[#00FF9D]'
                    : 'text-zinc-400 hover:text-white'
                  }`}
              >
                {/* Visual indicator dot */}
                <span className={`h-2 rounded-full transition-all duration-300 shrink-0 ${activeNav === item.id
                    ? 'w-2 bg-[#00FF9D] shadow-[0_0_10px_#00FF9D]'
                    : 'w-0 bg-transparent group-hover/link:w-1.5 group-hover/link:bg-zinc-500'
                  }`} />
                <span className="relative py-0.5">
                  {item.label}
                  {/* Subtle underline hover effect */}
                  <span className={`absolute bottom-0 left-0 h-[1.5px] bg-[#00FF9D] transition-all duration-300 ${activeNav === item.id ? 'w-full' : 'w-0 group-hover/link:w-full'
                    }`} />
                </span>
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom Status Badges */}
        <div className="space-y-3 pt-6 border-t border-zinc-900/90">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-[#00FF9D] text-[11px] font-mono tracking-wide shadow-[0_0_15px_rgba(0,255,157,0.08)]">
            <span className="w-2 h-2 rounded-full bg-[#00FF9D] animate-pulse" />
            Open to Work
          </div>
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-[#00FF9D] text-[11px] font-mono tracking-wide shadow-[0_0_15px_rgba(0,255,157,0.08)]">
            <span className="w-2 h-2 rounded-full bg-[#00FF9D] animate-pulse" />
            Currently Available
          </div>
        </div>
      </aside>

      {/* Mobile Top Navigation Header */}
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
            <nav className="flex flex-col space-y-4 font-mono text-sm tracking-widest">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={`py-2 ${activeNav === item.id ? 'text-[#00FF9D] font-bold' : 'text-zinc-400'
                    }`}
                >
                  {item.label}
                </a>
              ))}
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
