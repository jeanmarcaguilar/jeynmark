import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { LayoutGrid, Globe, Code2, Wrench } from 'lucide-react';

const FILTERS = [
  { label: 'All Projects', value: 'all', icon: LayoutGrid },
  { label: 'Web Development', value: 'Web Development', icon: Globe },
  { label: 'Full Stack', value: 'Full Stack', icon: Code2 },
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

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ─── Section Header ─── */}
        <div className="text-center mb-12">
          {/* Portfolio pill */}

          {/* Main heading */}
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 tracking-tight font-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Featured Projects
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-[#a1a1aa] text-xs max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            A curated collection of recent work — spanning product design, full-stack builds, and the occasional experiment.
          </motion.p>
        </div>

        {/* ─── Category Filters ─── */}
        <motion.div
          className="flex flex-row items-center justify-center gap-3 mb-14 mt-8"
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
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide border cursor-pointer transition-all duration-300 backdrop-blur-sm ${isActive
                    ? 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10 shadow-[0_0_25px_rgba(16,185,129,0.15)]'
                    : 'border-zinc-700/60 text-zinc-400 bg-zinc-900/40 hover:text-zinc-200 hover:border-zinc-600/80 hover:bg-zinc-800/60'
                  }`}
              >
                <Icon size={13} className={isActive ? 'text-emerald-400' : 'text-zinc-500'} strokeWidth={2} />
                <span>{filter.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* ─── Projects Grid ─── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
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
