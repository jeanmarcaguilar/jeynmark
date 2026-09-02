import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowUpRight, Code2, ExternalLink,
  Sparkles, Target, Lightbulb, ChevronLeft, ChevronRight
} from 'lucide-react';
import { projects } from '../data/projects';
import { ExpandableList, FeatureGrid } from '../components/ProjectInsights';

/* ─── Interactive Image Carousel ─────────────────────────── */
const ProjectImageCarousel = ({ project }) => {
  const images = project.images && project.images.length > 0 ? project.images : [project.image];
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setActiveImgIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setActiveImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (images.length <= 1 || isPaused) return;
    const interval = setInterval(nextSlide, 4500);
    return () => clearInterval(interval);
  }, [activeImgIndex, isPaused, images.length]);

  return (
    <div
      className="space-y-4 mb-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Showcase Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#090a0c] shadow-[0_0_80px_rgba(0,0,0,0.8)] group"
        style={{ borderColor: 'rgba(0, 255, 157, 0.25)' }}
      >
        {/* Subtle rim highlight */}
        <div
          className="absolute -inset-px rounded-2xl pointer-events-none z-10"
          style={{
            background:
              'linear-gradient(135deg, rgba(0,255,157,0.2) 0%, transparent 40%, rgba(0,255,157,0.1) 100%)',
          }}
        />

        {/* Counter Badge */}
        {images.length > 1 && (
          <div className="absolute top-4 right-4 z-20 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-emerald-400 font-code text-xs font-semibold shadow-lg">
            {String(activeImgIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </div>
        )}

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous screenshot"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 border border-white/10 backdrop-blur-md flex items-center justify-center text-zinc-300 hover:text-emerald-400 hover:border-emerald-400/40 hover:bg-emerald-500/20 transition-all duration-200 cursor-pointer shadow-lg"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next screenshot"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 border border-white/10 backdrop-blur-md flex items-center justify-center text-zinc-300 hover:text-emerald-400 hover:border-emerald-400/40 hover:bg-emerald-500/20 transition-all duration-200 cursor-pointer shadow-lg"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Image Stage */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-zinc-950">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImgIndex}
              src={images[activeImgIndex]}
              onError={(e) => { e.currentTarget.src = project.image; }}
              alt={`${project.title} screenshot ${activeImgIndex + 1}`}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full object-cover object-top"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80 pointer-events-none" />
        </div>
      </motion.div>

      {/* Thumbnail Selector Row */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveImgIndex(idx)}
              className={`relative rounded-xl overflow-hidden shrink-0 border transition-all duration-300 cursor-pointer ${idx === activeImgIndex
                  ? 'border-emerald-400 ring-2 ring-emerald-400/30 scale-[1.02]'
                  : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
                }`}
              style={{ width: '110px', height: '65px' }}
            >
              <img
                src={img}
                onError={(e) => { e.currentTarget.src = project.image; }}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover object-top"
              />
              {idx === activeImgIndex && (
                <div className="absolute inset-0 bg-emerald-400/10 pointer-events-none" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const projectId = parseInt(id, 10);
  const projectIndex = projects.findIndex((p) => p.id === projectId);
  const project = projects[projectIndex];

  // Scroll to top on mount or id change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6">
        <h2 className="text-3xl font-heading font-bold mb-4">Project Not Found</h2>
        <p className="text-zinc-400 mb-6 font-code">The project you are looking for does not exist.</p>
        <button
          onClick={() => navigate('/', { state: { scrollTo: 'projects' } })}
          className="px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 hover:bg-emerald-500/20 font-code text-xs font-semibold transition-all inline-flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft size={14} /> Back to Portfolio
        </button>
      </div>
    );
  }

  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#050505] text-white pb-24 relative overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-emerald-500/[0.03] blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-emerald-500/[0.02] blur-[140px] pointer-events-none" />

      {/* Grid texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 relative z-10">

        {/* ── Top Navigation Bar ── */}
        <div className="flex items-center justify-between gap-4 mb-8 sm:mb-12">
          <button
            type="button"
            onClick={() => navigate('/', { state: { scrollTo: 'projects' } })}
            className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-zinc-300 hover:text-emerald-400 hover:border-emerald-400/40 hover:bg-emerald-400/10 transition-all duration-300 text-xs font-code cursor-pointer"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to Portfolio</span>
          </button>

          {/* Breadcrumb / Project counter */}
          <div className="flex items-center gap-2 text-xs font-code text-zinc-500">
            <span>Project</span>
            <span className="text-emerald-400 font-bold">{project.number}</span>
            <span>of {String(projects.length).padStart(2, '0')}</span>
          </div>
        </div>

        {/* ── Header Section ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3 py-1 rounded-full text-[11px] font-code font-semibold tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-400/20">
              {project.category}
            </span>
            {project.categories?.map((cat) => (
              <span
                key={cat}
                className="px-3 py-1 rounded-full text-[11px] font-code text-zinc-400 bg-zinc-900/60 border border-white/5"
              >
                {cat}
              </span>
            ))}
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight mb-4">
            {project.title}
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg max-w-3xl leading-relaxed font-code">
            {project.description}
          </p>
        </motion.div>

        {/* ── Image Carousel Showcase ── */}
        <ProjectImageCarousel project={project} />

        {/* ── Content Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left Column: Full Overview & Features */}
          <div className="lg:col-span-8 space-y-10">

            {/* Overview */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 sm:p-8 rounded-2xl bg-zinc-950/60 border border-zinc-900 space-y-4"
            >
              <h2 className="text-lg font-heading font-bold text-white tracking-tight flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Project Overview
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-code">
                {project.fullDescription}
              </p>
            </motion.section>

            {/* Key Features */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="p-6 sm:p-8 rounded-2xl bg-zinc-950/60 border border-zinc-900 space-y-5"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400">
                    <Sparkles size={16} />
                  </div>
                  <h2 className="text-xl font-heading font-bold text-white tracking-tight">
                    Key Features
                  </h2>
                </div>
                {project.features?.length > 0 && (
                  <span className="text-[10px] font-code text-zinc-500 tracking-wider uppercase">
                    {project.features.length} items
                  </span>
                )}
              </div>
              <FeatureGrid key={`features-${project.id}`} features={project.features} />
            </motion.section>

            {/* Challenges & Learnings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch"
            >
              {/* Challenges */}
              <div className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-900 flex flex-col hover:border-emerald-500/20 transition-colors">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400">
                    <Target size={14} />
                  </div>
                  <h3 className="text-sm font-heading font-bold text-white tracking-wide uppercase">
                    Challenges
                  </h3>
                </div>
                <ExpandableList key={`challenges-${project.id}`} items={project.challenges} initialCount={4} />
              </div>

              {/* What I Learned */}
              <div className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-900 flex flex-col hover:border-emerald-500/20 transition-colors">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400">
                    <Lightbulb size={14} />
                  </div>
                  <h3 className="text-sm font-heading font-bold text-white tracking-wide uppercase">
                    What I Learned
                  </h3>
                </div>
                <ExpandableList key={`learned-${project.id}`} items={project.learned} initialCount={4} numbered />
              </div>
            </motion.div>

          </div>

          {/* Right Column: Sidebar info & Quick Actions */}
          <div className="lg:col-span-4 space-y-6">

            {/* Quick Action Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-900 space-y-4"
            >
              <h3 className="text-base font-heading font-bold text-white tracking-tight">
                Project Links
              </h3>

              <div className="flex flex-col gap-3">
                {project.github && project.github !== '#' && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 hover:bg-emerald-500/25 hover:border-emerald-400/50 text-xs font-code font-semibold transition-all group"
                  >
                    <span className="flex items-center gap-2">
                      <Code2 size={16} />
                      <span>View Source Code</span>
                    </span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                )}

                {project.demo && project.demo !== '#' ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-zinc-200 hover:text-emerald-400 hover:border-emerald-400/40 hover:bg-emerald-400/10 text-xs font-code font-semibold transition-all group"
                  >
                    <span className="flex items-center gap-2">
                      <ExternalLink size={16} />
                      <span>Live Demo</span>
                    </span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                ) : (
                  <div className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 text-zinc-500 text-xs font-code">
                    <span>Live Demo Coming Soon</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Technologies Used */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-900 space-y-4"
            >
              <h3 className="text-base font-heading font-bold text-white tracking-tight">
                Technologies Used
              </h3>

              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-full text-xs font-code font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-400/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

          </div>
        </div>

        {/* ── Next / Previous Navigation Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-16 pt-8 border-t border-zinc-900 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {/* Previous Project Link */}
          <button
            type="button"
            onClick={() => navigate(`/project/${prevProject.id}`)}
            className="group p-5 rounded-2xl bg-zinc-950/40 border border-zinc-900 hover:border-emerald-500/40 hover:bg-zinc-900/40 transition-all duration-300 flex items-center gap-4 text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-emerald-400 group-hover:border-emerald-400/30 transition-colors shrink-0">
              <ChevronLeft size={18} />
            </div>
            <div className="min-w-0">
              <span className="block text-[10px] font-code text-zinc-500 uppercase tracking-widest">
                Previous Project
              </span>
              <span className="block text-sm font-heading font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                {prevProject.title}
              </span>
            </div>
          </button>

          {/* Next Project Link */}
          <button
            type="button"
            onClick={() => navigate(`/project/${nextProject.id}`)}
            className="group p-5 rounded-2xl bg-zinc-950/40 border border-zinc-900 hover:border-emerald-500/40 hover:bg-zinc-900/40 transition-all duration-300 flex items-center justify-end text-right gap-4 cursor-pointer"
          >
            <div className="min-w-0">
              <span className="block text-[10px] font-code text-zinc-500 uppercase tracking-widest">
                Next Project
              </span>
              <span className="block text-sm font-heading font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                {nextProject.title}
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-emerald-400 group-hover:border-emerald-400/30 transition-colors shrink-0">
              <ChevronRight size={18} />
            </div>
          </button>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default ProjectDetails;
