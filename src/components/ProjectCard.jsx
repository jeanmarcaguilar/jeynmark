import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Bookmark, ArrowRight } from 'lucide-react';

const ProjectCard = ({ project, index, onClick }) => {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Smooth spring-based spotlight following
  const spotlightX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const spotlightY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const spotlightBackground = useTransform(
    [spotlightX, spotlightY],
    ([x, y]) =>
      `radial-gradient(500px circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.035), transparent 40%)`
  );

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      onClick={() => onClick?.(project)}
      className="project-card-horizontal group cursor-pointer"
    >
      {/* Mouse-following spotlight */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: spotlightBackground }}
      />

      {/* Top edge highlight line */}
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-linear-to-r from-transparent via-white/[0.07] to-transparent group-hover:via-white/12 transition-all duration-700" />

      {/* Card layout: image left, info right */}
      <div className="flex flex-col md:flex-row h-full relative z-10">
        {/* Project Screenshot */}
        <div className="project-card-image-wrapper md:w-[48%] w-full shrink-0">
          <div className="relative h-full overflow-hidden m-3 md:m-3 md:mr-0 rounded-xl">
            {/* Subtle inner shadow over image */}
            <div className="absolute inset-0 z-10 pointer-events-none rounded-xl"
              style={{
                boxShadow: 'inset 0 0 30px rgba(0,0,0,0.3)',
              }}
            />
            
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] rounded-xl"
              style={{ minHeight: '220px' }}
              loading="lazy"
            />
            
            {/* Bottom fade overlay on mobile */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-[#0a0a0b] to-transparent md:hidden rounded-b-xl" />
          </div>
        </div>

        {/* Project Information */}
        <div className="md:w-[52%] w-full p-5 md:p-7 md:pl-6 flex flex-col justify-center relative">
          {/* Bookmark icon top-right */}
          <div className="absolute top-3 right-3 md:top-5 md:right-5">
            <motion.div
              whileHover={{ scale: 1.2, y: -2 }}
              transition={{ duration: 0.2 }}
              className="text-[#27272a] group-hover:text-[#52525b] transition-colors duration-500"
            >
              <Bookmark size={18} strokeWidth={1.5} />
            </motion.div>
          </div>

          {/* Project number */}
          <span className="text-[#3f3f46] text-xs font-mono font-semibold tracking-[0.2em] mb-2 block">
            {project.number}
          </span>

          {/* Project title */}
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2.5 tracking-tight leading-tight">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-[#a1a1aa] text-[0.82rem] leading-relaxed mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Technology badges */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.technologies.map((tech) => (
              <span key={tech} className="tech-badge">
                {tech}
              </span>
            ))}
          </div>

          {/* CTA */}
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 text-[0.82rem] text-[#71717a] group-hover:text-white transition-colors duration-300 font-medium tracking-wide group/cta w-fit"
            whileHover={{ x: 3 }}
          >
            <span>View Project</span>
            <ArrowRight size={14} className="transition-transform duration-300 group-hover/cta:translate-x-1" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
