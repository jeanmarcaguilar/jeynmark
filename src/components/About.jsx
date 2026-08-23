import { motion } from 'framer-motion';
import { User, Lightbulb, ShieldCheck, Zap } from 'lucide-react';

const About = () => {
  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    // Increased top padding from pt-32 to pt-48 to push the content further down
    <section id="about" className="pt-28 pb-20 bg-linear-to-b from-background to-background/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-primary mb-24">
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column: Visual Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center relative order-2 md:order-1"
            >
              <div className="relative group">
                {/* Outer Glow/Gradient */}
                <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-transparent rounded-full blur-3xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                
                {/* Main Circle Container */}
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-linear-to-br from-border to-card flex items-center justify-center relative z-10 shadow-xl">
                  <div className="w-56 h-56 md:w-72 md:h-72 rounded-full bg-card flex items-center justify-center border border-border overflow-hidden">
                     {/* Placeholder for actual image if available, otherwise Icon */}
                     <User size={120} className="text-secondary opacity-80" />
                  </div>
                </div>

                {/* Decorative Orbiting Elements */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-4 -right-4 w-12 h-12 border border-primary/30 rounded-full z-0"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-4 -left-4 w-8 h-8 bg-primary/10 rounded-full z-0"
                />
                 <motion.div
                  animate={{ rotate: 180 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/2 -right-8 w-6 h-6 border border-dashed border-secondary rounded-full z-0"
                />
              </div>
            </motion.div>

            {/* Right Column: Narrative & Values */}
            <div className="space-y-10 order-1 md:order-2">
              {/* Main Bio */}
              <div className="space-y-4">
                <p className="text-secondary text-base md:text-lg leading-relaxed">
                  I’m an Information Technology graduate driven by a curiosity for how things work 
                  and a passion for making them work better. My journey isn't just about writing code; 
                  it’s about crafting digital experiences that are intuitive, reliable, and meaningful.
                </p>
                <p className="text-secondary text-base md:text-lg leading-relaxed">
                  I believe that great software is born from empathy—understanding the user's needs 
                  before writing a single line of logic. Whether I'm designing a responsive interface 
                  or architecting a database, my goal is always clarity and efficiency.
                </p>
              </div>

              {/* Core Values / Approach Section */}
              <div className="pt-8 border-t border-border">
                <h3 className="text-xl font-semibold text-primary mb-6">My Core Principles</h3>
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                  {/* Value 1 */}
                  <motion.div 
                    variants={itemVariants}
                    className="flex flex-col items-center text-center p-5 rounded-xl bg-card/50 border border-border hover:border-primary/50 hover:bg-card/70 transition-all duration-300"
                  >
                    <Lightbulb className="w-8 h-8 text-primary mb-3" />
                    <h4 className="font-medium text-primary text-sm">Problem Solver</h4>
                    <p className="text-xs text-secondary mt-2 leading-relaxed">Analytical thinking first, code second.</p>
                  </motion.div>

                  {/* Value 2 */}
                  <motion.div 
                    variants={itemVariants}
                    className="flex flex-col items-center text-center p-5 rounded-xl bg-card/50 border border-border hover:border-primary/50 hover:bg-card/70 transition-all duration-300"
                  >
                    <ShieldCheck className="w-8 h-8 text-primary mb-3" />
                    <h4 className="font-medium text-primary text-sm">Reliable</h4>
                    <p className="text-xs text-secondary mt-2 leading-relaxed">Building systems that last and scale.</p>
                  </motion.div>

                  {/* Value 3 */}
                  <motion.div 
                    variants={itemVariants}
                    className="flex flex-col items-center text-center p-5 rounded-xl bg-card/50 border border-border hover:border-primary/50 hover:bg-card/70 transition-all duration-300"
                  >
                    <Zap className="w-8 h-8 text-primary mb-3" />
                    <h4 className="font-medium text-primary text-sm">Adaptive</h4>
                    <p className="text-xs text-secondary mt-2 leading-relaxed">Continuously learning and evolving.</p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Divider between About and Technical Skills */}
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 pt-8"
          >
            <div className="h-px bg-linear-to-r from-transparent via-border to-transparent"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;