import { motion } from 'framer-motion';
import { Code2, ExternalLink, ArrowRight, Sparkles } from 'lucide-react';

const ProjectCard = ({ project, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ 
        y: -16,
        scale: 1.03,
      }}
      onClick={() => onClick(project)}
      className="relative bg-card/95 backdrop-blur-2xl rounded-3xl overflow-hidden cursor-pointer group transition-all duration-700"
      style={{
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)',
      }}
    >
      {/* Animated gradient border */}
      <motion.div
        className="absolute inset-0 rounded-3xl p-px opacity-60 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%)',
        }}
      >
        <div className="absolute inset-0 rounded-3xl bg-card/95" />
      </motion.div>

      {/* Animated glowing border effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: 'conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0.1), rgba(255,255,255,0.05), rgba(255,255,255,0.1))',
          filter: 'blur(20px)',
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Inner glow effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 70%)',
        }}
      />

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Content container */}
      <div className="relative h-full flex flex-col">
        {/* Project Image */}
        <div className="relative h-64 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-border/60 to-card/40" />
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-115"
            whileHover={{ scale: 1.15 }}
          />
          
          {/* Enhanced overlay with gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-card via-card/60 to-transparent opacity-70" />
          
          {/* Premium View Details overlay */}
          <motion.div
            className="absolute inset-0 bg-background/95 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 90 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight size={24} className="text-primary" />
              </motion.div>
              <span className="text-primary font-semibold text-lg tracking-wide">View Project</span>
            </motion.div>
          </motion.div>

          {/* Premium status indicator */}
          <div className="absolute top-4 right-4">
            <motion.div
              className="px-4 py-2 bg-primary/10 backdrop-blur-xl rounded-full border border-primary/30 flex items-center gap-2"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <Sparkles size={14} className="text-primary" />
              <span className="text-xs font-semibold text-primary tracking-wider">FEATURED</span>
            </motion.div>
          </div>

          {/* Shimmer effect on image */}
          <motion.div
            className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 0.5,
            }}
          />
        </div>

        {/* Project Content */}
        <div className="p-7 flex-1 flex flex-col">
          <h3 className="text-2xl font-bold text-primary mb-3 group-hover:text-primary transition-colors tracking-tight">
            {project.title}
          </h3>
          <p className="text-secondary text-sm mb-6 line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          {/* Premium Technologies */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.slice(0, 4).map((tech, index) => (
              <motion.span
                key={tech}
                className="text-xs px-4 py-2 bg-hover/30 text-secondary rounded-xl border border-border/30 hover:border-primary/40 hover:text-primary/90 hover:bg-primary/10 transition-all duration-300 font-medium tracking-wide"
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                whileHover={{ 
                  scale: 1.08,
                  y: -2,
                  boxShadow: '0 4px 12px rgba(255,255,255,0.1)',
                }}
              >
                {tech}
              </motion.span>
            ))}
            {project.technologies.length > 4 && (
              <motion.span
                className="text-xs px-4 py-2 bg-hover/30 text-secondary rounded-xl border border-border/30 font-medium tracking-wide"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                +{project.technologies.length - 4}
              </motion.span>
            )}
          </div>

          {/* Premium Links */}
          <div className="flex gap-5 mt-auto">
            {project.github && project.github !== '#' && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2.5 text-sm text-secondary hover:text-primary transition-all duration-300 group/link"
              >
                <motion.div
                  className="p-2 rounded-lg bg-hover/50 group-hover/link:bg-primary/10 transition-colors"
                  whileHover={{ rotate: 15 }}
                >
                  <Code2 size={16} />
                </motion.div>
                <span className="font-semibold">Source</span>
              </motion.a>
            )}
            {project.demo && project.demo !== '#' && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2.5 text-sm text-secondary hover:text-primary transition-all duration-300 group/link"
              >
                <motion.div
                  className="p-2 rounded-lg bg-hover/50 group-hover/link:bg-primary/10 transition-colors"
                  whileHover={{ rotate: -15 }}
                >
                  <ExternalLink size={16} />
                </motion.div>
                <span className="font-semibold">Live Demo</span>
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
