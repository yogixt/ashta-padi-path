import { useEffect } from 'react';
import { Header } from '@/components/Header';
import { SutraPanel } from '@/components/SutraPanel';
import { GrammarSidebar } from '@/components/GrammarSidebar';
import { ProgressTracker } from '@/components/ProgressTracker';
import { useLearningStore } from '@/store/learningStore';
import mandalaImage from '@/assets/mandala-pattern.jpg';

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
    <div className="min-h-screen bg-background relative">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-0 w-64 h-64 opacity-5">
          <img src={mandalaImage} alt="" className="w-full h-full object-cover" />
        </div>
      </div>
      
      <Header showBack backTo="vocabulary" />
      
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
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
        <div className="hidden md:block text-center mt-10">
          <p className="text-xs text-muted-foreground">
            Use <kbd className="px-1.5 py-0.5 bg-muted border border-border rounded text-[10px] font-mono mx-1">←</kbd> 
            <kbd className="px-1.5 py-0.5 bg-muted border border-border rounded text-[10px] font-mono mx-1">→</kbd> arrow keys to navigate
          </p>
        </div>
      </main>
    </div>
  );
}
