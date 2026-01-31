import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, BookMarked, ArrowRight, Scroll } from 'lucide-react';
import { sutras } from '@/data/yogaSutrasData';
import { useLearningStore } from '@/store/learningStore';
import { Button } from '@/components/ui/button';
import { useActivityTracking } from '@/hooks/useActivityTracking';

export function SutraPanel() {
  const { 
    currentSutraIndex, 
    nextSutra, 
    prevSutra,
    setScreen,
    completeSutra
  } = useLearningStore();
  
  const { logActivity } = useActivityTracking();

  const currentSutra = sutras[currentSutraIndex];
  const isFirst = currentSutraIndex === 0;
  const isLast = currentSutraIndex === sutras.length - 1;

  const handleNextSutra = () => {
    completeSutra();
    logActivity('sutra');
    nextSutra();
  };

  const handleComplete = () => {
    completeSutra();
    logActivity('sutra');
    setScreen('quiz');
  };

  return (
    <div className="flex-1 min-w-0">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 tag">
            <BookMarked className="w-3.5 h-3.5" />
            {currentSutra.chapter}
          </div>
          <span className="text-sm text-muted-foreground font-semibold">
            {currentSutraIndex + 1} of {sutras.length}
          </span>
        </div>
        
        {/* Progress bar */}
        <div className="flex gap-1.5">
          {sutras.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                index <= currentSutraIndex 
                  ? 'bg-gradient-to-r from-primary to-accent' 
                  : 'bg-border'
              }`}
            />
          ))}
        </div>
      </motion.div>

      {/* Sutra content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSutraIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="card-traditional rounded-xl overflow-hidden"
        >
          {/* Top accent */}
          <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />
          
          <div className="p-6 md:p-8 bg-card">
            {/* Sutra number */}
            <span className="tag-gold mb-6 inline-flex items-center gap-2">
              <Scroll className="w-3.5 h-3.5" />
              Sutra {currentSutra.number}
            </span>

            {/* Sanskrit text */}
            <h2 className="font-sanskrit text-3xl md:text-4xl text-foreground leading-relaxed mb-3 sanskrit-highlight inline-block">
              {currentSutra.sanskrit}
            </h2>
            
            {/* Transliteration */}
            <p className="text-lg text-muted-foreground font-serif italic mb-8">
              {currentSutra.transliteration}
            </p>

            <div className="divider-ornate" />

            {/* Word-by-word breakdown */}
            <div className="mb-8">
              <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-5">
                Word-by-Word Analysis
              </h3>
              <div className="space-y-3">
                {currentSutra.wordBreakdown.map((word, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className="flex flex-wrap items-start gap-4 p-4 bg-muted/30 rounded-xl border-2 border-border/50 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-[160px]">
                      <span className="font-sanskrit text-lg text-primary font-semibold">
                        {word.word}
                      </span>
                      <span className="text-sm text-muted-foreground font-serif italic">
                        {word.transliteration}
                      </span>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <span className="font-semibold text-foreground">
                        {word.meaning}
                      </span>
                      <span className="text-sm text-muted-foreground ml-2">
                        — {word.grammar}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Translation */}
            <div className="mb-8">
              <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">
                Translation
              </h3>
              <p className="text-xl font-serif text-foreground leading-relaxed italic">
                "{currentSutra.translation}"
              </p>
            </div>

            {/* Commentary */}
            <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-xl p-6 border-l-4 border-primary">
              <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
                Commentary
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {currentSutra.commentary}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6 gap-4">
        <Button
          variant="outline"
          onClick={prevSutra}
          disabled={isFirst}
          className="gap-2 h-12 px-6 border-2 font-semibold"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        {isLast ? (
          <Button
            onClick={handleComplete}
            className="gap-2 h-12 px-6 btn-primary"
          >
            Take Quiz
            <ArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={handleNextSutra}
            className="gap-2 h-12 px-6 border-2 font-semibold"
          >
            Next Sutra
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}