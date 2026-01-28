import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, BookOpen, ArrowRight } from 'lucide-react';
import { vocabulary } from '@/data/yogaSutrasData';
import { useLearningStore } from '@/store/learningStore';
import { Button } from '@/components/ui/button';

export function VocabularyCards() {
  const { 
    currentVocabIndex, 
    nextVocab, 
    prevVocab, 
    completeVocab,
    setScreen 
  } = useLearningStore();

  const currentTerm = vocabulary[currentVocabIndex];
  const isFirst = currentVocabIndex === 0;
  const isLast = currentVocabIndex === vocabulary.length - 1;

  const handleContinue = () => {
    if (isLast) {
      completeVocab();
      setScreen('learning');
    } else {
      nextVocab();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 tag mb-4">
          <BookOpen className="w-3.5 h-3.5" />
          Vocabulary
        </div>
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-3">
          Master Key Terms
        </h2>
        <p className="text-muted-foreground">
          Learn essential Sanskrit vocabulary before studying the sutras
        </p>
      </motion.div>

      {/* Progress dots */}
      <div className="flex justify-center gap-1.5 mb-10">
        {vocabulary.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              const store = useLearningStore.getState();
              if (index < currentVocabIndex) {
                for (let i = currentVocabIndex; i > index; i--) {
                  store.prevVocab();
                }
              } else if (index > currentVocabIndex) {
                for (let i = currentVocabIndex; i < index; i++) {
                  store.nextVocab();
                }
              }
            }}
            className={`
              progress-dot
              ${index === currentVocabIndex ? 'active' : ''}
              ${index < currentVocabIndex ? 'completed' : ''}
              ${index > currentVocabIndex ? 'inactive' : ''}
            `}
          />
        ))}
      </div>

      {/* Flashcard */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentVocabIndex}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
          className="card-elevated rounded-2xl p-8 md:p-10"
        >
          {/* Sanskrit term */}
          <div className="text-center mb-8">
            <h3 className="font-sanskrit text-5xl md:text-6xl text-foreground mb-3">
              {currentTerm.term}
            </h3>
            <p className="text-xl text-muted-foreground font-serif italic">
              {currentTerm.transliteration}
            </p>
          </div>

          <div className="divider-accent w-16 mx-auto mb-8 rounded-full" />

          {/* Root etymology */}
          <div className="bg-muted/50 rounded-xl p-4 mb-6 border border-border/50">
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1.5">Dhātu (Root)</p>
            <p className="font-medium text-foreground">{currentTerm.root}</p>
          </div>

          {/* Meanings */}
          <div className="mb-6">
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-3">Meanings</p>
            <div className="flex flex-wrap gap-2">
              {currentTerm.meanings.map((meaning, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-primary/8 text-primary border border-primary/15 rounded-full text-sm font-medium"
                >
                  {meaning}
                </span>
              ))}
            </div>
          </div>

          {/* Part of speech */}
          <div className="text-sm text-muted-foreground mb-5">
            <span className="font-medium text-foreground">Part of Speech:</span> {currentTerm.partOfSpeech}
          </div>

          {/* Example usage */}
          {currentTerm.exampleUsage && (
            <div className="bg-card rounded-xl p-4 border-l-2 border-primary">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1.5">Example in Sutras</p>
              <p className="font-sanskrit text-foreground text-lg">{currentTerm.exampleUsage}</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <Button
          variant="ghost"
          onClick={prevVocab}
          disabled={isFirst}
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        <span className="text-sm text-muted-foreground font-medium">
          {currentVocabIndex + 1} / {vocabulary.length}
        </span>

        <Button
          onClick={handleContinue}
          className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isLast ? (
            <>
              Continue to Sutras
              <ArrowRight className="w-4 h-4" />
            </>
          ) : (
            <>
              Next
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
