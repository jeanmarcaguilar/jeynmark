import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import profileImg from '../assets/images/profile.jpg';

const About = () => {
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="pt-12 pb-20 sm:pt-16 sm:pb-28 bg-[#050505] text-white relative overflow-hidden select-none">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-0 w-125 h-125 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Grid: About Info + Profile Headshot */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Status Pill */}
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-[#00FF9D] text-xs font-code tracking-wide shadow-[0_0_15px_rgba(0,255,157,0.12)]">
                <span className="w-2 h-2 rounded-full bg-[#00FF9D] animate-pulse" />
                Open for new opportunities
              </span>
            </div>

            {/* Title */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight">
              About Me
            </h2>

            {/* Bio Paragraphs */}
            <div className="font-code text-zinc-400 text-sm sm:text-base leading-relaxed space-y-4 max-w-xl">
              <p>
                As a <span className="text-white font-medium">Full Stack Developer</span>,
              </p>
              <p>
                I focus on the synergy between <span className="text-white font-medium">clean architecture</span> and <span className="text-white font-medium">thoughtful interfaces</span>.
              </p>
              <p>
                I specialize in building digital products that are not just functional but <span className="text-emerald-400 font-medium">robust</span>, <span className="text-emerald-400 font-medium">scalable</span>, and crafted to deliver exceptional experiences from <span className="text-white font-medium">API to UI</span>.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Headshot Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative group max-w-md w-full rounded-3xl overflow-hidden border border-zinc-800/80 bg-zinc-900/50 shadow-2xl transition-all duration-500 hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(0,255,157,0.1)]">
              <img 
                src={profileImg} 
                alt="Jean Marc Aguilar Profile" 
                className="w-full h-85 sm:h-100 object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none" />
            </div>
          </motion.div>

        </div>

        {/* Divider */}
        <div className="w-full h-px bg-zinc-800/80 my-16 sm:my-20" />

        {/* Bottom Grid: Education & Stack */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Education Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 p-6 sm:p-8 rounded-2xl bg-zinc-950/40 border border-zinc-900 hover:border-zinc-800 transition-colors"
          >
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
              Education
            </h3>
            <p className="font-code text-zinc-400 text-sm sm:text-base leading-relaxed max-w-md">
              My foundation is a <span className="text-white font-medium">BS in Information Technology</span>, which solidified my grasp of modern engineering standards and design thinking — letting me transition smoothly into a production-ready professional.
            </p>
            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={(e) => scrollToSection(e, 'projects')}
                className="bg-zinc-950/90 border border-zinc-800 hover:border-zinc-500 text-white font-code text-xs sm:text-sm px-6 py-2.5 rounded-full inline-flex items-center gap-2 transition-all hover:bg-zinc-900 shadow-lg cursor-pointer"
              >
                View Projects
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </motion.button>
            </div>
          </motion.div>

          {/* Stack Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4 p-6 sm:p-8 rounded-2xl bg-zinc-950/40 border border-zinc-900 hover:border-zinc-800 transition-colors"
          >
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
              Stack
            </h3>
            <p className="font-code text-zinc-400 text-sm sm:text-base leading-relaxed max-w-md">
              I operate across the full product lifecycle using <span className="text-emerald-400 font-medium">React</span>, <span className="text-emerald-400 font-medium">Node.js</span>, <span className="text-emerald-400 font-medium">TypeScript</span>, and modern CSS frameworks like <span className="text-white font-medium">Tailwind</span>. My philosophy prioritizes performance, accessibility, and modular design end-to-end.
            </p>
            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={(e) => scrollToSection(e, 'skills')}
                className="bg-zinc-950/90 border border-zinc-800 hover:border-zinc-500 text-white font-code text-xs sm:text-sm px-6 py-2.5 rounded-full inline-flex items-center gap-2 transition-all hover:bg-zinc-900 shadow-lg cursor-pointer"
              >
                View Stack
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </motion.button>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default About;