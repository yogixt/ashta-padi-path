import { Header } from '@/components/Header';
import { InteractiveQuiz } from '@/components/InteractiveQuiz';
import mandalaImage from '@/assets/mandala-pattern.jpg';

export function QuizScreen() {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 opacity-5">
          <img src={mandalaImage} alt="" className="w-full h-full object-cover rounded-full" />
        </div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 opacity-5">
          <img src={mandalaImage} alt="" className="w-full h-full object-cover rounded-full" />
        </div>
      </div>
      
      <Header showBack backTo="learning" />
      
      <main className="py-10 md:py-14 relative z-10">
        <InteractiveQuiz />
      </main>
    </div>
  );
}
