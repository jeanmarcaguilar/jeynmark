import { motion } from 'framer-motion';
import { Code2, Globe, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-4 bg-background border-t border-border text-[11px] leading-tight">
      <div className="w-full px-6 sm:px-10 lg:px-16">
        {/* Bottom Bar Only */}
        <div className="flex items-center justify-between gap-4 text-secondary">
          {/* Copyright */}
          <div className="flex items-center gap-1 text-[10px]">
            <span>© {new Date().getFullYear()} Jean Marc Aguilar</span>
            <span>•</span>
            <span className="flex items-center gap-0.5">
              Made with <Heart size={10} className="text-red-500 fill-red-500 mx-0.5" />
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-[10px]">
            <a
              href="https://github.com/jeanmarcaguilar"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors flex items-center gap-1"
            >
              <Code2 size={12} />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/jeanmarcaguilar"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors flex items-center gap-1"
            >
              <Globe size={12} />
              <span>LinkedIn</span>
            </a>
            <a
              href="mailto:jeanmarc.aguilar@example.com"
              className="hover:text-primary transition-colors flex items-center gap-1"
            >
              <Mail size={12} />
              <span>Email</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;