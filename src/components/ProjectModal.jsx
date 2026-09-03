import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Code2, ExternalLink, Sparkles, Target, Lightbulb, ArrowUpRight } from 'lucide-react';
import { ExpandableList, FeatureGrid } from './ProjectInsights';

const ProjectModal = ({ project, onClose }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  // Close on escape key
  useEffect(() => {
    if (!project) return;
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        {/* Modal container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl max-h-[88vh] overflow-hidden rounded-2xl"
          style={{
            background: 'linear-gradient(180deg, #0f0f10 0%, #0a0a0b 100%)',
            border: '1px solid rgba(255, 255, 255, 0.07)',
            boxShadow: '0 40px 100px rgba(0, 0, 0, 0.6), 0 0 60px rgba(255, 255, 255, 0.02)',
          }}
        >
          {/* Top edge highlight */}
          <div className="absolute top-0 left-[15%] right-[15%] h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

          {/* Scrollable content */}
          <div className="overflow-y-auto max-h-[88vh] modal-scroll">

            {/* Hero section with project image */}
            <div className="relative">
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top"
                />
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0b] via-[#0a0a0b]/60 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0b]/30 to-transparent" />
              </div>

              {/* Close button */}
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                }}
                aria-label="Close modal"
              >
                <X size={16} className="text-white/70" />
              </motion.button>

              {/* Category badge */}
              <div className="absolute top-4 left-4 z-20">
                <span
                  className="px-3 py-1.5 rounded-full text-[0.7rem] font-semibold tracking-wider text-white/70"
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  {project.category}
                </span>
              </div>

              {/* Title overlapping image bottom */}
              <div className="absolute bottom-0 left-0 right-0 px-7 sm:px-9 pb-6">
                <span className="text-white/30 text-xs font-mono font-semibold tracking-[0.2em] mb-2 block">
                  {project.number}
                </span>
                <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                  {project.title}
                </h3>
              </div>
            </div>

            {/* Content body */}
            <div className="px-7 sm:px-9 pb-8 pt-2">

              {/* Overview */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mb-7"
              >
                <p className="text-[#a1a1aa] text-[0.9rem] leading-[1.7] ">
                  {project.fullDescription}
                </p>
              </motion.div>

              {/* Divider */}
              <div className="h-px bg-linear-to-r from-transparent via-white/6 to-transparent mb-7" />

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-7"
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                  >
                    <Sparkles size={13} className="text-white/50" />
                  </div>
                  <h4 className="text-sm font-semibold text-white/80 tracking-wide">Features</h4>
                </div>
                <FeatureGrid features={project.features} />
              </motion.div>

              {/* Divider */}
              <div className="h-px bg-linear-to-r from-transparent via-white/6 to-transparent mb-7" />

              {/* Technology Stack */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-7"
              >
                <h4 className="text-sm font-semibold text-white/80 tracking-wide mb-4">Technology Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.35 + i * 0.04 }}
                      className="modal-tech-badge"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Challenges & Learnings - side by side on desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8 items-stretch">
                {/* Challenges */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="rounded-xl p-5 flex flex-col"
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                      }}
                    >
                      <Target size={13} className="text-white/50" />
                    </div>
                    <h4 className="text-xs font-semibold text-white/70 tracking-wider uppercase">Challenges</h4>
                  </div>
                  <ExpandableList items={project.challenges} initialCount={3} />
                </motion.div>

                {/* What I Learned */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="rounded-xl p-5 flex flex-col"
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                      }}
                    >
                      <Lightbulb size={13} className="text-white/50" />
                    </div>
                    <h4 className="text-xs font-semibold text-white/70 tracking-wider uppercase">What I Learned</h4>
                  </div>
                  <ExpandableList items={project.learned} initialCount={3} numbered />
                </motion.div>
              </div>

              {/* Divider */}
              <div className="h-px bg-linear-to-r from-transparent via-white/6 to-transparent mb-6" />

              {/* Action buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="flex flex-wrap gap-3"
              >
                {project.github && project.github !== '#' && (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    className="modal-btn-primary"
                  >
                    <Code2 size={15} />
                    <span>View Source</span>
                    <ArrowUpRight size={13} className="opacity-50" />
                  </motion.a>
                )}
                {project.demo && project.demo !== '#' && (
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    className="modal-btn-secondary"
                  >
                    <ExternalLink size={15} />
                    <span>Live Demo</span>
                    <ArrowUpRight size={13} className="opacity-50" />
                  </motion.a>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;
