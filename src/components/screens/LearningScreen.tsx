import { useEffect } from 'react';
import { Header } from '@/components/Header';
import { SutraPanel } from '@/components/SutraPanel';
import { GrammarSidebar } from '@/components/GrammarSidebar';
import { ProgressTracker } from '@/components/ProgressTracker';
import { useLearningStore } from '@/store/learningStore';

export function LearningScreen() {
  const { nextSutra, prevSutra } = useLearningStore();

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextSutra();
      } else if (e.key === 'ArrowLeft') {
        prevSutra();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSutra, prevSutra]);

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Header showBack backTo="vocabulary" />
      
      <main className="max-w-7xl mx-auto px-4 py-6 md:py-10">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main content */}
          <SutraPanel />
          
          {/* Sidebar */}
          <div className="space-y-6">
            <GrammarSidebar />
            
            {/* Progress on larger screens */}
            <div className="hidden lg:block">
              <ProgressTracker />
            </div>
          </div>
        </div>
        
        {/* Mobile progress */}
        <div className="lg:hidden mt-8">
          <ProgressTracker />
        </div>

        {/* Keyboard hint */}
        <div className="hidden md:block text-center mt-8">
          <p className="text-xs text-muted-foreground">
            💡 Use <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">←</kbd> 
            <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] ml-1">→</kbd> arrow keys to navigate sutras
          </p>
        </div>
      </main>
    </div>
  );
}
