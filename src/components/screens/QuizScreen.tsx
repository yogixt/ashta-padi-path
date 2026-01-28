import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { InteractiveQuiz } from '@/components/InteractiveQuiz';
import mandalaDecorative from '@/assets/mandala-decorative.png';

export function QuizScreen() {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Background decorations with rotating mandalas */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 0.05, rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -right-24 w-80 h-80"
        >
          <img src={mandalaDecorative} alt="" className="w-full h-full object-contain" />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 0.04, rotate: -360 }}
          transition={{ duration: 130, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-24 -left-24 w-80 h-80"
        >
          <img src={mandalaDecorative} alt="" className="w-full h-full object-contain" />
        </motion.div>
        {/* Subtle pattern */}
        <div className="absolute inset-0 section-pattern opacity-20" />
      </div>
      
      <Header showBack backTo="learning" />
      
      <main className="py-10 md:py-14 relative z-10">
        {/* Section header */}
        <div className="text-center mb-8 px-4">
          <span className="tag-gold mb-4 inline-block">Step 4 of 8</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
            Test Your Knowledge
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Answer questions to reinforce your understanding of the sutras
          </p>
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-primary/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
        </div>
        
        <InteractiveQuiz />
      </main>
    </div>
  );
}