import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, BookText } from 'lucide-react';
import { grammarLessons } from '@/data/yogaSutrasData';
import { useLearningStore } from '@/store/learningStore';

export function GrammarSidebar() {
  const { expandedGrammar, setExpandedGrammar } = useLearningStore();

  return (
    <aside className="w-full lg:w-80 xl:w-96 shrink-0">
      <div className="glass-card rounded-2xl p-5 sticky top-4">
        {/* Header */}
        <div className="flex items-center gap-2 text-primary mb-4">
          <BookText className="w-5 h-5" />
          <h3 className="font-semibold">Grammar Reference</h3>
        </div>
        
        <p className="text-sm text-muted-foreground mb-5">
          Expand each lesson to learn essential Sanskrit grammar concepts
        </p>

        {/* Grammar lessons */}
        <div className="space-y-2">
          {grammarLessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-lg overflow-hidden bg-muted/30"
            >
              {/* Accordion header */}
              <button
                onClick={() => setExpandedGrammar(lesson.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
              >
                <div>
                  <span className="font-sanskrit text-primary text-sm mr-2">
                    {lesson.titleSanskrit}
                  </span>
                  <span className="font-medium text-foreground text-sm">
                    {lesson.title}
                  </span>
                </div>
                <ChevronDown 
                  className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${
                    expandedGrammar === lesson.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Accordion content */}
              <AnimatePresence>
                {expandedGrammar === lesson.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 space-y-4">
                      {/* Concept */}
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {lesson.concept}
                      </p>

                      {/* Examples */}
                      <div className="space-y-3">
                        {lesson.examples.map((example, idx) => (
                          <div
                            key={idx}
                            className="bg-background/50 rounded-lg p-3 border border-border/50"
                          >
                            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                              {example.rule}
                            </p>
                            <p className="text-sm font-medium text-foreground font-sanskrit">
                              {example.demonstration}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </aside>
  );
}
