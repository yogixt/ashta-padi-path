import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { MentorSelection } from '@/components/MentorSelection';
import { useLearningStore } from '@/store/learningStore';
import { Button } from '@/components/ui/button';
import { Home, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import mandalaElegant from '@/assets/mandala-elegant.png';

export function MentorSelectionScreen() {
  const { setScreen, quizScore } = useLearningStore();
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null);

  const handleComplete = () => {
    setScreen('home');
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 0.04, rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -right-32 w-96 h-96"
        >
          <img src={mandalaElegant} alt="" className="w-full h-full object-contain" />
        </motion.div>
        <div className="absolute inset-0 section-pattern opacity-20" />
      </div>

      <Header showBack backTo="quiz" />

      <main className="py-10 md:py-16 relative z-10">
        {/* Section header */}
        <div className="text-center mb-10 px-4">
          <span className="tag-gold mb-4 inline-block">Step 4 of 8</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
            Select Your Mentor
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Congratulations on passing the quiz! Now choose an academic mentor for live guidance.
          </p>
          
          {/* Quiz score badge */}
          {quizScore !== null && (
            <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-sage/10 text-sage rounded-full text-sm font-medium border border-sage/20">
              <CheckCircle className="w-4 h-4" />
              Quiz Score: {Math.round((quizScore / 5) * 100)}%
            </div>
          )}
          
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-primary/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4">
          <MentorSelection 
            onMentorSelect={setSelectedMentor}
            selectedMentorId={selectedMentor}
          />

          {/* Complete button */}
          {selectedMentor && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-center"
            >
              <Button
                onClick={handleComplete}
                size="lg"
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Home className="w-5 h-5" />
                Complete & Return Home
              </Button>
              <p className="text-sm text-muted-foreground mt-3">
                Your mentor will be notified and you'll receive session details soon.
              </p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}