import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { Globe, Code2, Link, Wrench, Layers } from 'lucide-react';

const FILTERS = [
  { label: 'All Projects', value: 'all', icon: Layers },
  { label: 'Web Development', value: 'Web Development', icon: Globe },
  { label: 'Full Stack', value: 'Full Stack', icon: Code2 },
  { label: 'Blockchain', value: 'Blockchain', icon: Link },
  { label: 'Tools', value: 'Tools', icon: Wrench },
];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter(
      (p) => p.categories?.includes(activeFilter) || p.category === activeFilter
    );
  }, [activeFilter]);

  return (
    <section
      id="projects"
      className="py-8 sm:py-12 pb-40 sm:pb-56 relative overflow-hidden"
      style={{ backgroundColor: '#050505' }}
    >
      {/* Subtle ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-150 opacity-[0.03]"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255,255,255,0.8), transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-150 h-100 opacity-[0.02]"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255,255,255,0.6), transparent 70%)',
          }}
        />
      </div>

      {/* Subtle grid pattern */}
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ─── Section Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20"
        >
          {/* Portfolio pill */}
          <motion.div
            className="inline-block mb-6"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="portfolio-pill">
              ✦ PORTFOLIO
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-5 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontFamily: "'Inter', 'Manrope', sans-serif" }}
          >
            Featured Projects
          </motion.h2>

          {/* Glow divider */}
          <motion.div
            className="flex items-center justify-center gap-2 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="w-16 h-px bg-linear-to-r from-transparent to-white/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <div className="w-16 h-px bg-linear-to-l from-transparent to-white/20" />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-[#a1a1aa] text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            A curated collection of my recent work showcasing creativity, technical
            excellence, and innovative problem-solving across various domains and
            technologies.
          </motion.p>
        </motion.div>

        {/* ─── Category Filters ─── */}
        <motion.div
          className="flex items-center justify-center sm:justify-end gap-2 mb-6 sm:mb-8 flex-wrap sm:flex-nowrap overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter.value;
            const Icon = filter.icon;
            return (
              <motion.button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className={`filter-pill ${isActive ? 'filter-pill-active' : ''}`}
              >
                <Icon size={10} strokeWidth={1.5} />
                <span className="whitespace-nowrap text-xs sm:text-xs">{filter.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* ─── Projects Grid ─── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.1,
                },
              },
            }}
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={setSelectedProject}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        <AnimatePresence>
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-20"
            >
              <p className="text-[#52525b] text-lg">
                No projects found for this category.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
