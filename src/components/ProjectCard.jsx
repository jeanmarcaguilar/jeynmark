import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Lock, ArrowUpRight } from 'lucide-react';

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
      className="relative rounded-2xl border border-zinc-800 bg-[#0d0d0e]/90 hover:border-zinc-700/80 p-4 flex flex-col gap-4 overflow-hidden group cursor-pointer shadow-lg hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300"
    >
      {/* Mouse-following spotlight */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{ background: spotlightBackground }}
      />

      {/* Top browser bar/header */}
      <div className="flex items-center justify-between z-10 w-full px-1">
        {/* Traffic window controls */}
        <div className="flex gap-1.5 items-center">
          <span className="w-2 h-2 rounded-full bg-zinc-800" />
          <span className="w-2 h-2 rounded-full bg-zinc-800" />
          <span className="w-2 h-2 rounded-full bg-zinc-800" />
        </div>

        {/* Address bar mockup */}
        <div className="flex items-center gap-1.5 px-4 py-1 rounded-md bg-[#070708] border border-zinc-800/40 text-[10px] text-zinc-500 font-medium max-w-[50%] truncate select-none">
          <Lock size={8} className="text-zinc-600" />
          <span className="truncate">{project.title.toLowerCase()}.dev</span>
        </div>

        {/* Number indicator */}
        <div className="px-2 py-0.5 rounded text-[10px] font-bold font-mono text-[#00FF9D] bg-[#00FF9D]/10 border border-[#00FF9D]/20">
          {project.number}
        </div>
      </div>

      {/* Screenshot Container */}
      <div className="relative z-10 w-full aspect-video overflow-hidden rounded-xl border border-zinc-800/40 bg-zinc-950">
        <div className="absolute inset-0 z-10 pointer-events-none rounded-xl shadow-[inset_0_0_20px_rgba(0,0,0,0.4)]" />
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02] rounded-xl"
          loading="lazy"
        />
      </div>

      {/* Content description & details */}
      <div className="flex flex-col gap-3 z-10 px-1 mt-1">
        <h3 className="text-xl font-bold text-white tracking-tight leading-none group-hover:text-[#00FF9D] transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-zinc-400 text-xs sm:text-[13px] leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Technology Badges */}
        <div className="flex flex-wrap gap-1.5 my-1">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-md text-[10px] font-semibold text-zinc-400 bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700/80 hover:text-zinc-200 transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Link CTA */}
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 text-[11px] font-semibold text-zinc-400 group-hover:text-emerald-400 transition-colors duration-300 w-fit mt-1 group/cta"
        >
          <span>View Project</span>
          <ArrowUpRight size={12} className="transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 text-zinc-500 group-hover/cta:text-emerald-400" />
        </a>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
