import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, BookMarked, ArrowRight } from 'lucide-react';
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
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 tag">
            <BookMarked className="w-3.5 h-3.5" />
            {currentSutra.chapter}
          </div>
          <span className="text-sm text-muted-foreground font-medium">
            {currentSutraIndex + 1} of {sutras.length}
          </span>
        </div>
        
        {/* Progress bar */}
        <div className="flex gap-1">
          {sutras.map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                index <= currentSutraIndex ? 'bg-primary' : 'bg-border'
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
          className="card-elevated rounded-2xl p-6 md:p-8"
        >
          {/* Sutra number */}
          <span className="tag-outline mb-6 inline-block">
            Sutra {currentSutra.number}
          </span>

          {/* Sanskrit text */}
          <h2 className="font-sanskrit text-3xl md:text-4xl text-foreground leading-relaxed mb-3">
            {currentSutra.sanskrit}
          </h2>
          
          {/* Transliteration */}
          <p className="text-lg text-muted-foreground font-serif italic mb-8">
            {currentSutra.transliteration}
          </p>

          <div className="divider mb-8" />

          {/* Word-by-word breakdown */}
          <div className="mb-8">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Word-by-Word Analysis
            </h3>
            <div className="space-y-2">
              {currentSutra.wordBreakdown.map((word, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="flex flex-wrap items-start gap-4 p-4 bg-muted/30 rounded-xl border border-border/50"
                >
                  <div className="flex items-center gap-3 min-w-[160px]">
                    <span className="font-sanskrit text-lg text-primary font-medium">
                      {word.word}
                    </span>
                    <span className="text-sm text-muted-foreground font-serif italic">
                      {word.transliteration}
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
          <div className="mb-8">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Translation
            </h3>
            <p className="text-xl font-serif text-foreground leading-relaxed">
              "{currentSutra.translation}"
            </p>
          </div>

          {/* Commentary */}
          <div className="bg-primary/5 rounded-xl p-6 border-l-2 border-primary">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
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
          Previous
        </Button>

        {isLast ? (
          <Button
            onClick={handleComplete}
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Take Quiz
            <ArrowRight className="w-4 h-4" />
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
