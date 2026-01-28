import { Header } from '@/components/Header';
import { QuizComponent } from '@/components/QuizComponent';

export function QuizScreen() {
  return (
    <div className="min-h-screen bg-gradient-warm">
      <Header showBack backTo="learning" />
      
      <main className="py-8 md:py-12">
        <QuizComponent />
      </main>
    </div>
  );
}
