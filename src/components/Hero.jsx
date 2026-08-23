import { motion } from 'framer-motion';
import { ArrowRight, Download, Home, User, Code, FolderOpen, Briefcase, Award, Mail, Moon } from 'lucide-react';
import { useState, useEffect, Suspense } from 'react';
import HeroScene3D from './HeroScene3D';

const Hero = () => {
  // --- Name Typing State ---
  const [nameText, setNameText] = useState('');
  const [isNameDeleting, setIsNameDeleting] = useState(false);
  const fullName = "JEAN MARC AGUILAR";
  
  // --- Role Typing State ---
  const [roleText, setRoleText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isRoleDeleting, setIsRoleDeleting] = useState(false);
  
  // Roles to cycle through
  const roles = [
    "Full Stack Developer",
    "Back-End Developer",
    "Front-End Developer",
    "Node.js Developer",
    "JavaScript Developer",
    "React Developer",
    "PHP Developer",
  ];

  // 1. Effect for Name Typing/Deleting Loop
  useEffect(() => {
    const typeSpeed = isNameDeleting ? 50 : 100;
    const pauseTime = 2000; 

    let timer;

    if (!isNameDeleting && nameText === fullName) {
      timer = setTimeout(() => setIsNameDeleting(true), pauseTime);
    } else if (isNameDeleting && nameText === '') {
      setIsNameDeleting(false);
    } else {
      timer = setTimeout(() => {
        setNameText((prev) => 
          isNameDeleting 
            ? prev.substring(0, prev.length - 1) 
            : fullName.substring(0, prev.length + 1)
        );
      }, typeSpeed);
    }

    return () => clearTimeout(timer);
  }, [nameText, isNameDeleting]);

  // 2. Effect for Role Typing/Deleting Loop
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typeSpeed = isRoleDeleting ? 50 : 100;
    const pauseTime = 2000; 

    let timer;

    if (!isRoleDeleting && roleText === currentRole) {
      timer = setTimeout(() => setIsRoleDeleting(true), pauseTime);
    } else if (isRoleDeleting && roleText === '') {
      setIsRoleDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timer = setTimeout(() => {
        setRoleText((prev) => 
          isRoleDeleting 
            ? prev.substring(0, prev.length - 1) 
            : currentRole.substring(0, prev.length + 1)
        );
      }, typeSpeed);
    }

    return () => clearTimeout(timer);
  }, [roleText, isRoleDeleting, roleIndex]);

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
    { id: 'achievements', label: 'Achievements', icon: <Award size={20} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={20} /> },
  ];

  return (
    // REMOVED 'overflow-hidden' HERE TO PREVENT TEXT CUT-OFF
    <section id="home" className="min-h-screen flex items-center justify-center relative bg-background">
      
      {/* 3D Background Scene */}
      <Suspense fallback={null}>
        <HeroScene3D />
      </Suspense>

      {/* Background Elements - Kept overflow-hidden here so grid doesn't spill out */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-size-[50px_50px]" />
        {/* Dark vignette edges so text stays readable */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(5,5,5,0.72) 100%)' }} />
        {/* Left-side fade so left content area is always legible */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(5,5,5,0.6) 0%, transparent 50%, rgba(5,5,5,0.3) 100%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full" style={{ position: 'relative', zIndex: 10 }}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-secondary text-lg mb-2">HELLO, I'M</p>
              
              {/* 
                UPDATED NAME STYLING:
                - 'whitespace-nowrap': Keeps text on one line.
                - 'text-[clamp(...)]': Makes font responsive. It will be huge on desktop but shrink automatically on mobile so it never gets cut off.
              */}
              <h1 className="font-bold text-primary mb-4 whitespace-nowrap text-[clamp(2rem,5vw,4rem)] leading-tight">
                {nameText}
                <span className="animate-pulse text-primary">|</span>
              </h1>
              
              {/* ROLE TEXT - Smaller and cleaner */}
              <div className="flex items-center gap-2 h-8">
                <p className="text-lg md:text-2xl text-secondary font-light">
                  I'm a <span className="text-primary font-medium">{roleText}</span>
                  <span className="animate-pulse text-primary ml-1">|</span>
                </p>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-secondary text-lg max-w-xl leading-relaxed"
            >
              
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => scrollToSection(e, 'projects')}
                className="bg-primary text-background px-8 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-white transition-colors"
              >
                View My Projects
                <ArrowRight size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => scrollToSection(e, 'contact')}
                className="border border-border text-primary px-8 py-3 rounded-lg font-medium hover:bg-card transition-colors"
              >
                Contact Me
              </motion.button>
            </motion.div>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-secondary text-background px-6 py-3 rounded-lg font-medium inline-flex items-center gap-2 hover:bg-white transition-colors"
            >
              <Download size={20} />
              Download Resume
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;