import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, BookText, Layers, ScrollText } from 'lucide-react';
import { grammarModules, GrammarLesson, GrammarModule } from '@/data/grammarModules';
import { useLearningStore } from '@/store/learningStore';
import { cn } from '@/lib/utils';

function LessonContent({ lesson }: { lesson: GrammarLesson }) {
  return (
    <div className="space-y-4">
      {/* Definition */}
      <div className="bg-primary/5 rounded-lg p-3 border border-primary/10">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Definition</p>
        <p className="text-sm text-foreground">{lesson.definition}</p>
      </div>

      {/* Concept */}
      {lesson.concept && (
        <p className="text-sm text-muted-foreground leading-relaxed">{lesson.concept}</p>
      )}

      {/* Simple Explanation */}
      {lesson.simple_explanation && (
        <p className="text-sm text-muted-foreground italic">{lesson.simple_explanation}</p>
      )}

      {/* Purpose */}
      {lesson.purpose && lesson.purpose.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Purpose</p>
          <ul className="space-y-1">
            {lesson.purpose.map((p, i) => (
              <li key={i} className="text-sm text-foreground flex gap-2">
                <span className="text-primary">•</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* What it shows */}
      {lesson.what_it_shows && (
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">What it shows</p>
          <div className="flex flex-wrap gap-1.5">
            {lesson.what_it_shows.map((item, i) => (
              <span key={i} className="text-xs bg-muted/50 px-2 py-1 rounded-md">{item}</span>
            ))}
          </div>
        </div>
      )}

      {/* Main Groups */}
      {lesson.main_groups && (
        <div className="space-y-2">
          {lesson.main_groups.map((group, i) => (
            <div key={i} className="bg-muted/30 rounded-lg p-3 border border-border/30">
              <p className="font-sanskrit text-primary font-medium">{group.type}</p>
              <p className="text-xs text-muted-foreground">{group.meaning}</p>
              {group.example && <p className="text-sm font-sanskrit mt-1">{group.example as string}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Two Main Types */}
      {lesson.two_main_types && (
        <div className="grid grid-cols-1 gap-2">
          {lesson.two_main_types.map((type, i) => (
            <div key={i} className="bg-muted/30 rounded-lg p-3 border border-border/30">
              <p className="font-sanskrit text-primary font-medium text-sm">{type.type}</p>
              <p className="text-xs text-muted-foreground">{type.meaning || type.purpose}</p>
              {type.example && <p className="text-xs font-sanskrit mt-1 text-foreground/80">{type.example as string}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Three Numbers/Genders */}
      {(lesson.three_numbers || lesson.three_genders) && (
        <div className="grid grid-cols-1 gap-2">
          {(lesson.three_numbers || lesson.three_genders)?.map((item, i) => (
            <div key={i} className="bg-muted/30 rounded-lg p-3 border border-border/30 flex items-center justify-between">
              <div>
                <p className="font-sanskrit text-primary font-medium text-sm">{item.type}</p>
                <p className="text-xs text-muted-foreground">{item.meaning}</p>
              </div>
              {item.example && <span className="font-sanskrit text-sm">{item.example as string}</span>}
            </div>
          ))}
        </div>
      )}

      {/* Cases (Vibhakti) */}
      {lesson.cases && (
        <div className="space-y-1.5">
          {lesson.cases.map((c, i) => (
            <div key={i} className="flex items-center gap-3 bg-muted/20 rounded-lg px-3 py-2">
              <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-xs text-primary font-medium">
                {c.number}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.meaning}</p>
              </div>
              <span className="text-xs font-sanskrit text-foreground/70">{c.example as string}</span>
            </div>
          ))}
        </div>
      )}

      {/* Main Types (Samāsa) */}
      {lesson.main_types && (
        <div className="space-y-2">
          {lesson.main_types.map((type, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-primary text-sm">•</span>
              <div>
                <span className="font-sanskrit text-sm text-foreground">{type.type}</span>
                <span className="text-xs text-muted-foreground ml-2">{type.meaning}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Main Lakaras */}
      {lesson.main_lakaras && (
        <div className="grid grid-cols-1 gap-2">
          {lesson.main_lakaras.map((l, i) => (
            <div key={i} className="bg-muted/30 rounded-lg p-3 border border-border/30">
              <div className="flex items-center justify-between">
                <p className="font-sanskrit text-primary font-medium text-sm">{l.type}</p>
                <span className="text-xs text-muted-foreground">{l.meaning}</span>
              </div>
              {l.example && <p className="text-xs font-sanskrit mt-1">{l.example as string}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Examples */}
      {lesson.examples && lesson.examples.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Examples</p>
          {lesson.examples.map((ex, i) => (
            <div key={i} className="bg-muted/30 rounded-lg p-3 border border-border/30">
              {ex.before && ex.after && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-sanskrit">{ex.before}</span>
                  <ChevronRight className="w-3 h-3 text-muted-foreground" />
                  <span className="font-sanskrit text-primary">{ex.after}</span>
                </div>
              )}
              {ex.word && (
                <p className="font-sanskrit text-foreground">{ex.word}</p>
              )}
              {ex.transliteration && (
                <p className="text-xs text-muted-foreground italic">{ex.transliteration}</p>
              )}
              {ex.meaning && (
                <p className="text-xs text-foreground/80">{ex.meaning}</p>
              )}
              {ex.rule && (
                <p className="text-xs text-primary mt-1">{ex.rule}</p>
              )}
              {ex.note && (
                <p className="text-xs text-muted-foreground italic mt-1">{ex.note}</p>
              )}
              {ex.breakdown && (
                <p className="text-xs text-muted-foreground">{ex.breakdown}</p>
              )}
              {ex.derived_words && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {ex.derived_words.map((dw, j) => (
                    <span key={j} className="text-xs bg-primary/10 px-2 py-0.5 rounded">{dw}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Common Types (Yoga Sutra specific) */}
      {lesson.common_types && (
        <div className="space-y-2">
          {lesson.common_types.map((type, i) => (
            <div key={i} className="bg-muted/30 rounded-lg p-3 border border-border/30">
              <p className="font-medium text-foreground text-sm">{type.type}</p>
              {type.purpose && <p className="text-xs text-muted-foreground">{type.purpose}</p>}
              {type.description && <p className="text-xs text-muted-foreground">{type.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Important Cases */}
      {lesson.important_cases && (
        <div className="space-y-2">
          {lesson.important_cases.map((c, i) => (
            <div key={i} className="bg-muted/30 rounded-lg p-3 border border-border/30">
              <p className="font-medium text-foreground text-sm">{c.name}</p>
              <p className="text-xs text-muted-foreground">{c.meaning}</p>
              {c.shows && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {c.shows.map((s, j) => (
                    <span key={j} className="text-xs bg-primary/10 px-2 py-0.5 rounded">{s}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Types (Krdanta) */}
      {lesson.types && (
        <div className="space-y-2">
          {lesson.types.map((type, i) => (
            <div key={i} className="bg-muted/30 rounded-lg p-3 border border-border/30">
              <p className="font-medium text-foreground text-sm">{type.type}</p>
              {type.purpose && <p className="text-xs text-muted-foreground">{type.purpose}</p>}
              {type.note && <p className="text-xs text-muted-foreground italic">{type.note}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Mostly Used (Lakara limited) */}
      {lesson.mostly_used && (
        <div className="space-y-2">
          {lesson.mostly_used.map((item, i) => (
            <div key={i} className="bg-muted/30 rounded-lg p-3 border border-border/30">
              <p className="font-medium text-foreground text-sm">{item.type}</p>
              {item.examples && Array.isArray(item.examples) && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {(item.examples as string[]).map((ex, j) => (
                    <span key={j} className="text-xs font-sanskrit">{ex}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Common Endings */}
      {lesson.common_endings && (
        <div className="flex flex-wrap gap-2 mt-2">
          {lesson.common_endings.map((ending, i) => (
            <span key={i} className="text-sm font-sanskrit bg-primary/10 px-3 py-1 rounded-full">{ending}</span>
          ))}
        </div>
      )}

      {/* Why Needed */}
      {lesson.why_needed && (
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Why needed</p>
          <ul className="space-y-1">
            {lesson.why_needed.map((item, i) => (
              <li key={i} className="text-sm text-foreground flex gap-2">
                <span className="text-primary">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Must Perform */}
      {lesson.must_perform && (
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Must perform</p>
          {lesson.must_perform.map((item, i) => (
            <div key={i} className="text-sm text-foreground flex gap-2">
              <span className="text-primary">{i + 1}.</span>
              {item}
            </div>
          ))}
        </div>
      )}

      {/* Features */}
      {lesson.features && (
        <div className="flex flex-wrap gap-1.5">
          {lesson.features.map((f, i) => (
            <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md">{f}</span>
          ))}
        </div>
      )}

      {/* Requires */}
      {lesson.requires && (
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Requires</p>
          {lesson.requires.map((item, i) => (
            <div key={i} className="text-sm text-foreground flex gap-2">
              <span className="text-primary">•</span>
              {item}
            </div>
          ))}
        </div>
      )}

      {/* Key Point */}
      {lesson.key_point && (
        <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
          <p className="text-xs text-primary uppercase tracking-wide mb-1">Key Point</p>
          <p className="text-sm text-foreground font-medium">{lesson.key_point}</p>
        </div>
      )}

      {/* Critical Note */}
      {lesson.critical_note && (
        <div className="bg-destructive/10 rounded-lg p-3 border border-destructive/20">
          <p className="text-xs text-destructive uppercase tracking-wide mb-1">Important</p>
          <p className="text-sm text-foreground">{lesson.critical_note}</p>
        </div>
      )}

      {/* Key Concept */}
      {lesson.key_concept && (
        <div className="bg-accent/30 rounded-lg p-3 border border-accent/50">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Key Concept</p>
          <p className="text-sm font-sanskrit text-foreground">{lesson.key_concept}</p>
        </div>
      )}

      {/* Why Important */}
      {lesson.why_important && (
        <p className="text-sm text-primary font-medium">{lesson.why_important}</p>
      )}

      {/* Shows */}
      {lesson.shows && (
        <p className="text-sm text-muted-foreground italic">{lesson.shows}</p>
      )}
    </div>
  );
}

function ModuleSection({ module, isExpanded, onToggle }: { 
  module: GrammarModule; 
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const { expandedGrammar, setExpandedGrammar } = useLearningStore();

  const moduleIcon = module.module_id === 'foundations' ? BookText : ScrollText;
  const ModuleIcon = moduleIcon;

  return (
    <div className="rounded-xl overflow-hidden border border-border/50 bg-background">
      {/* Module Header */}
      <button
        onClick={onToggle}
        className={cn(
          "w-full flex items-center justify-between p-4 text-left transition-colors",
          isExpanded ? "bg-primary/5" : "hover:bg-muted/30"
        )}
      >
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
            isExpanded ? "bg-primary text-primary-foreground" : "bg-muted"
          )}>
            <ModuleIcon className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm">{module.module_name}</p>
            <p className="text-xs text-muted-foreground">{module.lessons.length} lessons</p>
          </div>
        </div>
        <ChevronDown 
          className={cn(
            "w-5 h-5 text-muted-foreground transition-transform duration-300",
            isExpanded && "rotate-180"
          )}
        />
      </button>

      {/* Module Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">
              {/* Module Description */}
              <p className="text-sm text-muted-foreground mb-4 border-l-2 border-primary/30 pl-3">
                {module.description}
              </p>

              {/* Core Skills (if present) */}
              {module.core_skills && (
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Core Skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {module.core_skills.map((skill, i) => (
                      <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Lessons */}
              <div className="space-y-2">
                {module.lessons.map((lesson, index) => (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="rounded-lg overflow-hidden border border-border/30 bg-muted/10"
                  >
                    {/* Lesson Header */}
                    <button
                      onClick={() => setExpandedGrammar(lesson.id)}
                      className="w-full flex items-center justify-between p-3 text-left hover:bg-muted/20 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <span className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center text-xs text-primary font-medium shrink-0">
                          {index + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="font-sanskrit text-primary text-sm font-medium">
                            {lesson.sanskrit}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {lesson.transliteration}
                          </p>
                        </div>
                      </div>
                      <ChevronRight 
                        className={cn(
                          "w-4 h-4 text-muted-foreground transition-transform duration-200 shrink-0",
                          expandedGrammar === lesson.id && "rotate-90"
                        )}
                      />
                    </button>

                    {/* Lesson Content */}
                    <AnimatePresence>
                      {expandedGrammar === lesson.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-3 pb-3 pt-1">
                            <LessonContent lesson={lesson} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function GrammarSidebar() {
  const [expandedModule, setExpandedModule] = useState<string | null>('foundations');

  return (
    <aside className="w-full lg:w-80 xl:w-96 shrink-0">
      <div className="card-elevated rounded-2xl p-5 sticky top-4">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Layers className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Grammar Reference</h3>
            <p className="text-xs text-muted-foreground">Vyakarana System</p>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-5">
          Comprehensive Sanskrit grammar for Yoga Sutra study
        </p>

        {/* Modules */}
        <div className="space-y-3">
          {grammarModules.map((module) => (
            <ModuleSection
              key={module.module_id}
              module={module}
              isExpanded={expandedModule === module.module_id}
              onToggle={() => setExpandedModule(
                expandedModule === module.module_id ? null : module.module_id
              )}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
