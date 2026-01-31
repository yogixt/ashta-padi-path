import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLearningStore } from '@/store/learningStore';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gurukulBackground from '@/assets/gurukul-background.jpg';

// The five sacred scriptures
const sacredTexts = [
  {
    id: 'yoga-sutra',
    english: "Patanjali's Yoga Sutra",
    sanskrit: 'पातञ्जलयोगसूत्रम्',
    verse: 'योगश्चित्तवृत्तिनिरोधः',
  },
  {
    id: 'hatha-yoga',
    english: 'Hatha Yoga Pradipika',
    sanskrit: 'हठयोगप्रदीपिका',
    verse: 'केवलं राजयोगाय हठविद्योपदिश्यते',
  },
  {
    id: 'yoga-taravali',
    english: 'Yoga Taravali',
    sanskrit: 'योगतारावली',
    verse: 'योगमार्गस्य सोपानं विवृणोति तरङ्गवत्',
  },
  {
    id: 'bhagavad-gita',
    english: 'Bhagavad Gita',
    sanskrit: 'श्रीमद्भगवद्गीता',
    verse: 'योगः कर्मसु कौशलम्',
  },
  {
    id: 'yoga-vasishtha',
    english: 'Yoga Vasishtha',
    sanskrit: 'योगवासिष्ठः',
    verse: 'मनः प्रशमनोपायो योग इत्यभिधीयते',
  },
];

const studyModes = [
  {
    id: 'self',
    title: 'स्वसाधना',
    titleEnglish: 'Self-Sādhanā',
    description: 'Journey inward through personal contemplation and self-guided study of the sacred texts.',
  },
  {
    id: 'guru',
    title: 'गुरुकुलमार्गः',
    titleEnglish: 'Gurukula Guidance',
    description: 'Learn in the traditional way under the guidance of an experienced guru in the paramparā.',
  },
];

export function ModulesScreen() {
  const { setScreen, setSelectedModule } = useLearningStore();
  const [selectedMode, setSelectedMode] = useState<string | null>(null);

  const handleBeginJourney = () => {
    if (selectedMode === 'guru') {
      setScreen('mentor-selection');
    } else {
      // For self-study, go to vocabulary with first scripture
      setSelectedModule('yoga-sutra');
      setScreen('vocabulary');
    }
  };

  return (
    <div className="min-h-screen bg-manuscript relative overflow-hidden">
      {/* Animated Vedic Gurukul Background */}
      <div className="absolute inset-0">
        {/* Gurukul illustration - slow subtle animation */}
        <motion.div
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 3, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <img 
            src={gurukulBackground} 
            alt="" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Base gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-manuscript/95 via-manuscript/85 to-manuscript/95" />
        
        {/* Animated floating elements - leaves/particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-ochre/20"
              initial={{ 
                x: Math.random() * 100 + '%', 
                y: -20,
                opacity: 0 
              }}
              animate={{ 
                y: '120vh',
                opacity: [0, 0.3, 0.3, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 20 + Math.random() * 10,
                repeat: Infinity,
                delay: i * 3,
                ease: 'linear'
              }}
            />
          ))}
        </div>
        
        {/* Parchment texture overlay */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Vignette effect */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, hsl(var(--sandalwood) / 0.3) 100%)',
          }}
        />
      </div>

      {/* Back button - minimal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute top-6 left-6 z-20"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setScreen('home')}
          className="text-sandalwood-dark hover:text-earth hover:bg-sandalwood/20 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="sr-only md:not-sr-only">Back</span>
        </Button>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header Section */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="pt-20 md:pt-28 pb-8 text-center px-6"
        >
          {/* Sanskrit title */}
          <h1 className="font-sanskrit text-3xl md:text-4xl text-earth mb-4">
            शास्त्राध्ययनम्
          </h1>
          
          {/* Journey description */}
          <p className="font-serif text-lg md:text-xl text-sandalwood-dark max-w-lg mx-auto leading-relaxed">
            A six-month immersive yogic sādhanā
          </p>
          <p className="text-sm text-sandalwood-dark/70 mt-2 italic">
            Traditional śāstra-based study
          </p>
        </motion.header>

        {/* Sacred Scriptures Section */}
        <main className="flex-1 px-6 py-8 max-w-3xl mx-auto w-full">
          {/* Section divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-sandalwood" />
            <span className="font-sanskrit text-ochre text-sm">पञ्च शास्त्राणि</span>
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-sandalwood" />
          </motion.div>

          {/* The Five Sacred Texts */}
          <div className="space-y-8 md:space-y-10">
            {sacredTexts.map((text, index) => (
              <motion.div
                key={text.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.12, duration: 0.6 }}
                className="text-center group"
              >
                {/* English title */}
                <h2 className="font-serif text-xl md:text-2xl text-earth tracking-wide uppercase mb-2">
                  {text.english}
                </h2>
                
                {/* Sanskrit title */}
                <p className="font-sanskrit text-lg text-ochre mb-3">
                  {text.sanskrit}
                </p>
                
                {/* Key verse - subtle */}
                <p className="font-sanskrit text-sm text-sandalwood-dark/60 italic max-w-md mx-auto">
                  "{text.verse}"
                </p>
                
                {/* Subtle divider (not after last) */}
                {index < sacredTexts.length - 1 && (
                  <div className="mt-8 md:mt-10 flex justify-center">
                    <span className="text-sandalwood/50 text-xs tracking-[0.4em]">॰</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Study Mode Selection */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16 md:mt-20"
          >
            {/* Section header */}
            <div className="text-center mb-10">
              <h3 className="font-sanskrit text-lg text-earth mb-2">
                मार्गचयनम्
              </h3>
              <p className="text-sm text-sandalwood-dark/70 italic">
                Choose your path of study
              </p>
            </div>

            {/* Study mode options */}
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {studyModes.map((mode, index) => (
                <motion.div
                  key={mode.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + index * 0.15 }}
                  onClick={() => setSelectedMode(mode.id)}
                  className={`
                    relative p-6 rounded-xl cursor-pointer transition-all duration-500
                    border bg-manuscript/50 backdrop-blur-sm
                    ${selectedMode === mode.id 
                      ? 'border-ochre/50 shadow-lg shadow-ochre/10' 
                      : 'border-sandalwood/30 hover:border-sandalwood/50'
                    }
                  `}
                >
                  {/* Selected indicator */}
                  {selectedMode === mode.id && (
                    <motion.div
                      layoutId="selectedMode"
                      className="absolute inset-0 rounded-xl border-2 border-ochre/30"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  
                  <div className="relative z-10 text-center">
                    {/* Sanskrit title */}
                    <h4 className="font-sanskrit text-xl text-ochre mb-1">
                      {mode.title}
                    </h4>
                    
                    {/* English title */}
                    <p className="font-serif text-sm text-earth mb-3">
                      {mode.titleEnglish}
                    </p>
                    
                    {/* Description */}
                    <p className="text-xs text-sandalwood-dark/70 leading-relaxed">
                      {mode.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Begin Journey CTA */}
            {selectedMode && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-10 text-center"
              >
                <button
                  onClick={handleBeginJourney}
                  className="font-sanskrit text-lg text-ochre hover:text-earth transition-colors duration-300 group"
                >
                  <span>आरभामहे</span>
                  <span className="block text-xs font-serif text-sandalwood-dark/60 mt-1">
                    Begin the Journey
                  </span>
                </button>
              </motion.div>
            )}
          </motion.section>

          {/* Duration notice - subtle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1.8 }}
            className="mt-16 text-center"
          >
            <p className="font-sanskrit text-xs text-sandalwood-dark/50 leading-relaxed">
              षण्मासानां साधनामार्गः
              <br />
              <span className="text-[10px] font-serif italic">
                A path of six months' practice
              </span>
            </p>
          </motion.div>
        </main>

        {/* Footer wisdom */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 2 }}
          className="py-10 text-center px-6"
        >
          <p className="font-sanskrit text-sm text-sandalwood-dark/60 italic">
            न हि ज्ञानेन सदृशं पवित्रमिह विद्यते
          </p>
          <p className="text-[10px] text-sandalwood-dark/40 mt-1 font-serif">
            Nothing in this world purifies like knowledge
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
