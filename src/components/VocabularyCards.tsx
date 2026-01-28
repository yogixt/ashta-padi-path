import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, BookOpen, Check } from 'lucide-react';
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
    <div className="w-full max-w-3xl mx-auto px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-2 text-primary mb-2">
          <BookOpen className="w-5 h-5" />
          <span className="text-sm font-medium uppercase tracking-wide">
            Vocabulary Pre-Learning
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
          Master Key Terms
        </h2>
        <p className="text-muted-foreground mt-2">
          Learn these essential Sanskrit terms before studying the sutras
        </p>
      </motion.div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mb-8">
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
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="glass-card rounded-2xl p-8 md:p-10"
        >
          {/* Sanskrit term */}
          <div className="text-center mb-8">
            <h3 className="font-sanskrit text-5xl md:text-6xl text-primary mb-3">
              {currentTerm.term}
            </h3>
            <p className="text-xl text-muted-foreground italic">
              {currentTerm.transliteration}
            </p>
          </div>

          <div className="decorative-line w-24 mx-auto mb-8" />

          {/* Root etymology */}
          <div className="bg-secondary/10 rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground mb-1">Root (Dhātu)</p>
            <p className="font-medium text-foreground">{currentTerm.root}</p>
          </div>

          {/* Meanings */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-3">Meanings</p>
            <div className="flex flex-wrap gap-2">
              {currentTerm.meanings.map((meaning, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
                >
                  {meaning}
                </span>
              ))}
            </div>
          </div>

          {/* Part of speech */}
          <div className="text-sm text-muted-foreground mb-4">
            <span className="font-medium">Part of Speech:</span> {currentTerm.partOfSpeech}
          </div>

          {/* Example usage */}
          {currentTerm.exampleUsage && (
            <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-primary">
              <p className="text-sm text-muted-foreground mb-1">Example in Sutras</p>
              <p className="font-sanskrit text-foreground">{currentTerm.exampleUsage}</p>
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

        <span className="text-sm text-muted-foreground">
          {currentVocabIndex + 1} of {vocabulary.length}
        </span>

        <Button
          onClick={handleContinue}
          className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isLast ? (
            <>
              Start Learning
              <Check className="w-4 h-4" />
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
