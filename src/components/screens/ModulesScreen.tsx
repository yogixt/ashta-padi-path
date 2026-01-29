import { motion } from 'framer-motion';
import { ArrowRight, Lock, Clock, BookOpen, Sparkles, GraduationCap, Target } from 'lucide-react';
import { Header } from '@/components/Header';
import { useLearningStore } from '@/store/learningStore';
import { getModulesForProfession, LearningModule } from '@/data/modulesData';
import { professions } from '@/data/yogaSutrasData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const levelColors = {
  beginner: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  intermediate: 'bg-amber-100 text-amber-700 border-amber-200',
  advanced: 'bg-violet-100 text-violet-700 border-violet-200'
};

const levelLabels = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced'
};

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
    <div className="min-h-screen bg-background">
      <Header showBack backTo="home" />
      
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 px-4 py-1.5 bg-primary/5 border-primary/20">
            <Sparkles className="w-3.5 h-3.5 mr-1.5 text-primary" />
            Step 1.5 of 8
          </Badge>
          
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
            Choose Your Module
          </h1>
          
          <p className="text-muted-foreground max-w-xl mx-auto">
            Select a topic to begin your learning journey as a{' '}
            <span className="text-primary font-medium">{profession?.name}</span>
          </p>
          
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/50" />
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
        </motion.div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                group relative rounded-2xl border overflow-hidden transition-all duration-300
                ${module.available 
                  ? 'bg-card hover:shadow-xl hover:border-primary/30 cursor-pointer hover:scale-[1.02]' 
                  : 'bg-muted/30 border-border/50 cursor-not-allowed opacity-70'
                }
              `}
              onClick={() => handleSelectModule(module)}
            >
              {/* Top accent */}
              {module.available && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
              
              <div className="p-6">
                {/* Header row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">{module.icon}</div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={`text-xs ${levelColors[module.level]}`}>
                      {levelLabels[module.level]}
                    </Badge>
                    {!module.available && (
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
                
                {/* Title */}
                <h3 className={`text-lg font-semibold mb-1 transition-colors ${
                  module.available ? 'text-foreground group-hover:text-primary' : 'text-muted-foreground'
                }`}>
                  {module.title}
                </h3>
                
                {/* Sanskrit title */}
                <p className={`font-sanskrit text-sm mb-3 ${
                  module.available ? 'text-primary/70' : 'text-muted-foreground/50'
                }`}>
                  {module.titleSanskrit}
                </p>
                
                {/* Description */}
                <p className={`text-sm leading-relaxed mb-4 ${
                  module.available ? 'text-muted-foreground' : 'text-muted-foreground/60'
                }`}>
                  {module.description}
                </p>
                
                {/* Meta info */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {module.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    {module.lessons} lessons
                  </span>
                </div>
                
                {/* Topics preview */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {module.topics.slice(0, 3).map((topic, i) => (
                    <span 
                      key={i}
                      className="px-2 py-0.5 text-xs bg-muted/50 text-muted-foreground rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                  {module.topics.length > 3 && (
                    <span className="px-2 py-0.5 text-xs bg-muted/50 text-muted-foreground rounded-full">
                      +{module.topics.length - 3} more
                    </span>
                  )}
                </div>
                
                {/* CTA */}
                {module.available ? (
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1">
                    Start Module
                    <ArrowRight className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock className="w-3.5 h-3.5" />
                    Coming Soon
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-6 bg-muted/30 rounded-2xl border border-border text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Target className="w-5 h-5 text-primary" />
            <h4 className="font-semibold text-foreground">Learning Path</h4>
          </div>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Each module includes vocabulary pre-learning, sutra study, grammar lessons, and a quiz. 
            Complete a module to unlock the next one and progress through your learning journey.
          </p>
        </motion.div>
      </main>
    </div>
  );
}
