import { motion } from 'framer-motion';
import { education } from '../data/education';
import { Award, Calendar } from 'lucide-react';

const Education = () => {
  return (
    <section id="certificates" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-12 text-center">Certificates</h2>

          <div className="max-w-3xl">
            {education.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-card border border-border rounded-lg p-8 hover:border-secondary transition-colors"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-hover rounded-lg">
                    <Award size={24} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-primary mb-2">{item.degree}</h3>
                    <p className="text-secondary mb-1">{item.institution}</p>
                    <div className="flex items-center gap-2 text-secondary/80 text-sm">
                      <Calendar size={16} />
                      <span>{item.period}</span>
                    </div>
                  </div>
                </div>
                <p className="text-secondary/80 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
