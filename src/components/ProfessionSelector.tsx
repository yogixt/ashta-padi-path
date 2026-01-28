import { motion } from 'framer-motion';
import { ArrowRight, Lock } from 'lucide-react';
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
        className="text-center mb-12"
      >
        <span className="tag mb-4">Step 1</span>
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mt-4 mb-4">
          Select Your Learning Path
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-lg">
          Choose your professional domain for a personalized Sanskrit learning experience
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
                ? 'card-elevated cursor-pointer hover:shadow-lg hover:border-primary/30' 
                : 'bg-muted/40 border border-border/30 cursor-not-allowed'
              }
            `}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="font-sanskrit text-xl text-primary font-semibold">
                    {profession.nameHindi.charAt(0)}
                  </span>
                </div>
                {!profession.available && (
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                    <Lock className="w-3 h-3" />
                    Coming Soon
                  </span>
                )}
              </div>
              
              {/* Title */}
              <h3 className={`text-lg font-semibold mb-1 transition-colors ${
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
                <div className="mt-5 flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Begin Learning
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </div>

            {/* Bottom accent line */}
            {profession.available && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </motion.button>
        ))}
      </div>
    </section>
  );
}
