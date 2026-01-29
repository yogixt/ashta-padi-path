import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, BookOpen, Settings, Pen, X, Sparkles } from 'lucide-react';
import { vocabulary } from '@/data/yogaSutrasData';
import { useLearningStore } from '@/store/learningStore';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SanskritEcosystemPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentTerm: { term: string; transliteration: string };
  onToolClick: (toolType: string, query: string) => void;
}

function SanskritEcosystemPanel({ isOpen, onClose, currentTerm, onToolClick }: SanskritEcosystemPanelProps) {
  const tools = [
    {
      name: 'Cologne Dictionary',
      description: 'Instant definition lookup',
      status: 'Connected',
      icon: BookOpen,
      action: () => onToolClick('dictionary', `Define the Sanskrit word "${currentTerm.term}" (${currentTerm.transliteration}). Give its etymology, root, and various meanings.`),
    },
    {
      name: 'Sanskrit Heritage',
      description: 'Morphological Analyzer',
      status: 'Connected',
      icon: Settings,
      action: () => onToolClick('morphology', `Analyze the morphology of "${currentTerm.term}" (${currentTerm.transliteration}). Break down its root (dhātu), prefixes, suffixes, and grammatical form.`),
    },
    {
      name: 'Grammar Assist',
      description: 'Real-time Sandhi checker',
      status: 'Active',
      icon: Pen,
      action: () => onToolClick('grammar', `Explain any sandhi rules that apply to "${currentTerm.term}" (${currentTerm.transliteration}). Show how it would combine with other words.`),
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 20, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 top-0 w-80 card-ornate rounded-xl overflow-hidden z-20"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b-2 border-border bg-gradient-to-r from-primary/5 to-accent/5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <h3 className="font-serif font-semibold text-primary">Sanskrit Ecosystem</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* Tools list */}
          <div className="p-4 space-y-3">
            {tools.map((tool, idx) => (
              <button
                key={idx}
                onClick={tool.action}
                className="w-full flex items-start gap-3 p-4 rounded-xl bg-card border-2 border-border hover:border-primary/40 hover:shadow-md transition-all text-left group"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 group-hover:from-primary/20 group-hover:to-accent/15 flex items-center justify-center shrink-0 transition-colors border border-primary/20">
                  <tool.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm">{tool.name}</p>
                  <p className="text-xs text-muted-foreground">{tool.description}</p>
                  <span className={cn(
                    "inline-block text-xs font-semibold mt-1.5 px-2 py-0.5 rounded-full",
                    tool.status === 'Active' 
                      ? "bg-primary/10 text-primary border border-primary/20" 
                      : "bg-sage/10 text-sage border border-sage/20"
                  )}>
                    {tool.status}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Footer note */}
          <div className="p-4 pt-0">
            <div className="bg-gradient-to-r from-accent/20 to-primary/10 rounded-xl p-4 text-center border border-accent/20">
              <p className="text-sm text-foreground font-medium italic">
                Like "Grammarly for Sanskrit"
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Context-aware assistance enabled across all learning modules.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface VocabularyCardsProps {
  onOpenChatWithQuery?: (query: string) => void;
}

export function VocabularyCards({ onOpenChatWithQuery }: VocabularyCardsProps) {
  const [showEcosystem, setShowEcosystem] = useState(false);
  const { 
    currentVocabIndex, 
    nextVocab, 
    prevVocab, 
    completeVocab,
    completeCurrentVocabTerm,
    completedVocabTerms,
    setScreen 
  } = useLearningStore();

  const handleToolClick = (toolType: string, query: string) => {
    setShowEcosystem(false);
    if (onOpenChatWithQuery) {
      onOpenChatWithQuery(query);
    }
  };

  const currentTerm = vocabulary[currentVocabIndex];
  const isFirst = currentVocabIndex === 0;
  const isLast = currentVocabIndex === vocabulary.length - 1;
  const isCurrentTermCompleted = completedVocabTerms.has(currentVocabIndex);
  const allVocabCompleted = completedVocabTerms.size >= vocabulary.length;

  const handleMarkComplete = () => {
    completeCurrentVocabTerm();
    if (!isLast) {
      nextVocab();
    }
  };

  const handleStartLearning = () => {
    if (!allVocabCompleted) return;
    completeVocab();
    setScreen('learning');
  };

  const goToIndex = (index: number) => {
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
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 relative">
      {/* Sanskrit Ecosystem Panel */}
      <SanskritEcosystemPanel 
        isOpen={showEcosystem} 
        onClose={() => setShowEcosystem(false)}
        currentTerm={currentTerm}
        onToolClick={handleToolClick}
      />

      {/* Main Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentVocabIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="card-traditional rounded-xl overflow-hidden"
        >
          {/* Card Header */}
          <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 px-6 py-4 border-b-2 border-border flex items-center justify-between">
            <span className="text-sm text-muted-foreground font-semibold">
              Term {currentVocabIndex + 1} of {vocabulary.length}
            </span>
            <button
              onClick={() => setShowEcosystem(!showEcosystem)}
              className={cn(
                "text-xs font-semibold px-4 py-2 rounded-full transition-all",
                showEcosystem 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "bg-card border-2 border-border hover:border-primary/40 text-muted-foreground hover:text-primary"
              )}
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Sanskrit Ecosystem
              </span>
            </button>
          </div>

          {/* Card Content */}
          <div className="p-8 md:p-10 bg-card">
            {/* Sanskrit term */}
            <div className="text-center mb-8">
              <h3 className="font-sanskrit text-5xl md:text-6xl text-primary mb-3">
                {currentTerm.term}
              </h3>
              <p className="text-xl text-muted-foreground font-serif italic">
                {currentTerm.transliteration}
              </p>
            </div>

            {/* Root Section */}
            <div className="mb-8">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
                Root
              </h4>
              <p className="text-foreground font-medium text-lg font-serif">
                <span className="font-sanskrit text-primary">{currentTerm.root.split('(')[0].trim()}</span>
                {currentTerm.root.includes('(') && (
                  <span className="text-muted-foreground ml-2">
                    - "{currentTerm.root.split('(')[1]?.replace(')', '').replace('"', '').replace('"', '')}"
                  </span>
                )}
              </p>
            </div>

            {/* Meanings Section */}
            <div className="mb-8">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
                Meanings
              </h4>
              <div className="flex flex-wrap gap-3">
                {currentTerm.meanings.map((meaning, idx) => (
                  <span 
                    key={idx} 
                    className="px-4 py-2 bg-muted/50 text-foreground rounded-full text-sm font-medium border border-border"
                  >
                    {meaning.toLowerCase()}
                  </span>
                ))}
              </div>
            </div>

            {/* Example Usage Section */}
            {currentTerm.exampleUsage && (
              <div>
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
                  Example Usage
                </h4>
                <div className="bg-accent/20 rounded-xl p-5 border border-accent/30">
                  <p className="font-sanskrit text-primary text-lg md:text-xl mb-2">
                    {currentTerm.exampleUsage.split(' (')[0]}
                  </p>
                  <p className="text-muted-foreground text-sm italic">
                    {getExampleTranslation(currentTerm.id)}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="px-6 py-5 bg-muted/30 border-t-2 border-border space-y-3">
            {/* Mark Complete / Next Term Button - Always at top */}
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={prevVocab}
                disabled={isFirst}
                className="flex-1 h-14 text-base gap-2 rounded-xl border-2 font-semibold"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </Button>

              {!isCurrentTermCompleted ? (
                <Button
                  onClick={handleMarkComplete}
                  className="flex-1 h-14 text-base gap-2 rounded-xl btn-primary"
                >
                  {isLast ? 'Complete Term' : 'Complete & Next'}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              ) : (
                <Button
                  onClick={nextVocab}
                  disabled={isLast}
                  variant="outline"
                  className="flex-1 h-14 text-base gap-2 rounded-xl border-2 font-semibold"
                >
                  Next Term
                  <ChevronRight className="w-5 h-5" />
                </Button>
              )}
            </div>

            {/* Start Learning Sutras Button - Only enabled when all vocab completed */}
            <Button
              onClick={handleStartLearning}
              disabled={!allVocabCompleted}
              className={cn(
                "w-full h-14 text-base gap-2 rounded-xl",
                allVocabCompleted 
                  ? "btn-primary" 
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              )}
            >
              {allVocabCompleted ? (
                <>
                  Start Learning Sutras
                  <ArrowRight className="w-5 h-5" />
                </>
              ) : (
                <>
                  Complete All Terms First ({completedVocabTerms.size}/{vocabulary.length})
                  <BookOpen className="w-5 h-5" />
                </>
              )}
            </Button>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 py-5 bg-muted/30">
            {vocabulary.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300 border-2",
                  completedVocabTerms.has(index)
                    ? "bg-primary border-primary"
                    : index === currentVocabIndex 
                      ? "bg-primary/40 border-primary/60 scale-110" 
                      : "bg-muted border-border hover:border-primary/40"
                )}
                aria-label={`Go to term ${index + 1}${completedVocabTerms.has(index) ? ' (completed)' : ''}`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Quick Navigation */}
      <div className="flex justify-center mt-6 gap-3">
        {!isFirst && (
          <Button
            variant="ghost"
            size="sm"
            onClick={prevVocab}
            className="text-muted-foreground hover:text-primary"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
        )}
        {!isLast && (
          <Button
            variant="ghost"
            size="sm"
            onClick={nextVocab}
            className="text-muted-foreground hover:text-primary"
          >
            Next Term
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
}

// Helper function to get translations for examples
function getExampleTranslation(termId: string): string {
  const translations: Record<string, string> = {
    yoga: 'Yoga is the cessation of mental fluctuations',
    chitta: 'The cessation of mental fluctuations',
    vritti: 'The fluctuations are of five kinds',
    nirodha: 'Yoga is the cessation of fluctuations',
    abhyasa: 'That cessation is achieved through practice and non-attachment',
    vairagya: 'That cessation is achieved through practice and non-attachment',
  };
  return translations[termId] || 'From the Yoga Sutras of Patanjali';
}