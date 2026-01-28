import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, BookMarked } from 'lucide-react';
import { sutras } from '@/data/yogaSutrasData';
import { useLearningStore } from '@/store/learningStore';
import { Button } from '@/components/ui/button';

export function SutraPanel() {
  const { 
    currentSutraIndex, 
    nextSutra, 
    prevSutra,
    setScreen
  } = useLearningStore();

  const currentSutra = sutras[currentSutraIndex];
  const isFirst = currentSutraIndex === 0;
  const isLast = currentSutraIndex === sutras.length - 1;

  const handleComplete = () => {
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
        <div className="flex items-center gap-2 text-primary mb-2">
          <BookMarked className="w-5 h-5" />
          <span className="text-sm font-medium uppercase tracking-wide">
            {currentSutra.chapter}
          </span>
        </div>
        
        {/* Progress bar */}
        <div className="flex gap-1.5">
          {sutras.map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                index <= currentSutraIndex ? 'bg-primary' : 'bg-muted'
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
          className="glass-card rounded-2xl p-6 md:p-8"
        >
          {/* Sutra number */}
          <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
            Sutra {currentSutra.number}
          </div>

          {/* Sanskrit text */}
          <h2 className="font-sanskrit text-3xl md:text-4xl text-foreground leading-relaxed mb-3">
            {currentSutra.sanskrit}
          </h2>
          
          {/* Transliteration */}
          <p className="text-lg text-muted-foreground italic mb-6">
            {currentSutra.transliteration}
          </p>

          <div className="decorative-line w-full mb-6" />

          {/* Word-by-word breakdown */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
              Word-by-Word Analysis
            </h3>
            <div className="grid gap-3">
              {currentSutra.wordBreakdown.map((word, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-wrap items-start gap-3 p-3 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center gap-2 min-w-[140px]">
                    <span className="font-sanskrit text-lg text-primary">
                      {word.word}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ({word.transliteration})
                    </span>
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <span className="font-medium text-foreground">
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
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2">
              Translation
            </h3>
            <p className="text-lg font-serif text-foreground leading-relaxed">
              "{currentSutra.translation}"
            </p>
          </div>

          {/* Commentary */}
          <div className="bg-secondary/10 rounded-lg p-5 border-l-4 border-accent">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2">
              Commentary
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {currentSutra.commentary}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <Button
          variant="ghost"
          onClick={prevSutra}
          disabled={isFirst}
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous Sutra
        </Button>

        <span className="text-sm text-muted-foreground">
          {currentSutraIndex + 1} of {sutras.length}
        </span>

        {isLast ? (
          <Button
            onClick={handleComplete}
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Take Quiz
            <ChevronRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            onClick={nextSutra}
            className="gap-2"
          >
            Next Sutra
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
