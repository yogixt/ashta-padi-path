import { motion } from 'framer-motion';
import { Mail, Globe, MapPin } from 'lucide-react';

export function FooterWisdom() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="py-8 border-t border-border bg-card/50"
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Contact Info */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <a 
              href="mailto:contact@ashtapadi.org" 
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" />
              contact@ashtapadi.org
            </a>
            <a 
              href="https://ashtapadi.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Globe className="w-4 h-4" />
              ashtapadi.org
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              India
            </span>
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Ashta Padi. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
