import { motion } from 'framer-motion';
import { ArrowRight, Lock, Sparkles } from 'lucide-react';
import { professions } from '@/data/yogaSutrasData';
import { useLearningStore } from '@/store/learningStore';

export function ProfessionSelector() {
  const { setSelectedProfession, setScreen } = useLearningStore();

  const handleSelect = (professionId: string, available: boolean) => {
    if (!available) return;
    setSelectedProfession(professionId);
    setScreen('vocabulary');
  };

  return (
    <section className="w-full max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        {/* Step indicator */}
        <span className="tag-gold mb-6 inline-block">
          <Sparkles className="w-3.5 h-3.5 mr-1.5" />
          Step 1 of 8
        </span>
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
          Select Your Learning Path
        </h2>
        
        <p className="text-muted-foreground max-w-xl mx-auto text-lg">
          Choose your professional domain for a personalized Sanskrit learning experience
        </p>
        
        {/* Decorative line */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/50" />
          <div className="w-2 h-2 rounded-full bg-primary" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/50" />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {professions.map((profession, index) => (
          <motion.button
            key={profession.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            onClick={() => handleSelect(profession.id, profession.available)}
            disabled={!profession.available}
            className={`
              group relative text-left transition-all duration-300 rounded-xl overflow-hidden
              ${profession.available 
                ? 'card-ornate cursor-pointer hover:shadow-xl hover:scale-[1.02]' 
                : 'bg-muted/40 border-2 border-border/30 cursor-not-allowed opacity-75'
              }
            `}
          >
            {/* Top accent bar */}
            {profession.available && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
            
            <div className="p-6 relative z-10">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center border border-primary/20 group-hover:from-primary/25 group-hover:to-accent/15 transition-colors">
                  <span className="font-sanskrit text-2xl text-primary font-bold">
                    {profession.nameHindi.charAt(0)}
                  </span>
                </div>
                {!profession.available && (
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full border border-border">
                    <Lock className="w-3 h-3" />
                    Coming Soon
                  </span>
                )}
              </div>
              
              {/* Title */}
              <h3 className={`text-xl font-serif font-semibold mb-1 transition-colors ${
                profession.available ? 'text-foreground group-hover:text-primary' : 'text-muted-foreground'
              }`}>
                {profession.name}
              </h3>
              
              {/* Sanskrit name */}
              <p className={`font-sanskrit text-sm mb-3 ${
                profession.available ? 'text-primary/70' : 'text-muted-foreground/50'
              }`}>
                {profession.nameHindi}
              </p>
              
              {/* Description */}
              <p className={`text-sm leading-relaxed ${
                profession.available ? 'text-muted-foreground' : 'text-muted-foreground/60'
              }`}>
                {profession.description}
              </p>

              {/* CTA */}
              {profession.available && (
                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1">
                  Begin Learning
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>

            {/* Bottom gradient accent */}
            {profession.available && (
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            )}
          </motion.button>
        ))}
      </div>
    </section>
  );
}