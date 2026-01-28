import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, BookOpen, Settings, Pen, X } from 'lucide-react';
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
          className="absolute right-0 top-0 w-80 bg-background rounded-2xl shadow-xl border border-border/50 overflow-hidden z-20"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/50">
            <h3 className="font-semibold text-primary">Sanskrit Ecosystem</h3>
            <button
              onClick={onClose}
              className="p-1 hover:bg-muted rounded-lg transition-colors"
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
                className="w-full flex items-start gap-3 p-3 rounded-xl bg-muted/30 border border-border/30 hover:bg-muted/50 hover:border-primary/30 transition-all text-left group"
              >
                <div className="w-10 h-10 rounded-xl bg-muted group-hover:bg-primary/10 flex items-center justify-center shrink-0 transition-colors">
                  <tool.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm">{tool.name}</p>
                  <p className="text-xs text-muted-foreground">{tool.description}</p>
                  <span className={cn(
                    "inline-block text-xs font-medium mt-1 px-2 py-0.5 rounded",
                    tool.status === 'Active' 
                      ? "bg-primary/10 text-primary" 
                      : "bg-green-500/10 text-green-600"
                  )}>
                    {tool.status}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Footer note */}
          <div className="p-4 pt-0">
            <div className="bg-accent/30 rounded-xl p-3 text-center">
              <p className="text-sm text-muted-foreground italic">
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

  const handleStartLearning = () => {
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
          className="card-elevated rounded-2xl overflow-hidden"
        >
          {/* Card Header */}
          <div className="bg-muted/30 px-6 py-4 border-b border-border/50 flex items-center justify-between">
            <span className="text-sm text-muted-foreground font-medium">
              Term {currentVocabIndex + 1} of {vocabulary.length}
            </span>
            <button
              onClick={() => setShowEcosystem(!showEcosystem)}
              className={cn(
                "text-xs font-medium px-3 py-1.5 rounded-full transition-colors",
                showEcosystem 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted hover:bg-muted/80 text-muted-foreground"
              )}
            >
              Sanskrit Ecosystem
            </button>
          </div>

          {/* Card Content */}
          <div className="p-8 md:p-12">
            {/* Sanskrit term */}
            <div className="text-center mb-8">
              <h3 className="font-sanskrit text-5xl md:text-6xl lg:text-7xl text-foreground mb-3">
                {currentTerm.term}
              </h3>
              <p className="text-xl md:text-2xl text-muted-foreground font-serif italic">
                {currentTerm.transliteration}
              </p>
            </div>

            {/* Root Section */}
            <div className="mb-8">
              <h4 className="text-sm font-semibold text-primary uppercase tracking-wide mb-3 text-center">
                Root
              </h4>
              <p className="text-center text-foreground font-medium">
                {currentTerm.root}
              </p>
            </div>

            {/* Meanings Section */}
            <div className="mb-8">
              <h4 className="text-sm font-semibold text-primary uppercase tracking-wide mb-4 text-center">
                Meanings
              </h4>
              <ul className="space-y-2 max-w-md mx-auto">
                {currentTerm.meanings.map((meaning, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary/60 shrink-0" />
                    <span className="text-foreground text-center flex-1">{meaning}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Example Usage Section */}
            {currentTerm.exampleUsage && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-primary uppercase tracking-wide mb-4 text-center">
                  Example Usage
                </h4>
                <div className="bg-accent/40 rounded-xl p-6 border-l-4 border-primary/40">
                  <p className="font-sanskrit text-foreground text-xl md:text-2xl text-center mb-3">
                    {currentTerm.exampleUsage.split(' (')[0]}
                  </p>
                  <p className="text-muted-foreground text-center italic">
                    {getExampleTranslation(currentTerm.id)}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="px-6 pb-6 flex gap-4">
            <Button
              variant="outline"
              onClick={prevVocab}
              disabled={isFirst}
              className="flex-1 h-14 text-base gap-2 rounded-xl border-2"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </Button>

            <Button
              onClick={handleStartLearning}
              className="flex-1 h-14 text-base gap-2 rounded-xl bg-primary hover:bg-primary/90"
            >
              Start Learning Sutras
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 pb-6">
            {vocabulary.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  index === currentVocabIndex 
                    ? "bg-primary scale-110" 
                    : index < currentVocabIndex 
                      ? "bg-primary/40" 
                      : "bg-muted-foreground/30"
                )}
                aria-label={`Go to term ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Quick Navigation */}
      <div className="flex justify-center mt-6 gap-2">
        {!isFirst && (
          <Button
            variant="ghost"
            size="sm"
            onClick={prevVocab}
            className="text-muted-foreground"
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
            className="text-muted-foreground"
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
