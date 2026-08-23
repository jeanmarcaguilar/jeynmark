import { motion } from 'framer-motion';
import { skills } from '../data/skills';
import * as LucideIcons from 'lucide-react';

const Skills = () => {
  const getIcon = (iconName) => {
    const Icon = LucideIcons[iconName];
    return Icon ? Icon : LucideIcons.Code;
  };

  const categories = [
    { id: 'frontend', title: 'Frontend', skills: skills.frontend },
    { id: 'backend', title: 'Backend', skills: skills.backend },
    { id: 'database', title: 'Database', skills: skills.database },
    { id: 'tools', title: 'Tools', skills: skills.tools },
    { id: 'other', title: 'Other', skills: skills.other }
  ];

  return (
    <section id="skills" className="pt-36 pb-48 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-12 text-center">Technical Skills</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, categoryIndex) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="bg-card border border-border rounded-lg p-6 hover:border-secondary transition-colors"
              >
                <h3 className="text-xl font-semibold text-primary mb-4">{category.title}</h3>
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => {
                    const Icon = getIcon(skill.icon);
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: skillIndex * 0.05 }}
                        className="flex items-center gap-3 text-secondary hover:text-primary transition-colors"
                      >
                        <Icon size={20} className="text-secondary" />
                        <span className="font-medium">{skill.name}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
