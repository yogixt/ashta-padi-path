import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useLearningStore } from '@/store/learningStore';
import { getModulesForProfession, LearningModule } from '@/data/modulesData';
import { professions } from '@/data/yogaSutrasData';
import { Button } from '@/components/ui/button';
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

  return (
    <div className="min-h-screen bg-manuscript relative overflow-hidden">
      {/* Animated Vedic Gurukul Background */}
      <div className="absolute inset-0">
        {/* Gurukul illustration - slow subtle animation */}
        <motion.div
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.12 }}
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
        <div className="absolute inset-0 bg-gradient-to-b from-manuscript/95 via-manuscript/90 to-manuscript/95" />
        
        {/* Animated floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-ochre/15"
              initial={{ 
                x: `${20 + Math.random() * 60}%`, 
                y: -10,
                opacity: 0 
              }}
              animate={{ 
                y: '110vh',
                opacity: [0, 0.4, 0.4, 0],
              }}
              transition={{
                duration: 25 + Math.random() * 15,
                repeat: Infinity,
                delay: i * 4,
                ease: 'linear'
              }}
            />
          ))}
        </div>
        
        {/* Parchment texture overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Vignette effect */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 50%, hsl(var(--sandalwood) / 0.25) 100%)',
          }}
        />
      </div>

      {/* Back button - minimal */}
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
          <span className="hidden md:inline">Back</span>
        </Button>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header Section */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="pt-20 md:pt-24 pb-6 text-center px-6"
        >
          {/* Sanskrit title */}
          <h1 className="font-sanskrit text-2xl md:text-3xl text-earth mb-3">
            अध्ययनमार्गः
          </h1>
          
          {/* English subtitle */}
          <p className="font-serif text-lg text-sandalwood-dark">
            Choose Your Path of Study
          </p>
          
          {/* Profession context */}
          {profession && (
            <p className="text-sm text-ochre/80 mt-2 italic">
              as a {profession.name}
            </p>
          )}
          
          {/* Decorative divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex items-center justify-center gap-4 mt-6"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-sandalwood/50" />
            <span className="text-ochre/60 text-xs">॰</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-sandalwood/50" />
          </motion.div>
        </motion.header>

        {/* Modules Grid */}
        <main className="flex-1 px-4 md:px-6 py-6 max-w-5xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {modules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                onClick={() => handleSelectModule(module)}
                className={`
                  group relative rounded-xl overflow-hidden transition-all duration-500
                  ${module.available 
                    ? 'cursor-pointer hover:scale-[1.02]' 
                    : 'cursor-not-allowed opacity-60'
                  }
                `}
              >
                {/* Card background */}
                <div className={`
                  absolute inset-0 backdrop-blur-sm transition-all duration-500
                  ${module.available 
                    ? 'bg-manuscript/70 group-hover:bg-manuscript/80' 
                    : 'bg-manuscript/50'
                  }
                `} />
                
                {/* Border */}
                <div className={`
                  absolute inset-0 rounded-xl border transition-all duration-500
                  ${module.available 
                    ? 'border-sandalwood/40 group-hover:border-ochre/50' 
                    : 'border-sandalwood/20'
                  }
                `} />
                
                {/* Hover glow effect */}
                {module.available && (
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-ochre/5 to-transparent" />
                )}
                
                {/* Content */}
                <div className="relative p-5 md:p-6">
                  {/* Sanskrit title */}
                  <h3 className={`
                    font-sanskrit text-lg md:text-xl mb-2 transition-colors duration-300
                    ${module.available 
                      ? 'text-ochre group-hover:text-ochre-muted' 
                      : 'text-sandalwood-dark/60'
                    }
                  `}>
                    {module.titleSanskrit}
                  </h3>
                  
                  {/* English title */}
                  <h4 className={`
                    font-serif text-base mb-3 transition-colors duration-300
                    ${module.available 
                      ? 'text-earth group-hover:text-earth' 
                      : 'text-sandalwood-dark/50'
                    }
                  `}>
                    {module.title}
                  </h4>
                  
                  {/* Description - subtle */}
                  <p className={`
                    text-sm leading-relaxed mb-4
                    ${module.available 
                      ? 'text-sandalwood-dark/70' 
                      : 'text-sandalwood-dark/40'
                    }
                  `}>
                    {module.description}
                  </p>
                  
                  {/* Topics as subtle text */}
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {module.topics.slice(0, 3).map((topic, i) => (
                      <span 
                        key={i}
                        className={`
                          text-xs italic
                          ${module.available 
                            ? 'text-ochre/50' 
                            : 'text-sandalwood-dark/30'
                          }
                        `}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                  
                  {/* Status indicator */}
                  <div className="mt-4 pt-4 border-t border-sandalwood/20">
                    {module.available ? (
                      <motion.span 
                        className="text-xs text-ochre/70 font-sanskrit group-hover:text-ochre transition-colors"
                        initial={{ opacity: 0.7 }}
                        whileHover={{ opacity: 1 }}
                      >
                        प्रवेशाय तत्परः → Begin
                      </motion.span>
                    ) : (
                      <span className="text-xs text-sandalwood-dark/40 italic">
                        शीघ्रमागमिष्यति — Coming soon
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Journey notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1.2 }}
            className="mt-12 text-center"
          >
            <p className="font-sanskrit text-sm text-sandalwood-dark/60">
              एकैकं पदं धीरं गच्छ
            </p>
            <p className="text-xs text-sandalwood-dark/40 mt-1 italic">
              Walk each step with patience
            </p>
          </motion.div>
        </main>

        {/* Footer wisdom */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.5 }}
          className="py-8 text-center px-6"
        >
          <p className="font-sanskrit text-sm text-sandalwood-dark/50 italic">
            विद्या ददाति विनयम्
          </p>
          <p className="text-[10px] text-sandalwood-dark/35 mt-1">
            Knowledge bestows humility
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
