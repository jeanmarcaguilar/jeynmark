import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const ProjectCard = ({ project, index, onClick }) => {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const spotlightX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const spotlightY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const spotlightBackground = useTransform(
    [spotlightX, spotlightY],
    ([x, y]) =>
      `radial-gradient(420px circle at ${x * 100}% ${y * 100}%, rgba(0,255,157,0.12), transparent 42%)`
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
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      onClick={() => onClick?.(project)}
      className="relative group cursor-pointer"
    >
      {/* Ambient bloom */}
      <div className="absolute -inset-8 rounded-4xl bg-[#00FF9D]/4 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Gradient rim */}
      <div className="absolute -inset-px rounded-[1.35rem] bg-linear-to-b from-white/20 via-zinc-700/25 to-emerald-500/15 opacity-70 group-hover:opacity-100 group-hover:from-emerald-300/35 group-hover:via-white/10 group-hover:to-emerald-500/30 transition-all duration-500" />

      <div className="relative rounded-[1.3rem] bg-[#080809] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
          style={{ background: spotlightBackground }}
        />

        {/* Corner ticks */}
        <span className="absolute top-3 left-3 z-30 w-3 h-3 border-t border-l border-white/25 group-hover:border-emerald-400/70 transition-colors duration-300" />
        <span className="absolute top-3 right-3 z-30 w-3 h-3 border-t border-r border-white/25 group-hover:border-emerald-400/70 transition-colors duration-300" />
        <span className="absolute bottom-3 left-3 z-30 w-3 h-3 border-b border-l border-white/25 group-hover:border-emerald-400/70 transition-colors duration-300" />
        <span className="absolute bottom-3 right-3 z-30 w-3 h-3 border-b border-r border-white/25 group-hover:border-emerald-400/70 transition-colors duration-300" />

        {/* Screenshot stage */}
        <div className="relative aspect-16/10 overflow-hidden bg-zinc-950">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top scale-[1.01] transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#080809] via-[#080809]/25 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-br from-black/20 via-transparent to-emerald-950/20" />

          <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between gap-3">
            <span className="font-code text-[10px] tracking-[0.22em] text-emerald-400/90 bg-black/45 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full">
              {project.number}
            </span>
            <span className="font-code text-[10px] text-zinc-300 bg-black/45 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full truncate">
              {project.category}
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-10 p-5 sm:p-6">
            <div className="flex items-end justify-between gap-4">
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight leading-none group-hover:text-[#00FF9D] transition-colors duration-300">
                {project.title}
              </h3>
              <span className="shrink-0 w-9 h-9 rounded-full border border-white/15 bg-white/5 backdrop-blur-md flex items-center justify-center text-zinc-300 group-hover:border-emerald-400/40 group-hover:text-emerald-400 group-hover:bg-emerald-400/10 transition-all duration-300">
                <ArrowUpRight size={15} />
              </span>
            </div>
          </div>
        </div>

        {/* Details strip */}
        <div className="relative z-10 px-5 sm:px-6 pt-4 pb-5 flex flex-col gap-3.5">
          <p className="text-zinc-400 text-xs sm:text-[13px] leading-relaxed line-clamp-2">
            {project.description}
          </p>

          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded-full text-[10px] font-code text-zinc-400 bg-zinc-900/80 border border-white/5 group-hover:border-emerald-500/15 group-hover:text-zinc-300 transition-colors duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="shrink-0 flex items-center gap-1 text-[11px] font-semibold text-zinc-500 hover:text-emerald-400 transition-colors duration-300"
            >
              <span>GitHub</span>
              <ArrowUpRight size={11} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
