import { motion } from 'framer-motion';
import { Clock, BookOpen, Lock } from 'lucide-react';
import { useLearningStore } from '@/store/learningStore';
import { professions } from '@/data/yogaSutrasData';
import { Header } from '@/components/Header';
import gurukulBackground from '@/assets/gurukul-background.jpg';

const sacredTexts = [
  {
    id: 'yoga-sutra',
    title: "Patanjali's Yoga Sutra",
    titleSanskrit: 'पातञ्जलयोगसूत्रम्',
    description: 'The foundational text of Raja Yoga, comprising 196 sutras on the philosophy and practice of yoga.',
    verse: 'योगश्चित्तवृत्तिनिरोधः',
    duration: '8 weeks',
    chapters: 4,
    level: 'beginner',
    available: true,
  },
  {
    id: 'hatha-yoga-pradipika',
    title: 'Hatha Yoga Pradipika',
    titleSanskrit: 'हठयोगप्रदीपिका',
    description: 'A classic manual on Hatha Yoga, detailing asanas, pranayama, mudras, and samadhi.',
    verse: 'हठविद्यां हि मत्स्येन्द्रगोरक्षाद्याः विजानते',
    duration: '6 weeks',
    chapters: 4,
    level: 'intermediate',
    available: true,
  },
  {
    id: 'yoga-taravali',
    title: 'Yoga Taravali',
    titleSanskrit: 'योगतरावली',
    description: 'A poetic treatise by Shankaracharya on the stages of yoga leading to liberation.',
    verse: 'योगमार्गस्य सोपानं विवृणोति तरङ्गवत्',
    duration: '4 weeks',
    chapters: 1,
    level: 'advanced',
    available: false,
  },
  {
    id: 'bhagavad-gita',
    title: 'Bhagavad Gita',
    titleSanskrit: 'भगवद्गीता',
    description: 'The divine song of Lord Krishna, teaching the paths of Karma, Bhakti, and Jnana Yoga.',
    verse: 'योगः कर्मसु कौशलम्',
    duration: '10 weeks',
    chapters: 18,
    level: 'beginner',
    available: true,
  },
  {
    id: 'yoga-vashistha',
    title: 'Yoga Vashistha',
    titleSanskrit: 'योगवासिष्ठः',
    description: 'Sage Vashistha\'s teachings to Lord Rama on consciousness, liberation, and the nature of reality.',
    verse: 'चित्तमेव हि संसारः',
    duration: '12 weeks',
    chapters: 6,
    level: 'advanced',
    available: false,
  },
];

export function ModulesScreen() {
  const { selectedProfession, setScreen, setSelectedModule } = useLearningStore();
  
  const profession = professions.find(p => p.id === selectedProfession);

  const handleSelectModule = (module: typeof sacredTexts[0]) => {
    if (!module.available) return;
    setSelectedModule(module.id);
    setScreen('vocabulary');
  };

  const getLevelStyle = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-sage/20 text-earth border-sage/40';
      case 'intermediate':
        return 'bg-ochre/15 text-ochre border-ochre/30';
      case 'advanced':
        return 'bg-terracotta/15 text-terracotta border-terracotta/30';
      default:
        return 'bg-sandalwood/20 text-sandalwood-dark border-sandalwood/30';
    }
  };

  const getLevelLabel = (level: string) => {
    return level.charAt(0).toUpperCase() + level.slice(1);
  };

  return (
    <div className="min-h-screen bg-manuscript relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gurukul illustration */}
        <motion.div
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          <img 
            src={gurukulBackground} 
            alt="" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-manuscript via-manuscript/95 to-manuscript" />
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-ochre/15"
              initial={{ 
                x: `${15 + Math.random() * 70}%`, 
                y: -10,
                opacity: 0,
              }}
              animate={{ 
                y: '110vh',
                opacity: [0, 0.3, 0.3, 0],
              }}
              transition={{
                duration: 30 + Math.random() * 20,
                repeat: Infinity,
                delay: i * 4,
                ease: 'linear'
              }}
            />
          ))}
        </div>
        
        {/* Parchment texture */}
        <div 
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Vignette */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 50%, hsl(var(--sandalwood) / 0.2) 100%)',
          }}
        />
      </div>

      <Header showBack backTo="home" />

      {/* Main Content */}
      <main className="relative z-10 py-8 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            {/* Sanskrit title */}
            <h2 className="font-sanskrit text-xl text-ochre mb-2">
              शास्त्राध्ययनम्
            </h2>
            
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-earth mb-3">
              Sacred Scriptures
            </h1>
            
            <p className="text-sandalwood-dark max-w-lg mx-auto">
              Begin your six-month immersive yogic sadhana through the study of these timeless texts
              {profession && (
                <span className="block mt-1">
                  as a <span className="text-ochre font-medium">{profession.name}</span>
                </span>
              )}
            </p>

            {/* Decorative divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center justify-center gap-4 mt-6"
            >
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-sandalwood/50" />
              <span className="text-ochre/50 text-sm">॰</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-sandalwood/50" />
            </motion.div>
          </motion.div>

          {/* Sacred Texts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {sacredTexts.map((text, index) => (
              <motion.div
                key={text.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.1, duration: 0.5 }}
                onClick={() => handleSelectModule(text)}
                className={`
                  group relative rounded-xl overflow-hidden
                  transition-all duration-500
                  ${text.available 
                    ? 'cursor-pointer hover:scale-[1.02] hover:-translate-y-1' 
                    : 'cursor-not-allowed opacity-65'
                  }
                `}
              >
                {/* Card background */}
                <div className={`
                  absolute inset-0 backdrop-blur-sm transition-all duration-500
                  ${text.available 
                    ? 'bg-manuscript/80 group-hover:bg-manuscript/90' 
                    : 'bg-manuscript/60'
                  }
                `} />
                
                {/* Border */}
                <div className={`
                  absolute inset-0 rounded-xl border transition-all duration-500
                  ${text.available 
                    ? 'border-sandalwood/40 group-hover:border-ochre/50 group-hover:shadow-lg group-hover:shadow-ochre/10' 
                    : 'border-sandalwood/25'
                  }
                `} />
                
                {/* Hover glow */}
                {text.available && (
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-ochre/5 to-transparent" />
                )}
                
                {/* Content */}
                <div className="relative p-5">
                  {/* Header row */}
                  <div className="flex items-start justify-between mb-4">
                    {/* Icon */}
                    <div className="w-11 h-11 rounded-lg bg-ochre/15 border border-ochre/20 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-ochre" />
                    </div>
                    
                    {/* Level badge + Lock */}
                    <div className="flex items-center gap-2">
                      <span className={`
                        px-3 py-1 rounded-full text-xs font-medium border
                        ${getLevelStyle(text.level)}
                      `}>
                        {getLevelLabel(text.level)}
                      </span>
                      {!text.available && (
                        <Lock className="w-4 h-4 text-sandalwood-dark/50" />
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={`
                    text-lg font-semibold mb-1 transition-colors duration-300
                    ${text.available 
                      ? 'text-earth group-hover:text-ochre' 
                      : 'text-sandalwood-dark/70'
                    }
                  `}>
                    {text.title}
                  </h3>
                  
                  {/* Sanskrit title */}
                  <p className={`
                    text-base font-sanskrit mb-2
                    ${text.available ? 'text-ochre/80' : 'text-sandalwood-dark/50'}
                  `}>
                    {text.titleSanskrit}
                  </p>
                  
                  {/* Verse */}
                  <p className={`
                    text-sm font-sanskrit italic mb-3
                    ${text.available ? 'text-sandalwood-dark/60' : 'text-sandalwood-dark/40'}
                  `}>
                    "{text.verse}"
                  </p>
                  
                  {/* Description */}
                  <p className={`
                    text-sm leading-relaxed mb-4
                    ${text.available ? 'text-sandalwood-dark/80' : 'text-sandalwood-dark/50'}
                  `}>
                    {text.description}
                  </p>

                  {/* Duration & Chapters */}
                  <div className={`
                    flex items-center gap-4 text-xs
                    ${text.available ? 'text-sandalwood-dark/70' : 'text-sandalwood-dark/40'}
                  `}>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{text.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{text.chapters} {text.chapters === 1 ? 'chapter' : 'chapters'}</span>
                    </div>
                  </div>

                  {/* Coming Soon footer for locked texts */}
                  {!text.available && (
                    <div className="mt-4 pt-3 border-t border-sandalwood/20">
                      <div className="flex items-center gap-2 text-sm text-sandalwood-dark/50">
                        <Lock className="w-4 h-4" />
                        <span className="font-sanskrit text-xs">शीघ्रमागमिष्यति</span>
                        <span className="text-xs">— Coming Soon</span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Duration notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.8 }}
            className="mt-10 text-center"
          >
            <p className="font-sanskrit text-sm text-sandalwood-dark">
              एषा साधना षण्मासान् व्याप्नोति
            </p>
            <p className="text-xs text-ochre/60 mt-1 italic">
              This sadhana spans six months
            </p>
          </motion.div>

          {/* Footer wisdom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1.2 }}
            className="mt-8 text-center"
          >
            <p className="font-sanskrit text-sm text-sandalwood-dark/50">
              विद्या ददाति विनयम्
            </p>
            <p className="text-xs text-sandalwood-dark/35 mt-1">
              Knowledge bestows humility
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
