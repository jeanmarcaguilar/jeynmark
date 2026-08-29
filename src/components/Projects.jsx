import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
    if (carouselRef.current) {
      const slides = carouselRef.current.children;
      if (slides[index]) {
        const slidePosition = slides[index].offsetLeft;
        carouselRef.current.scrollTo({
          left: slidePosition,
          behavior: 'smooth'
        });
      }
    }
  }, []);

  const goToNext = useCallback(() => {
    const newIndex = currentIndex < projects.length - 1 ? currentIndex + 1 : 0;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  // Auto-rotate carousel
  useEffect(() => {
    if (projects.length > 1) {
      const interval = setInterval(() => {
        goToNext();
      }, 5000); // Rotate every 5 seconds

      return () => clearInterval(interval);
    }
  }, [currentIndex, projects.length, goToNext]);

  const handleScroll = useCallback(() => {
    if (carouselRef.current) {
      const slides = carouselRef.current.children;
      const scrollPosition = carouselRef.current.scrollLeft;
      let newIndex = 0;
      
      for (let i = 0; i < slides.length; i++) {
        const slidePosition = slides[i].offsetLeft;
        if (scrollPosition >= slidePosition - slides[i].offsetWidth / 2) {
          newIndex = i;
        }
      }
      
      setCurrentIndex(newIndex);
    }
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      return () => carousel.removeEventListener('scroll', handleScroll);
    }
  }, [projects.length, handleScroll, goToSlide]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ') {
        e.preventDefault();
        setIsPaused(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section
      id="projects"
      className="py-8 sm:py-12 pb-40 sm:pb-56 relative overflow-hidden"
      style={{ backgroundColor: '#050505' }}
    >
      {/* Subtle ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-150 opacity-[0.03]"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255,255,255,0.8), transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-150 h-100 opacity-[0.02]"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255,255,255,0.6), transparent 70%)',
          }}
        />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.012] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ─── Section Header ─── */}
        <div className="text-center mb-12">
          {/* Portfolio pill */}

          {/* Main heading */}
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 tracking-tight font-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Featured Projects
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-[#a1a1aa] text-xs max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            A curated collection of recent work — spanning product design, full-stack builds, and the occasional experiment.
          </motion.p>
        </div>

        {/* ─── Projects Carousel ─── */}
        <AnimatePresence mode="wait">
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.1,
                },
              },
            }}
          >
            {/* Carousel Container */}
            <div className="relative overflow-hidden">
              {/* Carousel Track */}
              <div
                ref={carouselRef}
                role="region"
                aria-roledescription="carousel"
                aria-label="Featured projects"
                className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
                style={{
                  scrollSnapType: 'x mandatory',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
              >
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${index + 1} of ${projects.length}`}
                    className="shrink-0 w-full"
                    style={{ scrollSnapAlign: 'center' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <div className="max-w-3xl mx-auto px-4">
                      <ProjectCard
                        project={project}
                        index={index}
                        onClick={setSelectedProject}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
