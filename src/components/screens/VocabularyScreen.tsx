import { Header } from '@/components/Header';
import { VocabularyCards } from '@/components/VocabularyCards';

export function VocabularyScreen() {
  return (
    <div className="min-h-screen bg-background">
      <Header showBack backTo="home" />
      
      <main className="py-10 md:py-14">
        <VocabularyCards />
      </main>
    </div>
  );
}
