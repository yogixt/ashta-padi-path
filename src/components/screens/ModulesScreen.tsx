import { motion } from 'framer-motion';
import { Clock, BookOpen, Lock } from 'lucide-react';
import { useLearningStore } from '@/store/learningStore';
import { getModulesForProfession, LearningModule } from '@/data/modulesData';
import { professions } from '@/data/yogaSutrasData';
import { Header } from '@/components/Header';
import gurukulBackground from '@/assets/gurukul-background.jpg';

export function ModulesScreen() {
  const { selectedProfession, setScreen, setSelectedModule } = useLearningStore();
  
  const profession = professions.find(p => p.id === selectedProfession);
  const modules = selectedProfession ? getModulesForProfession(selectedProfession) : [];

  const handleSelectModule = (module: LearningModule) => {
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
            {/* Step indicator */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sandalwood/20 border border-sandalwood/30 mb-6">
              <span className="text-sm text-sandalwood-dark">Step 1.5 of 8</span>
            </div>

            {/* Sanskrit title */}
            <h2 className="font-sanskrit text-xl text-ochre mb-2">
              अध्ययनमार्गं चिनुत
            </h2>
            
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-earth mb-3">
              Choose Your Module
            </h1>
            
            <p className="text-sandalwood-dark">
              Select a topic to begin your learning journey as a{' '}
              <span className="text-ochre font-medium">
                {profession?.name || 'Student'}
              </span>
            </p>

            {/* Decorative divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center justify-center gap-4 mt-6"
            >
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-sandalwood/50" />
              <div className="w-2 h-2 rounded-full bg-ochre/60" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-sandalwood/50" />
            </motion.div>
          </motion.div>

          {/* Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {modules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.1, duration: 0.5 }}
                onClick={() => handleSelectModule(module)}
                className={`
                  group relative rounded-xl overflow-hidden
                  transition-all duration-500
                  ${module.available 
                    ? 'cursor-pointer hover:scale-[1.02] hover:-translate-y-1' 
                    : 'cursor-not-allowed opacity-65'
                  }
                `}
              >
                {/* Card background */}
                <div className={`
                  absolute inset-0 backdrop-blur-sm transition-all duration-500
                  ${module.available 
                    ? 'bg-manuscript/80 group-hover:bg-manuscript/90' 
                    : 'bg-manuscript/60'
                  }
                `} />
                
                {/* Border */}
                <div className={`
                  absolute inset-0 rounded-xl border transition-all duration-500
                  ${module.available 
                    ? 'border-sandalwood/40 group-hover:border-ochre/50 group-hover:shadow-lg group-hover:shadow-ochre/10' 
                    : 'border-sandalwood/25'
                  }
                `} />
                
                {/* Hover glow */}
                {module.available && (
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
                        ${getLevelStyle(module.level)}
                      `}>
                        {getLevelLabel(module.level)}
                      </span>
                      {!module.available && (
                        <Lock className="w-4 h-4 text-sandalwood-dark/50" />
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={`
                    text-lg font-semibold mb-1 transition-colors duration-300
                    ${module.available 
                      ? 'text-earth group-hover:text-ochre' 
                      : 'text-sandalwood-dark/70'
                    }
                  `}>
                    {module.title}
                  </h3>
                  
                  {/* Sanskrit subtitle */}
                  <p className={`
                    text-sm font-sanskrit mb-3
                    ${module.available ? 'text-ochre/80' : 'text-sandalwood-dark/50'}
                  `}>
                    {module.titleSanskrit}
                  </p>
                  
                  {/* Description */}
                  <p className={`
                    text-sm leading-relaxed mb-4
                    ${module.available ? 'text-sandalwood-dark/80' : 'text-sandalwood-dark/50'}
                  `}>
                    {module.description}
                  </p>

                  {/* Duration & Lessons */}
                  <div className={`
                    flex items-center gap-4 text-xs mb-4
                    ${module.available ? 'text-sandalwood-dark/70' : 'text-sandalwood-dark/40'}
                  `}>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{module.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{module.lessons} lessons</span>
                    </div>
                  </div>

                  {/* Topic Tags */}
                  <div className="flex flex-wrap gap-2">
                    {module.topics.slice(0, 2).map((topic, i) => (
                      <span 
                        key={i}
                        className={`
                          px-2.5 py-1 rounded-md text-xs
                          ${module.available 
                            ? 'bg-sandalwood/20 text-sandalwood-dark/70' 
                            : 'bg-sandalwood/10 text-sandalwood-dark/40'
                          }
                        `}
                      >
                        {topic}
                      </span>
                    ))}
                    {module.topics.length > 2 && (
                      <span className={`
                        px-2.5 py-1 text-xs
                        ${module.available ? 'text-ochre/60' : 'text-sandalwood-dark/30'}
                      `}>
                        +{module.topics.length - 2} more
                      </span>
                    )}
                  </div>

                  {/* Coming Soon footer for locked modules */}
                  {!module.available && (
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

          {/* Footer wisdom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1 }}
            className="mt-12 text-center"
          >
            <p className="font-sanskrit text-sm text-sandalwood-dark/60">
              एकैकं पदं धीरं गच्छ
            </p>
            <p className="text-xs text-sandalwood-dark/40 mt-1 italic">
              Walk each step with patience
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
