import { useMemo } from 'react';
import { motion } from 'framer-motion';

const wisdoms = [
  'मौनं अपि उपदेशः',
  'अल्पं श्रुतं, गम्भीरं चिन्त्यम्',
  'स्थितप्रज्ञस्य का भाषा',
];

export function FooterWisdom() {
  // Pick one wisdom randomly on page load
  const wisdom = useMemo(() => {
    const index = Math.floor(Math.random() * wisdoms.length);
    return wisdoms[index];
  }, []);

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.6 }}
      transition={{ delay: 2, duration: 1 }}
      className="py-10 text-center space-y-4"
    >
      <p className="font-sanskrit text-sm text-sandalwood-dark italic">
        {wisdom}
      </p>
      <p className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} Ashta Padi. All rights reserved.
      </p>
    </motion.footer>
  );
}
