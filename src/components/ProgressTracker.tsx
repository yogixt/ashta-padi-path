import { useLearningStore } from '@/store/learningStore';
import { vocabulary, sutras } from '@/data/yogaSutrasData';
import { BookOpen, GraduationCap, Award } from 'lucide-react';

export function ProgressTracker() {
  const { completedVocabTerms, sutrasCompleted } = useLearningStore();

  // Use actual completed terms count, not boolean
  const vocabProgress = completedVocabTerms.length;
  const sutraProgress = sutrasCompleted;

  const stats = [
    {
      label: 'Vocabulary',
      value: vocabProgress,
      total: vocabulary.length,
      icon: BookOpen,
    },
    {
      label: 'Sutras',
      value: sutraProgress,
      total: sutras.length,
      icon: GraduationCap,
    }
  ];

  const totalProgress = Math.round(
    ((vocabProgress / vocabulary.length) * 50 + (sutraProgress / sutras.length) * 50)
  );

  return (
    <div className="card-ornate rounded-xl p-6 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-accent" />
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Your Progress
          </h4>
        </div>
        <span className="text-sm font-bold text-primary">{totalProgress}%</span>
      </div>
      
      {/* Overall progress bar */}
      <div className="mb-5">
        <div className="progress-traditional">
          <div 
            className="fill transition-all duration-700 ease-out"
            style={{ width: `${totalProgress}%` }}
          />
        </div>
      </div>
      
      {/* Individual stats */}
      <div className="space-y-4">
        {stats.map((stat) => {
          const percentage = Math.round((stat.value / stat.total) * 100);
          const Icon = stat.icon;
          
          return (
            <div key={stat.label}>
              <div className="flex items-center justify-between text-sm mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-muted-foreground font-medium">{stat.label}</span>
                </div>
                <span className="font-semibold text-foreground">
                  {stat.value}/{stat.total}
                </span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden border border-border/50">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${percentage}%`,
                    background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))'
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}