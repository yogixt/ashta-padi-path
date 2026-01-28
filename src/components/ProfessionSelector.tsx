import { motion } from 'framer-motion';
import { professions } from '@/data/yogaSutrasData';
import { useLearningStore } from '@/store/learningStore';
import { Badge } from '@/components/ui/badge';

export function ProfessionSelector() {
  const { setSelectedProfession, setScreen } = useLearningStore();

  const handleSelect = (professionId: string, available: boolean) => {
    if (!available) return;
    setSelectedProfession(professionId);
    setScreen('vocabulary');
  };

  return (
    <section className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-3">
          Choose Your Path
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Select your profession to receive personalized Sanskrit learning tailored to your field
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {professions.map((profession, index) => (
          <motion.button
            key={profession.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            onClick={() => handleSelect(profession.id, profession.available)}
            disabled={!profession.available}
            className={`
              group relative p-6 rounded-xl text-left transition-all duration-300
              ${profession.available 
                ? 'glass-card hover-warm cursor-pointer hover:border-primary/50' 
                : 'bg-muted/50 cursor-not-allowed opacity-60'
              }
            `}
          >
            {/* Icon */}
            <span className="text-4xl mb-4 block">{profession.icon}</span>
            
            {/* Title */}
            <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
              {profession.name}
            </h3>
            
            {/* Sanskrit name */}
            <p className="font-sanskrit text-sm text-primary/80 mb-3">
              {profession.nameHindi}
            </p>
            
            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {profession.description}
            </p>

            {/* Status badge */}
            {!profession.available && (
              <Badge 
                variant="secondary" 
                className="absolute top-4 right-4 bg-muted text-muted-foreground"
              >
                Coming Soon
              </Badge>
            )}

            {/* Hover indicator for available */}
            {profession.available && (
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-primary text-sm font-medium">
                  Start →
                </span>
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </section>
  );
}
