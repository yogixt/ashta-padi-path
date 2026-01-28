import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';
import { useLearningStore, Screen } from '@/store/learningStore';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  showBack?: boolean;
  backTo?: Screen;
}

export function Header({ showBack = false, backTo = 'home' }: HeaderProps) {
  const { setScreen, resetProgress } = useLearningStore();

  const handleBack = () => {
    setScreen(backTo);
  };

  const handleHome = () => {
    resetProgress();
    setScreen('home');
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full py-4 px-4 md:px-6 border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-4">
          {showBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>
          )}
          
          {/* Logo */}
          <button
            onClick={handleHome}
            className="flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-sanskrit text-lg font-bold">
              अ
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                Ashta Padi
              </h1>
              <p className="text-xs text-muted-foreground font-sanskrit -mt-0.5">
                अष्टपदी
              </p>
            </div>
          </button>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleHome}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
