import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useLearningStore } from '@/store/learningStore';
import { Button } from '@/components/ui/button';
import gurukulBackground from '@/assets/gurukul-background.jpg';

const scriptures = [
  {
    id: 'yoga-sutra',
    title: 'पतञ्जलियोगसूत्रम्',
    english: "Patanjali's Yoga Sutra",
    verse: 'योगश्चित्तवृत्तिनिरोधः',
  },
  {
    id: 'hatha-yoga',
    title: 'हठयोगप्रदीपिका',
    english: 'Hatha Yoga Pradipika',
    verse: 'हठविद्यां हि मत्स्येन्द्रगोरक्षाद्याः विजानते',
  },
  {
    id: 'yoga-taravali',
    title: 'योगतरावली',
    english: 'Yoga Taravali',
    verse: 'योगमार्गस्य सोपानं विवृणोति तरङ्गवत्',
  },
  {
    id: 'bhagavad-gita',
    title: 'भगवद्गीता',
    english: 'Bhagavad Gita',
    verse: 'योगः कर्मसु कौशलम्',
  },
  {
    id: 'yoga-vashistha',
    title: 'योगवासिष्ठः',
    english: 'Yoga Vashistha',
    verse: 'चित्तमेव हि संसारः',
  },
];

const studyModes = [
  {
    id: 'svadhyaya',
    title: 'स्वाध्यायः',
    english: 'Study Alone',
    description: 'Self-directed contemplation and practice',
    sanskrit: 'अन्तर्मुखया साधनया आत्ममार्गगमनम्',
  },
  {
    id: 'gurukulavasa',
    title: 'गुरुकुलवासः',
    english: 'With Guru / Mentor',
    description: 'Guided learning through tradition',
    sanskrit: 'गुरुकृपया परम्परया च साधनाप्रवेशः',
  },
];

export function ModulesScreen() {
  const { setScreen } = useLearningStore();

  const handleStudyModeSelect = (mode: string) => {
    if (mode === 'svadhyaya') {
      setScreen('vocabulary');
    } else {
      setScreen('mentor-selection');
    }
  };

  return (
    <div className="min-h-screen bg-manuscript relative overflow-hidden">
      {/* Animated Vedic Gurukul Background */}
      <div className="absolute inset-0">
        {/* Gurukul illustration with slow breathing animation */}
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ 
            scale: [1.05, 1.02, 1.05],
            opacity: 0.1 
          }}
          transition={{ 
            scale: { duration: 20, repeat: Infinity, ease: 'easeInOut' },
            opacity: { duration: 3, ease: 'easeOut' }
          }}
          className="absolute inset-0"
        >
          <img 
            src={gurukulBackground} 
            alt="" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-manuscript/95 via-manuscript/90 to-manuscript/95" />
        
        {/* Floating particles - leaves/dust */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-ochre/20"
              initial={{ 
                x: `${10 + Math.random() * 80}%`, 
                y: -10,
                opacity: 0,
                rotate: 0,
              }}
              animate={{ 
                y: '110vh',
                opacity: [0, 0.3, 0.3, 0],
                rotate: 360,
              }}
              transition={{
                duration: 30 + Math.random() * 20,
                repeat: Infinity,
                delay: i * 3,
                ease: 'linear'
              }}
            />
          ))}
        </div>
        
        {/* Parchment texture */}
        <div 
          className="absolute inset-0 opacity-8"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Vignette */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, hsl(var(--sandalwood) / 0.3) 100%)',
          }}
        />
      </div>

      {/* Back button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute top-6 left-6 z-20"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setScreen('home')}
          className="text-sandalwood-dark hover:text-earth hover:bg-sandalwood/20 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-start py-12 px-4 md:px-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-12 mt-8"
        >
          <h1 className="font-sanskrit text-3xl md:text-4xl text-earth mb-4">
            योगगुरुकुलम्
          </h1>
          <p className="font-sanskrit text-base md:text-lg text-sandalwood-dark leading-relaxed">
            शिष्य, अत्र न पाठ्यक्रमः।
          </p>
          <p className="font-sanskrit text-base md:text-lg text-sandalwood-dark">
            अत्र साधनामार्गः।
          </p>
          
          {/* Decorative divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex items-center justify-center gap-4 mt-8"
          >
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-sandalwood/50" />
            <span className="text-ochre/50 text-sm">॰</span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-sandalwood/50" />
          </motion.div>
        </motion.header>

        {/* Scripture Pillars */}
        <div className="max-w-2xl w-full space-y-10 md:space-y-12 mb-16">
          {scriptures.map((scripture, index) => (
            <motion.div
              key={scripture.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.15, duration: 0.6 }}
              className="text-center"
            >
              {/* Sanskrit title */}
              <h3 className="font-sanskrit text-xl md:text-2xl text-earth mb-1">
                {scripture.title}
              </h3>
              
              {/* English title */}
              <p className="font-serif text-sm text-sandalwood-dark/70 mb-3">
                {scripture.english}
              </p>
              
              {/* Verse */}
              <p className="font-sanskrit text-base text-ochre/80 italic">
                {scripture.verse}
              </p>
              
              {/* Divider */}
              {index < scriptures.length - 1 && (
                <div className="mt-8 md:mt-10 flex justify-center">
                  <span className="text-sandalwood/40 text-xs tracking-[0.5em]">॰</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Duration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="font-sanskrit text-sm text-sandalwood-dark leading-relaxed">
            एषा साधना षण्मासान् व्याप्नोति।
          </p>
          <p className="font-serif text-xs text-ochre/60 mt-2 italic">
            A six-month immersive yogic sadhana
          </p>
          <p className="font-sanskrit text-xs text-sandalwood-dark/50 mt-1">
            कालः गुरुर्न भवति। अनुभवः एव।
          </p>
        </motion.div>

        {/* Study Mode Selection */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="w-full max-w-xl"
        >
          {/* Section title */}
          <h2 className="font-sanskrit text-lg text-earth text-center mb-8">
            मार्गचयनम्
          </h2>
          <p className="font-serif text-xs text-sandalwood-dark/60 text-center mb-8">
            Choose Your Path
          </p>

          {/* Study mode options */}
          <div className="space-y-6">
            {studyModes.map((mode, index) => (
              <motion.div
                key={mode.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2 + index * 0.2, duration: 0.5 }}
                onClick={() => handleStudyModeSelect(mode.id)}
                className="text-center cursor-pointer group transition-all duration-500 hover:scale-[1.02] py-4 px-6 rounded-lg hover:bg-sandalwood/10"
              >
                <h3 className="font-sanskrit text-lg md:text-xl text-ochre group-hover:text-earth transition-colors">
                  {mode.title}
                </h3>
                <p className="font-serif text-sm text-sandalwood-dark/70 mt-1">
                  {mode.english}
                </p>
                <p className="font-sanskrit text-xs text-sandalwood-dark/50 mt-2 max-w-sm mx-auto">
                  {mode.sanskrit}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer Wisdom */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="mt-16 py-8 text-center"
        >
          <p className="font-sanskrit text-sm text-sandalwood-dark/50 italic">
            मौनं अपि उपदेशः
          </p>
          <p className="text-[10px] text-sandalwood-dark/30 mt-1">
            Silence too is a teaching
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
