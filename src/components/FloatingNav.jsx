import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Code, FolderOpen, Briefcase, Award, Mail, Moon } from 'lucide-react';
import { useState } from 'react';

const FloatingNav = () => {
  const [hoveredId, setHoveredId] = useState(null);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: <Home size={20} /> },
    { id: 'about', label: 'About', icon: <User size={20} /> },
    { id: 'skills', label: 'Skills', icon: <Code size={20} /> },  
    { id: 'projects', label: 'Projects', icon: <FolderOpen size={20} /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={20} /> },
    { id: 'education', label: 'Education', icon: <Award size={20} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={20} /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-lg px-4"
    >
      {/* Main Capsule Container */}
      <div className="relative flex items-center bg-card/80 backdrop-blur-xl border border-border rounded-full p-2 pl-4 pr-2 shadow-2xl shadow-black/50 overflow-x-auto scrollbar-hide">
        
        {/* Background Effects Container - with overflow-hidden to contain effects */}
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
          {/* 1. Enhanced Fluid Background with Multiple Moving Gradients - Monochrome Theme */}
          <motion.div 
            className="absolute inset-0 rounded-full opacity-50"
            animate={{
              background: [
                "radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.15), transparent 40%), radial-gradient(circle at 80% 70%, rgba(161, 161, 170, 0.1), transparent 40%)",
                "radial-gradient(circle at 80% 30%, rgba(255, 255, 255, 0.15), transparent 40%), radial-gradient(circle at 20% 70%, rgba(161, 161, 170, 0.1), transparent 40%)",
                "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.15), transparent 40%), radial-gradient(circle at 50% 50%, rgba(161, 161, 170, 0.1), transparent 40%)",
                "radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.15), transparent 40%), radial-gradient(circle at 80% 70%, rgba(161, 161, 170, 0.1), transparent 40%)"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* 2. Liquid Wave Effect - Subtle Background Movement - Monochrome */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            style={{
              background: 'linear-gradient(45deg, rgba(255,255,255,0.03) 0%, transparent 50%, rgba(161,161,170,0.03) 100%)',
              backgroundSize: '200% 200%'
            }}
          />

          {/* 3. Floating Bubbles - Small liquid orbs - Monochrome */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: '60px',
                height: '60px',
                background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
              }}
              animate={{
                x: [0, 100, 0, -100, 0],
                y: [0, -30, 0, 30, 0],
                scale: [1, 1.2, 1, 0.8, 1],
                opacity: [0.2, 0.4, 0.2, 0.3, 0.2]
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }}
            />
          ))}

          {/* 4. Enhanced Glossy Shine Effect - Monochrome */}
          <motion.div
            className="absolute inset-0 rounded-full z-0"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
          >
            <div className="w-1/3 h-full bg-linear-to-r from-transparent via-white/10 to-transparent skew-x-12 blur-sm" />
          </motion.div>

          {/* 5. Secondary Glow Ring - Monochrome */}
          <motion.div
            className="absolute inset-0 rounded-full z-0"
            animate={{
              boxShadow: [
                'inset 0 0 20px rgba(255,255,255,0.03)',
                'inset 0 0 30px rgba(255,255,255,0.06)',
                'inset 0 0 20px rgba(255,255,255,0.03)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Navigation Items */}
        <nav className="flex items-center gap-1 relative z-10 min-w-max">
          {navItems.map((item) => (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => scrollToSection(e, item.id)}
              onHoverStart={() => setHoveredId(item.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-secondary hover:text-white transition-colors shrink-0"
            >
              {/* 6. Enhanced Liquid Pill with Ripple Effect - Monochrome */}
              <AnimatePresence>
                {hoveredId === item.id && (
                  <>
                    <motion.div
                      layoutId="liquid-pill"
                      className="absolute inset-0 bg-linear-to-br from-white/15 via-white/8 to-white/3 backdrop-blur-md rounded-full border border-white/20"
                      style={{
                        boxShadow: '0 0 25px rgba(255,255,255,0.1), inset 0 0 15px rgba(255,255,255,0.05)'
                      }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                    {/* Ripple Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full border border-white/15"
                      initial={{ scale: 1, opacity: 0.6 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    
                    {/* Tooltip Label - Hidden on mobile */}
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: -40, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.8 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="hidden sm:block absolute top-0 left-1/2 transform -translate-x-1/2 bg-card border border-border text-primary text-xs font-medium px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap z-20"
                      style={{
                        boxShadow: '0 4px 20px rgba(0,0,0,0.5), 0 0 15px rgba(255,255,255,0.05)'
                      }}
                    >
                      {item.label}
                      {/* Tooltip Arrow */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-card border-r border-b border-border"></div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
              
              {/* Icon stays above the liquid pill */}
              <span className="relative z-10 flex items-center justify-center">
                <span className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                  {item.icon}
                </span>
              </span>
            </motion.a>
          ))}
        </nav>

        {/* Divider */}
        <div className="w-px h-6 bg-black mx-2 relative z-10"></div>

        {/* Theme Toggle */}
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-secondary hover:text-white hover:bg-white/10 transition-colors z-10 shrink-0"
          title="Toggle Theme"
        >
          <span className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
            <Moon size={16} />
          </span>
        </motion.button>

        {/* Profile Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative ml-2 bg-linear-to-br from-white via-gray-200 to-gray-400 text-black w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-[10px] sm:text-sm shadow-lg z-10 shrink-0"
          title="Profile"
        >
          JM
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FloatingNav;