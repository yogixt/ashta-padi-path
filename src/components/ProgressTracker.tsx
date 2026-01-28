import { useLearningStore } from '@/store/learningStore';
import { vocabulary, sutras } from '@/data/yogaSutrasData';
import { BookOpen, GraduationCap, CheckCircle } from 'lucide-react';

export function ProgressTracker() {
  const { vocabCompleted, sutrasCompleted, currentSutraIndex } = useLearningStore();

  const vocabProgress = vocabCompleted ? vocabulary.length : 0;
  const sutraProgress = sutrasCompleted;

  const stats = [
    {
      label: 'Vocabulary',
      value: vocabProgress,
      total: vocabulary.length,
      icon: BookOpen,
      color: 'text-primary'
    },
    {
      label: 'Sutras',
      value: sutraProgress,
      total: sutras.length,
      icon: GraduationCap,
      color: 'text-accent'
    }
  ];

  return (
    <div className="glass-card rounded-xl p-4">
      <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
        <CheckCircle className="w-4 h-4 text-primary" />
        Your Progress
      </h4>
      
      <div className="space-y-4">
        {stats.map((stat) => {
          const percentage = Math.round((stat.value / stat.total) * 100);
          const Icon = stat.icon;
          
          return (
            <div key={stat.label}>
              <div className="flex items-center justify-between text-sm mb-2">
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                  <span className="text-muted-foreground">{stat.label}</span>
                </div>
                <span className="font-medium text-foreground">
                  {stat.value}/{stat.total}
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-saffron rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
