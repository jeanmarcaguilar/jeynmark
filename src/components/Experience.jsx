import { motion } from 'framer-motion';
import { experience } from '../data/experience';
import { Briefcase, Calendar } from 'lucide-react';

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-background relative overflow-hidden">
      {/* Premium background effects */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/3 to-transparent pointer-events-none"></div>
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-125 h-125 bg-primary/4 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-150 h-150 bg-primary/3 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.div
              className="inline-block mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="px-4 py-2 bg-primary/5 rounded-full border border-primary/10 text-primary text-sm font-medium tracking-wider">
                JOURNEY
              </span>
            </motion.div>
            
            <motion.h2 
              className="text-5xl md:text-6xl font-bold text-primary mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Professional Experience
            </motion.h2>
            
            <motion.div 
              className="w-32 h-1 bg-linear-to-r from-transparent via-primary to-transparent mx-auto mb-8"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 128, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
            ></motion.div>
            
            <motion.p 
              className="text-secondary text-lg max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              A timeline of my professional journey, showcasing career growth, 
              key achievements, and the evolution of my expertise across different roles and industries.
            </motion.p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-px bg-linear-to-b from-transparent via-primary/20 to-transparent" />

            {/* Timeline Items */}
            <div className="space-y-12">
              {experience.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <motion.div 
                    className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background z-10 shadow-lg shadow-primary/20"
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.2 }}
                  />

                  {/* Content */}
                  <div className={`ml-8 md:ml-0 ${
                    index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                  } flex-1`}>
                    <motion.div 
                      className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group"
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={`flex items-center gap-2 mb-3 ${index % 2 === 0 ? 'md:justify-start md:flex-row-reverse' : ''}`}>
                        <motion.div 
                          className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Calendar size={18} className="text-primary" />
                        </motion.div>
                        <span className="text-primary font-semibold">{item.year}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-primary mb-2 group-hover:text-primary/90 transition-colors">{item.title}</h3>
                      <p className="text-secondary/90 font-medium mb-4 text-lg">{item.company}</p>
                      <p className="text-secondary/70 text-sm leading-relaxed">{item.description}</p>
                    </motion.div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
