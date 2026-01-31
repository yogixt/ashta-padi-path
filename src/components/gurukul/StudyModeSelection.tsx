import { motion } from 'framer-motion';

const studyModes = [
  {
    id: 'svadhyaya',
    title: 'स्वाध्यायः',
    description: 'अन्तर्मुखया साधनया आत्ममार्गगमनम्',
  },
  {
    id: 'gurukulavasa',
    title: 'गुरुकुलवासः',
    description: 'गुरुकृपया परम्परया च साधनाप्रवेशः',
  },
];

interface StudyModeSelectionProps {
  onSelect?: (mode: string) => void;
}

export function StudyModeSelection({ onSelect }: StudyModeSelectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="space-y-8"
    >
      {/* Section title */}
      <h2 className="font-sanskrit text-xl text-earth text-center mb-10">
        मार्गचयनम्
      </h2>

      {/* Options as text blocks */}
      <div className="space-y-8">
        {studyModes.map((mode, index) => (
          <motion.div
            key={mode.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + index * 0.2, duration: 0.5 }}
            onClick={() => onSelect?.(mode.id)}
            className="text-center cursor-pointer group transition-all duration-500 hover:scale-[1.02]"
          >
            <h3 className="font-sanskrit text-lg md:text-xl text-ochre group-hover:text-ochre-muted transition-colors">
              {mode.title}
            </h3>
            <p className="font-sanskrit text-sm text-sandalwood-dark mt-2 max-w-md mx-auto">
              {mode.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
