import { Header } from '@/components/Header';
import { QuizComponent } from '@/components/QuizComponent';

export function QuizScreen() {
  return (
    <div className="min-h-screen bg-background">
      <Header showBack backTo="learning" />
      
      <main className="py-10 md:py-14">
        <QuizComponent />
      </main>
    </div>
  );
}
