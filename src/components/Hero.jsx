import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const Hero = () => {
  const primaryStack = ['Laravel', 'React', 'MySQL', 'Node.js', 'HTML5'];

  const marqueeItems = [
    'REACT', 'TYPESCRIPT', 'REDIS', 'POSTGRESQL', 'NEXT.JS',
    'NODE.JS', 'DOCKER', 'PRISMA',
  ];

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen bg-[#050505] text-white flex flex-col justify-between relative overflow-hidden select-none">
      {/* Dynamic Background Glows — enhanced green aurora */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Primary aurora glow — upper center */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-225 h-150 bg-emerald-500/12 rounded-full blur-[180px]" />
        {/* Secondary glow — center right */}
        <div className="absolute top-1/4 right-1/4 w-125 h-125 bg-emerald-500/8 rounded-full blur-[140px]" />
        {/* Tertiary subtle glow — bottom left */}
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-emerald-500/5 rounded-full blur-[120px]" />
      </div>

      {/* Main Right Content Area */}
      <div className="flex-1 min-w-0 flex flex-col justify-between min-h-screen lg:min-h-0 relative z-10 overflow-x-hidden">
        {/* Center content */}
        <div className="px-4 sm:px-6 lg:px-10 xl:px-14 py-8 lg:py-12 flex-1 flex items-center justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center w-full max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 flex justify-center w-full"
            >
              <div className="relative w-full max-w-md xl:max-w-115 aspect-square rounded-2xl border border-emerald-500/30 bg-[#07130c]/70 backdrop-blur-md p-6 flex flex-col justify-between overflow-hidden shadow-[0_0_40px_rgba(0,255,157,0.08)]">

                {/* Radar Lines Background */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  {/* Concentric Circles */}
                  <div className="w-[85%] h-[85%] rounded-full border border-emerald-500/20 absolute" />
                  <div className="w-[60%] h-[60%] rounded-full border border-emerald-500/25 absolute" />
                  <div className="w-[35%] h-[35%] rounded-full border border-emerald-500/30 absolute" />

                  {/* Crosshairs */}
                  <div className="w-full h-px bg-emerald-500/15 absolute" />
                  <div className="h-full w-px bg-emerald-500/15 absolute" />

                  {/* Rotating Radar Scanner Sweep */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'conic-gradient(from 0deg at 50% 50%, rgba(0, 255, 157, 0.2) 0deg, transparent 60deg, transparent 360deg)',
                    }}
                  />

                  {/* Blinking Target Dots */}
                  <div className="w-2 h-2 rounded-full bg-[#00FF9D] absolute top-[28%] right-[32%] shadow-[0_0_8px_#00FF9D] animate-ping" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00FF9D] absolute bottom-[35%] left-[25%] shadow-[0_0_6px_#00FF9D]" />
                </div>

                {/* Top Corner Grid Markers */}
                <div className="relative z-10 flex justify-between text-xs font-mono text-emerald-500/50">
                  <span>+</span>
                  <span>+</span>
                </div>

                {/* Glass Overlay Primary Stack Card */}
                <div className="relative z-20 bg-[#0a1b12]/90 backdrop-blur-xl border border-emerald-500/30 rounded-xl p-5 sm:p-6 shadow-2xl mt-auto">
                  <h3 className="text-xs sm:text-sm font-mono font-bold tracking-widest text-zinc-300 uppercase mb-3.5">
                    PRIMARY STACK
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {primaryStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-[#00FF9D] font-mono text-xs sm:text-sm font-medium shadow-[0_0_10px_rgba(0,255,157,0.12)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Corner Grid Markers */}
                <div className="relative z-10 flex justify-between text-xs font-mono text-emerald-500/50 mt-2">
                  <span>+</span>
                  <span>+</span>
                </div>
              </div>
            </motion.div>

            {/* Right Typography & Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-7 space-y-6 xl:space-y-8 w-full relative"
            >
              {/* Background Giant Outline Text */}
              <div className="absolute -top-24 -left-6 pointer-events-none select-none opacity-75 hidden sm:block z-0">
                <div className="text-8xl lg:text-[9rem] xl:text-[11.5rem] font-black font-mono tracking-tighter uppercase text-stroke-bg whitespace-nowrap">
                  
                </div>
                <div className="text-8xl lg:text-[9rem] xl:text-[11.5rem] font-black font-mono tracking-tighter uppercase text-stroke-bg whitespace-nowrap leading-[0.85]">
                  
                </div>
              </div>

              {/* Foreground Typography */}
              <div className="space-y-2 relative z-10">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white tracking-tight uppercase leading-[0.9]">
                  JEAN MARC
                </h1>
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight uppercase leading-[0.9] text-stroke-green">
                  AGUILAR
                </h1>
              </div>

              {/* Tagline / Subtitle */}
              <div className="flex items-center gap-2.5 text-zinc-300 font-mono text-sm sm:text-base font-medium tracking-wide">
                <span className="text-[#00FF9D] font-bold text-lg">|</span>
                <span>Full Stack Developer</span>
                <span className="text-zinc-600">|</span>
                <span>Back-End Developer</span>
                <span className="text-zinc-600">|</span>
                <span>Problem Solver</span>
                <div className="flex items-center gap-2.5 text-zinc-300 font-mono text-sm sm:text-base font-medium tracking-wide">
                  <span className="text-[#00FF9D] font-bold text-lg">|</span>
                </div>
              </div>

              {/* Description */}
              <p className="font-mono text-zinc-400 text-sm sm:text-base max-w-xl leading-relaxed">
                Building fast, scalable web applications where clean code meets thoughtful design – from API to UI.
              </p>

              {/* Stats Row + Action Buttons — side by side */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-10 pt-2">
                {/* Stats */}
                <div className="flex items-center gap-6 sm:gap-8">
                  <div className="border-r border-zinc-800/80 pr-6 sm:pr-8">
                    <div className="text-3xl sm:text-4xl font-extrabold text-white flex items-center">
                      5<span className="text-[#00FF9D]">+</span>
                    </div>
                    <div className="text-xs sm:text-sm font-mono text-zinc-400 tracking-widest uppercase mt-1">
                      YEARS EXP.
                    </div>
                  </div>

                  <div className="border-r border-zinc-800/80 pr-6 sm:pr-8">
                    <div className="text-3xl sm:text-4xl font-extrabold text-white flex items-center">
                      40<span className="text-[#00FF9D]">+</span>
                    </div>
                    <div className="text-xs sm:text-sm font-mono text-zinc-400 tracking-widest uppercase mt-1">
                      PROJECTS
                    </div>
                  </div>

                  <div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-white flex items-center">
                      15<span className="text-[#00FF9D]">+</span>
                    </div>
                    <div className="text-xs sm:text-sm font-mono text-zinc-400 tracking-widest uppercase mt-1">
                      TECHNOLOGIES
                    </div>
                  </div>
                </div>

                {/* Buttons — stacked vertically beside stats */}
                <div className="flex flex-col gap-3 sm:ml-auto">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={(e) => scrollToSection(e, 'projects')}
                    className="bg-[#00FF9D] hover:bg-[#33FFAD] text-black font-bold px-8 py-3.5 rounded-full flex items-center justify-center gap-2.5 transition-all shadow-[0_0_25px_rgba(0,255,157,0.4)] text-base cursor-pointer whitespace-nowrap"
                  >
                    View Projects
                    <ArrowUpRight size={20} strokeWidth={2.5} />
                  </motion.button>

                  <motion.a
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    href="/resume.pdf"
                    download
                    className="bg-black/60 border border-zinc-800 hover:border-zinc-500 text-white font-medium px-8 py-3.5 rounded-full transition-all text-base inline-flex items-center justify-center cursor-pointer whitespace-nowrap"
                  >
                    Download CV
                  </motion.a>
                </div>
              </div>

            </motion.div>

          </div>
        </div>

        {/* Bottom Section: Tech Marquee + Copyright */}
        <div className="relative z-10 mt-auto">
          {/* Tech Marquee Strip */}
          <div className="border-t border-zinc-800/60 overflow-hidden py-4 bg-[#050505]/80 backdrop-blur-sm">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
                <span key={index} className="flex items-center mx-4 sm:mx-6 text-xs sm:text-sm font-mono tracking-[0.2em] text-zinc-400 uppercase shrink-0">
                  {item}
                  <span className="ml-4 sm:ml-6 w-1.5 h-1.5 rounded-full bg-[#00FF9D] opacity-60 shrink-0" />
                </span>
              ))}
            </div>
          </div>


        </div>
      </div>
    </section>
  );
};

export default Hero;