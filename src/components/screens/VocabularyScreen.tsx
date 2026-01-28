import { Header } from '@/components/Header';
import { VocabularyCards } from '@/components/VocabularyCards';
import mandalaImage from '@/assets/mandala-pattern.jpg';

interface VocabularyScreenProps {
  onOpenChatWithQuery?: (query: string) => void;
}

export function VocabularyScreen({ onOpenChatWithQuery }: VocabularyScreenProps) {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-80 h-80 opacity-[0.04]">
          <img src={mandalaImage} alt="" className="w-full h-full object-cover rounded-full" />
        </div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 opacity-[0.04]">
          <img src={mandalaImage} alt="" className="w-full h-full object-cover rounded-full" />
        </div>
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 section-pattern opacity-30" />
      </div>
      
      <Header showBack backTo="home" />
      
      <main className="py-10 md:py-16 relative z-10">
        {/* Section header */}
        <div className="text-center mb-10 px-4">
          <span className="tag-gold mb-4 inline-block">Step 2 of 8</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
            Master Key Vocabulary
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Learn the essential Sanskrit terms before diving into the sutras
          </p>
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-primary/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
        </div>
        
        <VocabularyCards onOpenChatWithQuery={onOpenChatWithQuery} />
      </main>
    </div>
  );
}