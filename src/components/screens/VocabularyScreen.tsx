import { Header } from '@/components/Header';
import { VocabularyCards } from '@/components/VocabularyCards';

export function VocabularyScreen() {
  return (
    <div className="min-h-screen bg-gradient-warm">
      <Header showBack backTo="home" />
      
      <main className="py-8 md:py-12">
        <VocabularyCards />
      </main>
    </div>
  );
}
