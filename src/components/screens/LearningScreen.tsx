import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/Header';
import { SutraPanel } from '@/components/SutraPanel';
import { GrammarSidebar } from '@/components/GrammarSidebar';
import { ProgressTracker } from '@/components/ProgressTracker';
import { useLearningStore } from '@/store/learningStore';
import { Button } from '@/components/ui/button';
import { Play, X, ArrowRight } from 'lucide-react';
import mandalaImage from '@/assets/mandala-pattern.jpg';

function IntroVideoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-4xl bg-card rounded-2xl overflow-hidden border border-border shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
            <h3 className="font-serif font-semibold text-foreground">Introduction to Yoga Sutras</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/qvM56Yg29AM?autoplay=1"
              title="Yoga Sutras Introduction"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function LearningScreen() {
  const { currentSutraIndex, nextSutra, prevSutra } = useLearningStore();
  const [showIntroVideo, setShowIntroVideo] = useState(false);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showIntroVideo) return; // Don't navigate when modal is open
      if (e.key === 'ArrowRight') {
        nextSutra();
      } else if (e.key === 'ArrowLeft') {
        prevSutra();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSutra, prevSutra, showIntroVideo]);

  const handleWatchIntro = () => {
    setShowIntroVideo(true);
    setHasSeenIntro(true);
  };

  const handleSkipIntro = () => {
    setHasSeenIntro(true);
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-0 w-72 h-72 opacity-[0.04]">
          <img src={mandalaImage} alt="" className="w-full h-full object-cover rounded-full" />
        </div>
        <div className="absolute top-20 right-0 w-56 h-56 opacity-[0.03]">
          <img src={mandalaImage} alt="" className="w-full h-full object-cover rounded-full" />
        </div>
        {/* Subtle pattern */}
        <div className="absolute inset-0 section-pattern opacity-20" />
      </div>
      
      <Header showBack backTo="vocabulary" />
      
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12 relative z-10">
        {/* Section header */}
        <div className="text-center mb-8">
          <span className="tag mb-3 inline-block">Step 3 of 8</span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
            Study the Sutras
          </h2>
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
        </div>

        {/* Intro Video Banner - Show on first sutra if not seen */}
        {currentSutraIndex === 0 && !hasSeenIntro && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-6"
          >
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Play className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-serif font-semibold text-foreground mb-1">
                  New to Yoga Sutras?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Watch a brief introduction to understand the context and significance of Patanjali's teachings.
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={handleSkipIntro}>
                  Skip
                </Button>
                <Button onClick={handleWatchIntro} className="gap-2 bg-primary text-primary-foreground">
                  <Play className="w-4 h-4" />
                  Watch Intro
                </Button>
              </div>
            </div>
          </motion.div>
        )}
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <SutraPanel />
          
          {/* Sidebar */}
          <div className="space-y-6">
            <GrammarSidebar />
            
            {/* Progress on larger screens */}
            <div className="hidden lg:block">
              <ProgressTracker />
            </div>
          </div>
        </div>
        
        {/* Mobile progress */}
        <div className="lg:hidden mt-8">
          <ProgressTracker />
        </div>

        {/* Keyboard hint */}
        <div className="hidden md:block text-center mt-10">
          <p className="text-xs text-muted-foreground">
            Use <kbd className="px-2 py-1 bg-card border-2 border-border rounded text-[10px] font-mono mx-1 shadow-sm">←</kbd> 
            <kbd className="px-2 py-1 bg-card border-2 border-border rounded text-[10px] font-mono mx-1 shadow-sm">→</kbd> arrow keys to navigate
          </p>
        </div>
      </main>

      {/* Intro Video Modal */}
      <IntroVideoModal 
        isOpen={showIntroVideo} 
        onClose={() => setShowIntroVideo(false)} 
      />
    </div>
  );
}