import { Header } from '@/components/Header';
import { InteractiveQuiz } from '@/components/InteractiveQuiz';
import mandalaImage from '@/assets/mandala-pattern.jpg';

export function QuizScreen() {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-80 h-80 opacity-[0.04]">
          <img src={mandalaImage} alt="" className="w-full h-full object-cover rounded-full" />
        </div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 opacity-[0.04]">
          <img src={mandalaImage} alt="" className="w-full h-full object-cover rounded-full" />
        </div>
        {/* Subtle pattern */}
        <div className="absolute inset-0 section-pattern opacity-20" />
      </div>
      
      <Header showBack backTo="learning" />
      
      <main className="py-10 md:py-14 relative z-10">
        {/* Section header */}
        <div className="text-center mb-8 px-4">
          <span className="tag-gold mb-4 inline-block">Step 4 of 8</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
            Test Your Knowledge
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Answer questions to reinforce your understanding of the sutras
          </p>
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-primary/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
        </div>
        
        <InteractiveQuiz />
      </main>
    </div>
  );
}