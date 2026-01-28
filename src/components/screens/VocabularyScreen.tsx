import { Header } from '@/components/Header';
import { VocabularyCards } from '@/components/VocabularyCards';
import manuscriptImage from '@/assets/sanskrit-manuscript.jpg';

interface VocabularyScreenProps {
  onOpenChatWithQuery?: (query: string) => void;
}

export function VocabularyScreen({ onOpenChatWithQuery }: VocabularyScreenProps) {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-5">
        <div className="absolute top-1/4 right-0 w-96 h-96 transform rotate-12">
          <img src={manuscriptImage} alt="" className="w-full h-full object-cover" />
        </div>
      </div>
      
      <Header showBack backTo="home" />
      
      <main className="py-10 md:py-14 relative z-10">
        <VocabularyCards onOpenChatWithQuery={onOpenChatWithQuery} />
      </main>
    </div>
  );
}
