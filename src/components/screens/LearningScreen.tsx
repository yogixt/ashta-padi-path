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
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-0 w-72 h-72 opacity-[0.04]">
          <img src={mandalaImage} alt="" className="w-full h-full object-cover rounded-full" />
        </div>
        <div className="absolute top-20 right-0 w-56 h-56 opacity-[0.03]">
          <img src={mandalaImage} alt="" className="w-full h-full object-cover rounded-full" />
        </div>
        {/* Subtle pattern */}
        <div className="absolute inset-0 section-pattern opacity-20" />
      </div>
      
      <Header showBack backTo="vocabulary" />
      
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12 relative z-10">
        {/* Section header */}
        <div className="text-center mb-8">
          <span className="tag mb-3 inline-block">Step 3 of 8</span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
            Study the Sutras
          </h2>
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
        </div>
        
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
            Use <kbd className="px-2 py-1 bg-card border-2 border-border rounded text-[10px] font-mono mx-1 shadow-sm">←</kbd> 
            <kbd className="px-2 py-1 bg-card border-2 border-border rounded text-[10px] font-mono mx-1 shadow-sm">→</kbd> arrow keys to navigate
          </p>
        </div>
      </main>
    </div>
  );
}