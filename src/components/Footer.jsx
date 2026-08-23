import { motion } from 'framer-motion';
import { Code2, Link2, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-8 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-secondary text-sm"
          >
            © 2026 Jean Marc Aguilar
          </motion.div>

          {/* Built with */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-secondary text-sm"
          >
            Built with React
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <a
              href="https://github.com/jeanmarcaguilar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Code2 size={20} />
            </a>
            <a
              href="https://linkedin.com/in/jeanmarcaguilar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Link2 size={20} />
            </a>
            <a
              href="mailto:jeanmarc.aguilar@example.com"
              className="text-secondary hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </motion.div>

          {/* Back to Top */}
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            className="flex items-center gap-2 text-secondary hover:text-primary transition-colors text-sm"
            aria-label="Back to top"
          >
            Back to top
            <ArrowUp size={16} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
