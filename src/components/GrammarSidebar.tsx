import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, BookText } from 'lucide-react';
import { grammarLessons } from '@/data/yogaSutrasData';
import { useLearningStore } from '@/store/learningStore';

export function GrammarSidebar() {
  const { expandedGrammar, setExpandedGrammar } = useLearningStore();

  return (
    <aside className="w-full lg:w-80 xl:w-96 shrink-0">
      <div className="card-elevated rounded-2xl p-5 sticky top-4">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <BookText className="w-4 h-4 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground">Grammar Reference</h3>
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
              className="rounded-xl overflow-hidden border border-border/50 bg-background"
            >
              {/* Accordion header */}
              <button
                onClick={() => setExpandedGrammar(lesson.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="font-sanskrit text-primary text-base font-medium">
                    {lesson.titleSanskrit}
                  </span>
                  <span className="text-foreground text-sm font-medium">
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
                      <div className="space-y-2">
                        {lesson.examples.map((example, idx) => (
                          <div
                            key={idx}
                            className="bg-muted/30 rounded-lg p-3 border border-border/30"
                          >
                            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">
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
