import { motion } from 'framer-motion';

const scriptures = [
  {
    title: 'पतञ्जलियोगसूत्रम्',
    verse: 'योगश्चित्तवृत्तिनिरोधः',
  },
  {
    title: 'हठयोगप्रदीपिका',
    verse: 'हठविद्यां हि मत्स्येन्द्रगोरक्षाद्याः विजानते',
  },
  {
    title: 'योगतरावली',
    verse: 'योगमार्गस्य सोपानं विवृणोति तरङ्गवत्',
  },
  {
    title: 'भगवद्गीता',
    verse: 'योगः कर्मसु कौशलम्',
  },
  {
    title: 'योगवासिष्ठः',
    verse: 'चित्तमेव हि संसारः',
  },
];

export function ScripturePillars() {
  return (
    <div className="space-y-12 md:space-y-16">
      {scriptures.map((scripture, index) => (
        <motion.div
          key={scripture.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.15, duration: 0.6 }}
          className="text-center"
        >
          {/* Scripture title */}
          <h3 className="font-sanskrit text-xl md:text-2xl text-earth mb-3">
            {scripture.title}
          </h3>
          
          {/* Verse */}
          <p className="font-sanskrit text-base md:text-lg text-sandalwood-dark italic">
            {scripture.verse}
          </p>
          
          {/* Subtle divider (not after last item) */}
          {index < scriptures.length - 1 && (
            <div className="mt-10 md:mt-14 flex justify-center">
              <span className="text-sandalwood text-xs tracking-[0.5em]">॰</span>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
