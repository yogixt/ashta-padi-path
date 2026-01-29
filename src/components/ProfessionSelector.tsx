import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, Sparkles } from 'lucide-react';
import { professions } from '@/data/yogaSutrasData';
import { useLearningStore } from '@/store/learningStore';
import { useAuth } from '@/contexts/AuthContext';

// Import mandala images for each profession
import mandalaYoga from '@/assets/mandala-yoga.png';
import mandalaEconomist from '@/assets/mandala-economist.png';
import mandalaPhilosopher from '@/assets/mandala-philosopher.png';
import mandalaPsychologist from '@/assets/mandala-psychologist.png';
import mandalaWellness from '@/assets/mandala-wellness.png';

// Map profession IDs to their mandala images
const professionMandalas: Record<string, string> = {
  yoga: mandalaYoga,
  economist: mandalaEconomist,
  philosopher: mandalaPhilosopher,
  psychologist: mandalaPsychologist,
  wellness: mandalaWellness,
};

export function ProfessionSelector() {
  const { setSelectedProfession, setScreen } = useLearningStore();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSelect = (professionId: string, available: boolean) => {
    if (!available) return;
    
    // Store the selected profession
    setSelectedProfession(professionId);
    
    // If not authenticated, redirect to auth page
    if (!user) {
      // Store intent to go to modules after auth
      sessionStorage.setItem('postAuthRedirect', 'modules');
      navigate('/auth');
      return;
    }
    
    // If authenticated, go to modules screen
    setScreen('modules');
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
            {/* Mandala background decoration */}
            <div className="absolute -right-8 -top-8 w-36 h-36 pointer-events-none">
              <motion.img 
                src={professionMandalas[profession.id]} 
                alt=""
                className={`w-full h-full object-contain transition-all duration-500 ${
                  profession.available 
                    ? 'opacity-20 group-hover:opacity-35 group-hover:scale-110 group-hover:rotate-12' 
                    : 'opacity-10 grayscale'
                }`}
                initial={{ rotate: 0 }}
                animate={{ rotate: profession.available ? 0 : 0 }}
              />
            </div>
            
            {/* Secondary mandala glow effect for available cards */}
            {profession.available && (
              <div className="absolute -right-12 -bottom-12 w-32 h-32 pointer-events-none opacity-0 group-hover:opacity-15 transition-opacity duration-500">
                <img 
                  src={professionMandalas[profession.id]} 
                  alt=""
                  className="w-full h-full object-contain blur-sm"
                />
              </div>
            )}
            
            {/* Top accent bar */}
            {profession.available && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
            
            <div className="p-6 relative z-10">
              {/* Header with mandala icon */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-accent/5 flex items-center justify-center border border-primary/20 group-hover:from-primary/20 group-hover:to-accent/10 transition-colors overflow-hidden">
                  <img 
                    src={professionMandalas[profession.id]} 
                    alt={`${profession.name} mandala`}
                    className={`w-12 h-12 object-contain transition-transform duration-300 ${
                      profession.available 
                        ? 'group-hover:scale-110' 
                        : 'grayscale opacity-60'
                    }`}
                  />
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
