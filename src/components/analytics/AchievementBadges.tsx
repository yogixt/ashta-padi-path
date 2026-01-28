import { useLearningStore } from '@/store/learningStore';
import { Award, Star, Flame, BookOpen, GraduationCap, Target, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  unlocked: boolean;
  gradient: string;
}

export function AchievementBadges() {
  const { vocabCompleted, sutrasCompleted, quizScore } = useLearningStore();

  const badges: Badge[] = [
    {
      id: 'first-word',
      name: 'First Steps',
      description: 'Complete your first vocabulary card',
      icon: BookOpen,
      unlocked: true,
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'vocab-master',
      name: 'Word Weaver',
      description: 'Complete all vocabulary cards',
      icon: GraduationCap,
      unlocked: vocabCompleted,
      gradient: 'from-amber-500 to-orange-600'
    },
    {
      id: 'sutra-starter',
      name: 'Sutra Seeker',
      description: 'Study your first sutra',
      icon: Star,
      unlocked: sutrasCompleted >= 1,
      gradient: 'from-yellow-500 to-amber-600'
    },
    {
      id: 'sutra-scholar',
      name: 'Sutra Scholar',
      description: 'Complete all 5 sutras',
      icon: Sparkles,
      unlocked: sutrasCompleted >= 5,
      gradient: 'from-teal-500 to-cyan-600'
    },
    {
      id: 'quiz-taker',
      name: 'Quiz Challenger',
      description: 'Complete your first quiz',
      icon: Target,
      unlocked: quizScore !== null,
      gradient: 'from-emerald-500 to-green-600'
    },
    {
      id: 'perfect-score',
      name: 'Perfect Mind',
      description: 'Score 100% on a quiz',
      icon: Award,
      unlocked: quizScore === 5,
      gradient: 'from-violet-500 to-purple-600'
    },
    {
      id: 'dedicated',
      name: 'Dedicated Learner',
      description: 'Complete vocabulary and sutras',
      icon: Flame,
      unlocked: vocabCompleted && sutrasCompleted >= 5,
      gradient: 'from-rose-500 to-pink-600'
    }
  ];

  const unlockedCount = badges.filter(b => b.unlocked).length;

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground">Achievements</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {unlockedCount} of {badges.length} badges unlocked
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-100 rounded-full">
          <Award className="w-4 h-4 text-amber-600" />
          <span className="font-bold text-amber-700">{unlockedCount}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={cn(
              "relative p-4 rounded-xl border-2 text-center transition-all duration-300",
              badge.unlocked 
                ? "bg-card border-border hover:shadow-md" 
                : "bg-muted/30 border-border/50 opacity-50 grayscale"
            )}
          >
            <div className={cn(
              "w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3 shadow-lg",
              badge.unlocked 
                ? `bg-gradient-to-br ${badge.gradient}` 
                : "bg-muted"
            )}>
              <badge.icon className={cn(
                "w-6 h-6",
                badge.unlocked ? "text-white" : "text-muted-foreground"
              )} />
            </div>
            <h4 className={cn(
              "font-semibold text-sm mb-1",
              badge.unlocked ? "text-foreground" : "text-muted-foreground"
            )}>
              {badge.name}
            </h4>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {badge.description}
            </p>
            {badge.unlocked && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center shadow-md">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
