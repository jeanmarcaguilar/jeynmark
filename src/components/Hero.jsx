import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const Hero = () => {
  const spotifyTrackUrl = "https://open.spotify.com/embed/track/4cOdK2wGLETKBW3PvgPWqT?utm_source=generator&theme=0";

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen bg-[#050505] text-white flex flex-col justify-center relative overflow-hidden select-none">
      {/* Dynamic Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-emerald-500/12 rounded-full blur-[180px]" />
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-emerald-500/8 rounded-full blur-[140px]" />
        <div className="absolute bottom-20 left-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px]" />
      </div>

      {/* Main Content Area */}
      <div className="w-full flex-1 flex flex-col justify-center relative z-10 px-4 sm:px-6 py-12 lg:pl-8 lg:pr-32 xl:pr-48">
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center space-y-8 md:space-y-10">

          {/* Massive Single Line Name */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="w-full flex justify-center overflow-visible"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight uppercase whitespace-nowrap leading-none drop-shadow-2xl">
              <span className="text-white">JEAN MARC </span>
              <span className="text-stroke-green">AGUILAR</span>
            </h1>
          </motion.div>

          {/* Tagline / Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-zinc-300 font-mono text-sm sm:text-lg md:text-xl font-medium tracking-wide"
          >
            <span className="text-[#00FF9D] font-bold text-xl">|</span>
            <span>Full Stack Developer</span>
            <span className="text-zinc-600">|</span>
            <span>Back-End Developer</span>
            <span className="text-zinc-600">|</span>
            <span>Problem Solver</span>
            <span className="text-[#00FF9D] font-bold text-xl">|</span>
          </motion.div>

          {/* Personalized Bio Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-mono text-zinc-400 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mx-auto text-center"
          >
            I’m Jean Marc Aguilar, an IT graduate who enjoys turning complex ideas into simple, purposeful web experiences. My work sits at the intersection of development and design, creating intuitive interfaces and reliable systems focused on clean, efficient, real-world solutions.
          </motion.p>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex items-center justify-center gap-8 sm:gap-14 pt-2"
          >
            <div className="border-r border-zinc-800/80 pr-8 sm:pr-14 text-center">
              <div className="text-3xl sm:text-5xl font-extrabold text-white flex items-center justify-center">
                5<span className="text-[#00FF9D]">+</span>
              </div>
              <div className="text-xs sm:text-sm font-mono text-zinc-400 tracking-widest uppercase mt-2">
                YEARS EXP.
              </div>
            </div>

            <div className="border-r border-zinc-800/80 pr-8 sm:pr-14 text-center">
              <div className="text-3xl sm:text-5xl font-extrabold text-white flex items-center justify-center">
                40<span className="text-[#00FF9D]">+</span>
              </div>
              <div className="text-xs sm:text-sm font-mono text-zinc-400 tracking-widest uppercase mt-2">
                PROJECTS
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl sm:text-5xl font-extrabold text-white flex items-center justify-center">
                15<span className="text-[#00FF9D]">+</span>
              </div>
              <div className="text-xs sm:text-sm font-mono text-zinc-400 tracking-widest uppercase mt-2">
                TECHNOLOGIES
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full sm:w-auto"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={(e) => scrollToSection(e, 'projects')}
              className="w-full sm:w-auto bg-[#00FF9D] hover:bg-[#33FFAD] text-black font-bold px-9 py-4 rounded-full flex items-center justify-center gap-2.5 transition-all shadow-[0_0_30px_rgba(0,255,157,0.4)] text-lg cursor-pointer whitespace-nowrap"
            >
              View Projects
              <ArrowUpRight size={22} strokeWidth={2.5} />
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href="/resume.pdf"
              download
              className="w-full sm:w-auto bg-black/60 border border-zinc-800 hover:border-zinc-500 text-white font-medium px-9 py-4 rounded-full transition-all text-lg inline-flex items-center justify-center cursor-pointer whitespace-nowrap"
            >
              Download CV
            </motion.a>
          </motion.div>

          {/* Music Player */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="w-full max-w-md mx-auto pt-4"
          >
            <div className="bg-[#07130c]/90 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-2.5 shadow-[0_0_35px_rgba(0,255,157,0.12)]">
              <iframe
                style={{ borderRadius: '12px' }}
                src={spotifyTrackUrl}
                width="100%"
                height="80"
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Spotify Music Player"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;