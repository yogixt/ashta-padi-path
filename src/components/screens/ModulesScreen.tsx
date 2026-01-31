import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useLearningStore } from '@/store/learningStore';
import { professions } from '@/data/yogaSutrasData';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';

// Import scripture icons
import iconYogaSutra from '@/assets/icon-yoga-sutra.png';
import iconHathaYoga from '@/assets/icon-hatha-yoga.png';
import iconYogaTaravali from '@/assets/icon-yoga-taravali.png';
import iconBhagavadGita from '@/assets/icon-bhagavad-gita.png';
import iconYogaVashistha from '@/assets/icon-yoga-vashistha.png';

const sacredTexts = [
  {
    id: 'yoga-sutra',
    title: "Patanjali's Yoga Sutra",
    titleSanskrit: 'पातञ्जलयोगसूत्रम्',
    description: 'The foundational text of Raja Yoga, comprising 196 sutras on the philosophy and practice of yoga.',
    verse: 'योगश्चित्तवृत्तिनिरोधः',
    icon: iconYogaSutra,
    available: true,
  },
  {
    id: 'hatha-yoga-pradipika',
    title: 'Hatha Yoga Pradipika',
    titleSanskrit: 'हठयोगप्रदीपिका',
    description: 'A classic manual on Hatha Yoga, detailing asanas, pranayama, mudras, and samadhi.',
    verse: 'हठविद्यां हि मत्स्येन्द्रगोरक्षाद्याः विजानते',
    icon: iconHathaYoga,
    available: true,
  },
  {
    id: 'yoga-taravali',
    title: 'Yoga Taravali',
    titleSanskrit: 'योगतरावली',
    description: 'A poetic treatise by Shankaracharya on the stages of yoga leading to liberation.',
    verse: 'योगमार्गस्य सोपानं विवृणोति तरङ्गवत्',
    icon: iconYogaTaravali,
    available: true,
  },
  {
    id: 'bhagavad-gita',
    title: 'Bhagavad Gita',
    titleSanskrit: 'भगवद्गीता',
    description: 'The divine song of Lord Krishna, teaching the paths of Karma, Bhakti, and Jnana Yoga.',
    verse: 'योगः कर्मसु कौशलम्',
    icon: iconBhagavadGita,
    available: true,
  },
  {
    id: 'yoga-vashistha',
    title: 'Yoga Vashistha',
    titleSanskrit: 'योगवासिष्ठः',
    description: 'Sage Vashistha\'s teachings to Lord Rama on consciousness, liberation, and the nature of reality.',
    verse: 'चित्तमेव हि संसारः',
    icon: iconYogaVashistha,
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
    <div className="min-h-screen bg-background">
      <Header showBack backTo="home" />

      {/* Main Content */}
      <main className="py-8 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            {/* Sanskrit title */}
            <h2 className="font-sanskrit text-xl text-primary mb-2">
              शास्त्राध्ययनम्
            </h2>
            
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
              Sacred Scriptures
            </h1>
            
            <p className="text-muted-foreground max-w-lg mx-auto">
              Begin your six-month immersive yogic sadhana through the study of these timeless texts
              {profession && (
                <span className="block mt-1">
                  as a <span className="text-primary font-medium">{profession.name}</span>
                </span>
              )}
            </p>

            {/* Progress dots */}
            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="w-8 h-1 rounded-full bg-muted" />
              <div className="w-3 h-3 rounded-full bg-primary" />
              <div className="w-8 h-1 rounded-full bg-muted" />
            </div>
          </motion.div>

          {/* Sacred Texts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-12">
            {sacredTexts.map((text, index) => (
              <motion.div
                key={text.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
                onClick={() => handleSelectModule(text.id)}
                className="group relative bg-card rounded-xl border border-border overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1"
              >
                {/* Card Content */}
                <div className="p-5">
                  {/* Header with icon */}
                  <div className="flex items-start justify-between mb-4">
                    {/* Scripture icon */}
                    <div className="w-14 h-14 rounded-lg bg-primary/5 flex items-center justify-center overflow-hidden">
                      <img 
                        src={text.icon} 
                        alt={text.title}
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {text.title}
                  </h3>
                  
                  {/* Sanskrit title */}
                  <p className="text-sm text-primary/80 font-sanskrit mb-2">
                    {text.titleSanskrit}
                  </p>
                  
                  {/* Verse */}
                  <p className="text-sm text-muted-foreground/70 font-sanskrit italic mb-3">
                    "{text.verse}"
                  </p>
                  
                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {text.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Duration notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center mb-10 py-6 border-y border-border"
          >
            <p className="font-sanskrit text-base text-foreground">
              एषा साधना षण्मासान् व्याप्नोति।
            </p>
            <p className="text-sm text-primary mt-1 italic">
              A six-month immersive yogic sadhana
            </p>
            <p className="font-sanskrit text-xs text-muted-foreground mt-2">
              कालः गुरुर्न भवति। अनुभवः एव।
            </p>
          </motion.div>

          {/* Study Mode Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="max-w-xl mx-auto"
          >
            {/* Section title */}
            <h2 className="font-sanskrit text-lg text-foreground text-center mb-2">
              मार्गचयनम्
            </h2>
            <p className="text-sm text-muted-foreground text-center mb-6">
              Choose Your Path
            </p>

            {/* Study mode options */}
            <div className="space-y-3">
              {studyModes.map((mode, index) => (
                <motion.div
                  key={mode.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                  onClick={() => handleStudyModeSelect(mode.id)}
                  className="group cursor-pointer transition-all duration-300 py-4 px-5 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-sanskrit text-lg text-primary group-hover:text-primary/80 transition-colors">
                        {mode.title}
                      </h3>
                      <p className="text-sm text-foreground mt-0.5">
                        {mode.english}
                      </p>
                      <p className="font-sanskrit text-xs text-muted-foreground mt-1">
                        {mode.sanskrit}
                      </p>
                    </div>
                    <div className="text-muted-foreground group-hover:text-primary transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Footer wisdom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1.2 }}
            className="mt-12 text-center"
          >
            <p className="font-sanskrit text-sm text-muted-foreground">
              विद्या ददाति विनयम्
            </p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              Knowledge bestows humility
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
