import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { VocabularyCards } from '@/components/VocabularyCards';
import mandalaElegant from '@/assets/mandala-elegant.png';

interface VocabularyScreenProps {
  onOpenChatWithQuery?: (query: string) => void;
}

export function VocabularyScreen({ onOpenChatWithQuery }: VocabularyScreenProps) {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Background decorations with mandala */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 0.05, rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -right-32 w-96 h-96"
        >
          <img src={mandalaElegant} alt="" className="w-full h-full object-contain" />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 0.04, rotate: -360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-32 -left-32 w-96 h-96"
        >
          <img src={mandalaElegant} alt="" className="w-full h-full object-contain" />
        </motion.div>
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 section-pattern opacity-20" />
      </div>
      
      <Header showBack backTo="home" />
      
      <main className="py-10 md:py-16 relative z-10">
        {/* Section header */}
        <div className="text-center mb-10 px-4">
          <span className="tag-gold mb-4 inline-block">Step 2 of 8</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
            Master Key Vocabulary
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Learn the essential Sanskrit terms before diving into the sutras
          </p>
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-primary/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
        </div>
        
        <VocabularyCards onOpenChatWithQuery={onOpenChatWithQuery} />
      </main>
    </div>
  );
}