import { useLearningStore } from '@/store/learningStore';
import { BookOpen, Brain, Trophy, Target } from 'lucide-react';

export function ProgressOverview() {
  const { currentVocabIndex, vocabCompleted, sutrasCompleted, quizScore } = useLearningStore();

  const stats = [
    {
      icon: BookOpen,
      label: 'Vocabulary Learned',
      value: vocabCompleted ? 6 : currentVocabIndex,
      total: 6,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      progress: ((vocabCompleted ? 6 : currentVocabIndex) / 6) * 100
    },
    {
      icon: Brain,
      label: 'Sutras Studied',
      value: sutrasCompleted,
      total: 5,
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      progress: (sutrasCompleted / 5) * 100
    },
    {
      icon: Target,
      label: 'Quiz Score',
      value: quizScore ?? 0,
      total: 5,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      progress: ((quizScore ?? 0) / 5) * 100
    },
    {
      icon: Trophy,
      label: 'Overall Progress',
      value: Math.round(
        (((vocabCompleted ? 6 : currentVocabIndex) / 6) * 33 +
        (sutrasCompleted / 5) * 33 +
        ((quizScore ?? 0) / 5) * 34)
      ),
      total: 100,
      suffix: '%',
      color: 'from-violet-500 to-purple-600',
      bgColor: 'bg-violet-50',
      textColor: 'text-violet-600',
      progress: Math.round(
        (((vocabCompleted ? 6 : currentVocabIndex) / 6) * 33 +
        (sutrasCompleted / 5) * 33 +
        ((quizScore ?? 0) / 5) * 34)
      )
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-2xl p-5 hover:shadow-md transition-shadow">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-lg`}>
            <stat.icon className="w-6 h-6 text-white" />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-foreground">
                {stat.value}
              </span>
              {stat.suffix ? (
                <span className="text-lg text-muted-foreground">{stat.suffix}</span>
              ) : (
                <span className="text-sm text-muted-foreground">/ {stat.total}</span>
              )}
            </div>
            {/* Progress bar */}
            <div className="h-2 rounded-full bg-muted overflow-hidden mt-2">
              <div 
                className={`h-full rounded-full bg-gradient-to-r ${stat.color} transition-all duration-500`}
                style={{ width: `${stat.progress}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
