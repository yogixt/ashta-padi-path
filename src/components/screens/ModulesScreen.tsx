import { motion } from 'framer-motion';
import { ArrowLeft, Clock, BookOpen, Lock } from 'lucide-react';
import { useLearningStore } from '@/store/learningStore';
import { getModulesForProfession, LearningModule } from '@/data/modulesData';
import { professions } from '@/data/yogaSutrasData';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';

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
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'intermediate':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'advanced':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getLevelLabel = (level: string) => {
    return level.charAt(0).toUpperCase() + level.slice(1);
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
            {/* Step indicator */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border mb-6">
              <span className="text-sm text-muted-foreground">Step 1.5 of 8</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
              Choose Your Module
            </h1>
            
            <p className="text-muted-foreground">
              Select a topic to begin your learning journey as a{' '}
              <span className="text-primary font-medium">
                {profession?.name || 'Student'}
              </span>
            </p>

            {/* Progress dots */}
            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="w-8 h-1 rounded-full bg-muted" />
              <div className="w-3 h-3 rounded-full bg-primary" />
              <div className="w-8 h-1 rounded-full bg-muted" />
            </div>
          </motion.div>

          {/* Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {modules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
                onClick={() => handleSelectModule(module)}
                className={`
                  group relative bg-card rounded-xl border border-border overflow-hidden
                  transition-all duration-300
                  ${module.available 
                    ? 'cursor-pointer hover:shadow-lg hover:border-primary/30 hover:-translate-y-1' 
                    : 'cursor-not-allowed opacity-70'
                  }
                `}
              >
                {/* Card Header */}
                <div className="p-5 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-primary" />
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
                        <Lock className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {module.title}
                  </h3>
                  
                  {/* Sanskrit subtitle */}
                  <p className="text-sm text-primary/70 font-sanskrit mb-3">
                    {module.titleSanskrit}
                  </p>
                  
                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {module.description}
                  </p>

                  {/* Duration & Lessons */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
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
                        className="px-2.5 py-1 rounded-md bg-muted/50 text-xs text-muted-foreground"
                      >
                        {topic}
                      </span>
                    ))}
                    {module.topics.length > 2 && (
                      <span className="px-2.5 py-1 text-xs text-muted-foreground">
                        +{module.topics.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Coming Soon footer for locked modules */}
                {!module.available && (
                  <div className="px-5 py-3 bg-muted/30 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Lock className="w-4 h-4" />
                      <span>Coming Soon</span>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
