import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useLearningStore } from '@/store/learningStore';
import { professions } from '@/data/yogaSutrasData';
import { Button } from '@/components/ui/button';
import gurukulBackground from '@/assets/gurukul-background.jpg';

const sacredTexts = [
  {
    id: 'yoga-sutra',
    title: "Patanjali's Yoga Sutra",
    titleSanskrit: 'पातञ्जलयोगसूत्रम्',
    description: 'The foundational text of Raja Yoga, comprising 196 sutras on the philosophy and practice of yoga.',
    verse: 'योगश्चित्तवृत्तिनिरोधः',
    icon: '🕉',
    available: true,
  },
  {
    id: 'hatha-yoga-pradipika',
    title: 'Hatha Yoga Pradipika',
    titleSanskrit: 'हठयोगप्रदीपिका',
    description: 'A classic manual on Hatha Yoga, detailing asanas, pranayama, mudras, and samadhi.',
    verse: 'हठविद्यां हि मत्स्येन्द्रगोरक्षाद्याः विजानते',
    icon: '☸',
    available: true,
  },
  {
    id: 'yoga-taravali',
    title: 'Yoga Taravali',
    titleSanskrit: 'योगतरावली',
    description: 'A poetic treatise by Shankaracharya on the stages of yoga leading to liberation.',
    verse: 'योगमार्गस्य सोपानं विवृणोति तरङ्गवत्',
    icon: '✴',
    available: true,
  },
  {
    id: 'bhagavad-gita',
    title: 'Bhagavad Gita',
    titleSanskrit: 'भगवद्गीता',
    description: 'The divine song of Lord Krishna, teaching the paths of Karma, Bhakti, and Jnana Yoga.',
    verse: 'योगः कर्मसु कौशलम्',
    icon: 'ॐ',
    available: true,
  },
  {
    id: 'yoga-vashistha',
    title: 'Yoga Vashistha',
    titleSanskrit: 'योगवासिष्ठः',
    description: 'Sage Vashistha\'s teachings to Lord Rama on consciousness, liberation, and the nature of reality.',
    verse: 'चित्तमेव हि संसारः',
    icon: '❈',
    available: true,
  },
];

const studyModes = [
  {
    id: 'svadhyaya',
    title: 'स्वाध्यायः',
    english: 'Self Study',
    sanskrit: 'अन्तर्मुखया साधनया आत्ममार्गगमनम्',
  },
  {
    id: 'gurukulavasa',
    title: 'गुरुकुलवासः',
    english: 'With Guru / Mentor',
    sanskrit: 'गुरुकृपया परम्परया च साधनाप्रवेशः',
  },
];

export function ModulesScreen() {
  const { selectedProfession, setScreen, setSelectedModule } = useLearningStore();
  
  const profession = professions.find(p => p.id === selectedProfession);

  const handleSelectModule = (moduleId: string) => {
    setSelectedModule(moduleId);
  };

  const handleStudyModeSelect = (mode: string) => {
    if (mode === 'svadhyaya') {
      setScreen('vocabulary');
    } else {
      setScreen('mentor-selection');
    }
  };

  return (
    <div className="min-h-screen bg-manuscript relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gurukul illustration */}
        <motion.div
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ 
            scale: [1.02, 1.05, 1.02],
            opacity: 0.1 
          }}
          transition={{ 
            scale: { duration: 25, repeat: Infinity, ease: 'easeInOut' },
            opacity: { duration: 2 }
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
        <div className="absolute inset-0 bg-gradient-to-b from-manuscript via-manuscript/95 to-manuscript" />
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-ochre/20"
              initial={{ 
                x: `${10 + Math.random() * 80}%`, 
                y: -10,
                opacity: 0,
              }}
              animate={{ 
                y: '110vh',
                opacity: [0, 0.4, 0.4, 0],
              }}
              transition={{
                duration: 25 + Math.random() * 15,
                repeat: Infinity,
                delay: i * 3,
                ease: 'linear'
              }}
            />
          ))}
        </div>
        
        {/* Parchment texture */}
        <div 
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Vignette */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, hsl(var(--sandalwood) / 0.25) 100%)',
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
      <main className="relative z-10 min-h-screen flex flex-col items-center py-12 px-4 md:px-6">
        <div className="max-w-5xl w-full">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 mt-8"
          >
            {/* Main title */}
            <h1 className="font-sanskrit text-3xl md:text-4xl text-earth mb-3">
              योगगुरुकुलम्
            </h1>
            
            <p className="font-sanskrit text-base text-sandalwood-dark mb-1">
              शिष्य, अत्र न पाठ्यक्रमः।
            </p>
            <p className="font-sanskrit text-base text-sandalwood-dark">
              अत्र साधनामार्गः।
            </p>

            {/* Decorative divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex items-center justify-center gap-4 mt-6"
            >
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-sandalwood/50" />
              <span className="text-ochre/50 text-sm">॰</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-sandalwood/50" />
            </motion.div>
          </motion.div>

          {/* Sacred Texts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-12">
            {sacredTexts.map((text, index) => (
              <motion.div
                key={text.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                onClick={() => handleSelectModule(text.id)}
                className="group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1"
              >
                {/* Card background */}
                <div className="absolute inset-0 backdrop-blur-sm bg-manuscript/75 group-hover:bg-manuscript/85 transition-all duration-500" />
                
                {/* Border with hover glow */}
                <div className="absolute inset-0 rounded-xl border border-sandalwood/40 group-hover:border-ochre/50 group-hover:shadow-lg group-hover:shadow-ochre/10 transition-all duration-500" />
                
                {/* Hover gradient */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-ochre/5 to-transparent" />
                
                {/* Content */}
                <div className="relative p-5 text-center">
                  {/* Scripture icon */}
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-ochre/10 border border-ochre/20 flex items-center justify-center">
                    <span className="text-2xl text-ochre font-sanskrit">{text.icon}</span>
                  </div>

                  {/* Sanskrit title */}
                  <h3 className="font-sanskrit text-xl text-earth group-hover:text-ochre transition-colors duration-300 mb-1">
                    {text.titleSanskrit}
                  </h3>
                  
                  {/* English title */}
                  <p className="font-serif text-sm text-sandalwood-dark/70 mb-3">
                    {text.title}
                  </p>
                  
                  {/* Verse */}
                  <p className="font-sanskrit text-sm text-ochre/70 italic mb-3">
                    {text.verse}
                  </p>
                  
                  {/* Description */}
                  <p className="text-xs text-sandalwood-dark/60 leading-relaxed">
                    {text.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Duration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-center mb-10"
          >
            <p className="font-sanskrit text-base text-earth">
              एषा साधना षण्मासान् व्याप्नोति।
            </p>
            <p className="font-serif text-sm text-ochre/70 mt-1 italic">
              A six-month immersive yogic sadhana
            </p>
            <p className="font-sanskrit text-xs text-sandalwood-dark/50 mt-2">
              कालः गुरुर्न भवति। अनुभवः एव।
            </p>
          </motion.div>

          {/* Decorative divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="flex items-center justify-center gap-4 mb-10"
          >
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-sandalwood/40" />
            <span className="text-ochre/40 text-xs tracking-[0.3em]">॰</span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-sandalwood/40" />
          </motion.div>

          {/* Study Mode Selection */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="max-w-xl mx-auto"
          >
            {/* Section title */}
            <h2 className="font-sanskrit text-lg text-earth text-center mb-2">
              मार्गचयनम्
            </h2>
            <p className="font-serif text-xs text-sandalwood-dark/60 text-center mb-8">
              Choose Your Path
            </p>

            {/* Study mode options */}
            <div className="space-y-4">
              {studyModes.map((mode, index) => (
                <motion.div
                  key={mode.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.6 + index * 0.15, duration: 0.5 }}
                  onClick={() => handleStudyModeSelect(mode.id)}
                  className="group cursor-pointer transition-all duration-500 py-5 px-6 rounded-xl border border-sandalwood/30 hover:border-ochre/40 bg-manuscript/60 hover:bg-manuscript/80 hover:shadow-md hover:shadow-ochre/5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-sanskrit text-lg text-ochre group-hover:text-earth transition-colors">
                        {mode.title}
                      </h3>
                      <p className="font-serif text-sm text-sandalwood-dark/80 mt-0.5">
                        {mode.english}
                      </p>
                      <p className="font-sanskrit text-xs text-sandalwood-dark/50 mt-1">
                        {mode.sanskrit}
                      </p>
                    </div>
                    <div className="text-ochre/40 group-hover:text-ochre/70 transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Footer Wisdom */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 2, duration: 1 }}
            className="mt-14 py-6 text-center"
          >
            <p className="font-sanskrit text-sm text-sandalwood-dark/50 italic">
              विद्या ददाति विनयम्
            </p>
            <p className="text-[10px] text-sandalwood-dark/30 mt-1">
              Knowledge bestows humility
            </p>
          </motion.footer>
        </div>
      </main>
    </div>
  );
}
