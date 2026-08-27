import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const experiences = [
  {
    iconColor: "text-purple-500",
    title: "On-the-job Training IT / Technical Support",
    company: "Commission on Human Rights-Administrative Division",
    period: "October 2025 - January 2026",
    description: "Provided basic IT support by troubleshooting software applications, assisting with handling a records and documentations, maintaining digital assets and internal resources, and creating visual materials such as flyers, posters, and presentations to support organizational communication."
  },
  {
    iconColor: "text-cyan-500",
    title: "Full Stack Developer",
    company: "School Management System III - Capstone | School Management System",
    period: "2025 - 2026",
    description: "Developed two full-stack web applications, including a School Management System using PHP, MySQL, JSON, and RESTful APIs, and a Capstone Project using the Laravel Framework, PHP, JSON, and RESTful APIs."
  },
  {
    iconColor: "text-orange-500",
    title: "Full Stack Developer",
    company: "Bestlink College of the Philippines",
    period: "2024-2025",
    description: "Developed full-stack web applications such as a Parking Management System using PHP, JSON, MySQL, and RESTful APIs while implementing database management, backend functionality, and system integration."
  },
  {
    iconColor: "text-emerald-500",
    title: "Web Designer",
    company: "Bestlink College of the Philippines",
    period: "2023-2024",
    description: "Developed web development and database skills using HTML, CSS, JavaScript, and MySQL while applying front-end development, scripting, and data management concepts."
  },
  {
    iconColor: "text-blue-500",
    title: "Front-End Developer",
    company: "Bestlink College of the Philippines",
    period: "2022-2023",
    description: "Developed foundational skills in HTML, CSS, C#, and C++ while applying basic programming, web development, and problem-solving concepts."
  }
];

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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6 lg:mb-8"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight">
              Experience / Project Experience
              <p className="font-code text-zinc-400 text-xs leading-relaxed mb-3">A quick look at the roles and projects where I've applied what I've learned.</p>
            </h2>
          </motion.div>

          {/* Experience Cards */}
          <div className="space-y-6">
            {experiences.map((item, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="bg-[#0c0c0e]/80 backdrop-blur-md border border-[#1f1f23]/60 rounded-2xl p-6 md:p-8 hover:border-neutral-800 transition-all duration-300 group"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
                    {/* Left Column - Icon & Title info */}
                    <div className="md:col-span-5 flex items-start gap-4">
                      <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-[#161618] border border-neutral-800 rounded-xl group-hover:border-neutral-700 transition-colors duration-300">
                        <Briefcase size={20} className={item.iconColor} />
                      </div>
                      <div>
                        <h3 className="font-code text-lg md:text-xl font-bold text-white mb-2 leading-snug group-hover:text-white/90 transition-colors">
                          {item.title}
                        </h3>
                        <p className="font-code text-[#a5a5ad] font-medium text-sm mb-1">
                          {item.company}
                        </p>
                        <p className="font-code text-[#6f6f76] text-sm">
                          {item.period}
                        </p>
                      </div>
                    </div>

                    {/* Right Column - Description */}
                    <div className="md:col-span-7">
                      <p className="font-code text-[#a5a5ad] text-sm leading-relaxed md:pt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;