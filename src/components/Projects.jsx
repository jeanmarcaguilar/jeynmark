import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight, Code2 } from 'lucide-react';
import { projects } from '../data/projects';

/* ─── helpers ─────────────────────────────────────────────── */
const wrap = (index, length) => ((index % length) + length) % length;

/* ─── Featured (center) card ──────────────────────────────── */
const FeaturedCard = ({ project, onSelect }) => (
  <div
    className="relative rounded-2xl overflow-hidden border bg-[#090a0c] shadow-[0_0_60px_rgba(0,255,157,0.12),0_32px_80px_rgba(0,0,0,0.7)] cursor-pointer group select-none"
    style={{ borderColor: 'rgba(0,255,157,0.35)' }}
    onClick={() => onSelect(project)}
  >
    {/* Glow rim */}
    <div
      className="absolute -inset-px rounded-2xl pointer-events-none"
      style={{
        background:
          'linear-gradient(135deg, rgba(0,255,157,0.25) 0%, transparent 50%, rgba(0,255,157,0.10) 100%)',
      }}
    />

    {/* Top-left icon badge */}
    <div className="absolute top-4 left-4 z-20 w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center">
      <Code2 size={18} className="text-emerald-400" />
    </div>

    {/* Open button */}
    <div className="absolute top-4 right-4 z-20 w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors duration-300">
      <ArrowUpRight size={16} className="text-emerald-400" />
    </div>

    {/* Screenshot */}
    <div className="relative aspect-video overflow-hidden">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover object-center scale-[1.01] group-hover:scale-[1.05] transition-transform duration-700 ease-out"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-linear-to-t from-[#090a0c] via-[#090a0c]/20 to-transparent" />
    </div>

    {/* Info strip */}
    <div className="relative px-6 sm:px-8 pt-5 pb-6">
      {/* FEATURED badge */}
      <span className="inline-block mb-2 text-[10px] font-bold tracking-[0.2em] text-emerald-400 font-code">
        FEATURED
      </span>

      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white leading-tight group-hover:text-emerald-300 transition-colors duration-300">
          {project.title}
        </h3>
      </div>

      <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2 mb-4">
        {project.description}
      </p>

      {/* Tech tags — full list from projects.js */}
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 rounded-full text-[11px] font-code font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-400/20 group-hover:border-emerald-400/40 transition-colors duration-300"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  </div>
);

/* ─── Side card (prev / next) ─────────────────────────────── */
const SideCard = ({ project, rotateY, onClick }) => (
  <div
    className="relative rounded-2xl overflow-hidden border border-white/8 bg-[#0c0c0e] shadow-2xl cursor-pointer"
    style={{ transform: `rotateY(${rotateY}deg) scale(0.92)` }}
    onClick={onClick}
  >
    <div className="relative aspect-video overflow-hidden">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover object-center"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-linear-to-t from-[#0c0c0e] via-[#0c0c0e]/30 to-transparent" />
    </div>
    <div className="px-4 pt-3 pb-4">
      <h3 className="text-white font-bold text-sm sm:text-base font-heading leading-tight mb-1">
        {project.title}
      </h3>
      <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2">{project.description}</p>
      <div className="flex flex-wrap gap-1 mt-2">
        {project.technologies.map((t) => (
          <span
            key={t}
            className="text-[9px] font-code text-zinc-500 border border-white/8 px-1.5 py-0.5 rounded-full"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  </div>
);

/* ─── Main Projects section ───────────────────────────────── */
const Projects = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0);

  const total = projects.length;
  const prevIdx = wrap(currentIndex - 1, total);
  const nextIdx = wrap(currentIndex + 1, total);

  const handleSelectProject = (project) => {
    navigate(`/project/${project.id}`, { state: { scrollTo: 'projects' } });
  };

  const goTo = useCallback(
    (newIndex, dir = 1) => {
      setDirection(dir);
      setCurrentIndex(wrap(newIndex, total));
    },
    [total]
  );

  const goNext = useCallback(() => goTo(currentIndex + 1, 1), [currentIndex, goTo]);
  const goPrev = useCallback(() => goTo(currentIndex - 1, -1), [currentIndex, goTo]);

  /* auto-advance */
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(goNext, 5000);
    return () => clearInterval(id);
  }, [goNext, isPaused]);

  /* slide variants for center card */
  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? '30%' : '-30%',
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.55, ease: [0.32, 0.72, 0, 1] },
    },
    exit: (dir) => ({
      x: dir > 0 ? '-30%' : '30%',
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] },
    }),
  };

  return (
    <section
      id="projects"
      className="py-12 sm:py-20 pb-40 sm:pb-56 relative overflow-hidden"
      style={{ backgroundColor: '#050505' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-225 h-125 opacity-[0.04]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.8), transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-150 h-100 opacity-[0.035]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,255,157,0.5), transparent 70%)',
          }}
        />
        <div className="absolute top-20 right-16 w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
        <div className="absolute bottom-32 left-20 w-1 h-1 rounded-full bg-emerald-400/40" />
      </div>

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.012] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Header ── */}
        <div className="text-center mb-14 sm:mb-20">

          <motion.h2
            className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight font-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Featured{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-300 to-emerald-500">
              Projects
            </span>
          </motion.h2>

          <motion.p
            className="font-code text-zinc-400 text-sm sm:text-base max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            A curated collection of recent work — spanning product design, full-stack builds, and the occasional experiment.
          </motion.p>
        </div>

        {/* ── 3-panel carousel ── */}
        <div className="relative flex items-center justify-center" style={{ perspective: '1200px' }}>
          {/* Left arrow */}
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous project"
            className="absolute left-0 sm:-left-1 lg:-left-4 z-30 w-11 h-11 flex items-center justify-center rounded-full border border-white/10 bg-black/50 backdrop-blur-md text-zinc-300 hover:text-emerald-400 hover:border-emerald-400/30 transition-all duration-200 shadow-lg"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Right arrow */}
          <button
            type="button"
            onClick={goNext}
            aria-label="Next project"
            className="absolute right-0 sm:-right-1 lg:-right-4 z-30 w-11 h-11 flex items-center justify-center rounded-full border border-white/10 bg-black/50 backdrop-blur-md text-zinc-300 hover:text-emerald-400 hover:border-emerald-400/30 transition-all duration-200 shadow-lg"
          >
            <ChevronRight size={18} />
          </button>

          {/* Stage */}
          <div className="relative w-full mx-auto flex items-center justify-center px-2 sm:px-4">

            {/* Prev card */}
            <motion.div
              key={`prev-${prevIdx}`}
              className="absolute left-0 sm:left-2 w-[38%] lg:w-[34%] hidden sm:block"
              initial={{ opacity: 0, x: '-10%' }}
              animate={{ opacity: 0.45, x: '0%' }}
              transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
              style={{ zIndex: 1, transformOrigin: 'left center' }}
            >
              <SideCard project={projects[prevIdx]} rotateY={12} onClick={goPrev} />
            </motion.div>

            {/* Center (featured) card */}
            <div className="relative z-10 w-full sm:w-[62%] lg:w-[58%] max-w-3xl mx-auto">
              <AnimatePresence mode="popLayout" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <FeaturedCard
                    project={projects[currentIndex]}
                    onSelect={handleSelectProject}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next card */}
            <motion.div
              key={`next-${nextIdx}`}
              className="absolute right-0 sm:right-2 w-[38%] lg:w-[34%] hidden sm:block"
              initial={{ opacity: 0, x: '10%' }}
              animate={{ opacity: 0.45, x: '0%' }}
              transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
              style={{ zIndex: 1, transformOrigin: 'right center' }}
            >
              <SideCard project={projects[nextIdx]} rotateY={-12} onClick={goNext} />
            </motion.div>
          </div>
        </div>

        {/* ── Dot indicators ── */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {projects.map((project, i) => (
            <button
              key={project.id}
              type="button"
              aria-label={`Go to ${project.title}`}
              aria-current={i === currentIndex ? 'true' : undefined}
              onClick={() => goTo(i, i > currentIndex ? 1 : -1)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? 'w-7 bg-emerald-400'
                  : 'w-1.5 bg-zinc-700 hover:bg-zinc-500'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
