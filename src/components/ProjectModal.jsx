import { motion, AnimatePresence } from 'framer-motion';
import { X, Code2, ExternalLink } from 'lucide-react';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-card border-b border-border p-6 flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-2">{project.title}</h3>
              <span className="text-sm text-secondary">{project.category}</span>
            </div>
            <button
              onClick={onClose}
              className="text-secondary hover:text-primary transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Description */}
            <div>
              <h4 className="text-lg font-semibold text-primary mb-2">Project Overview</h4>
              <p className="text-secondary leading-relaxed">{project.fullDescription}</p>
            </div>

            {/* Features */}
            <div>
              <h4 className="text-lg font-semibold text-primary mb-2">Features</h4>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="text-secondary flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div>
              <h4 className="text-lg font-semibold text-primary mb-2">Technology Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-hover text-secondary rounded border border-border text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Challenges */}
            <div>
              <h4 className="text-lg font-semibold text-primary mb-2">Challenges</h4>
              <p className="text-secondary leading-relaxed">{project.challenges}</p>
            </div>

            {/* What I Learned */}
            <div>
              <h4 className="text-lg font-semibold text-primary mb-2">What I Learned</h4>
              <p className="text-secondary leading-relaxed">{project.learned}</p>
            </div>

            {/* Links */}
            <div className="flex gap-4 pt-4 border-t border-border">
              {project.github && project.github !== '#' && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-primary text-background px-4 py-2 rounded-lg font-medium"
                >
                  <Code2 size={20} />
                  <span>GitHub Repository</span>
                </motion.a>
              )}
              {project.demo && project.demo !== '#' && (
                <motion.a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 border border-border text-primary px-4 py-2 rounded-lg font-medium hover:bg-hover transition-colors"
                >
                  <ExternalLink size={20} />
                  <span>Live Demo</span>
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;
