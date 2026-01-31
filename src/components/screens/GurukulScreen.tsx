import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GuruOnboarding } from '@/components/gurukul/GuruOnboarding';
import { ScripturePillars } from '@/components/gurukul/ScripturePillars';
import { StudyModeSelection } from '@/components/gurukul/StudyModeSelection';
import { SadhanaDuration } from '@/components/gurukul/SadhanaDuration';
import { SadhanaPrompts } from '@/components/gurukul/SadhanaPrompts';
import { FooterWisdom } from '@/components/gurukul/FooterWisdom';
import { useLearningStore } from '@/store/learningStore';

export function GurukulScreen() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { setScreen } = useLearningStore();

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem('gurukul-onboarding-complete');
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
    }
    setIsLoaded(true);
  }, []);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  const handleStudyModeSelect = (mode: string) => {
    // For now, navigate to appropriate screen based on selection
    if (mode === 'gurukulavasa') {
      setScreen('mentor-selection');
    }
    // svadhyaya could lead to self-study content
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-manuscript" />
    );
  }

  return (
    <>
      {/* Guru Onboarding overlay */}
      <AnimatePresence>
        {showOnboarding && (
          <GuruOnboarding onComplete={handleOnboardingComplete} />
        )}
      </AnimatePresence>

      {/* Main Gurukul Experience */}
      <div className="min-h-screen bg-manuscript relative overflow-hidden">
        {/* Subtle parchment texture */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Vignette effect */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 50%, hsl(var(--sandalwood) / 0.2) 100%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Header with sacred title */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="pt-16 md:pt-24 pb-8 text-center px-6"
          >
            <h1 className="font-sanskrit text-4xl md:text-5xl text-earth mb-8">
              योगगुरुकुलम्
            </h1>
            
            <div className="max-w-md mx-auto">
              <p className="font-sanskrit text-base md:text-lg text-sandalwood-dark leading-relaxed">
                शिष्य, अत्र न पाठ्यक्रमः।
                <br />
                अत्र साधनामार्गः।
              </p>
            </div>
          </motion.header>

          {/* Daily Sādhana prompt */}
          <SadhanaPrompts />

          {/* Ornamental divider */}
          <div className="flex justify-center py-6">
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.5, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-sandalwood text-lg tracking-[0.3em]"
            >
              ॐ
            </motion.span>
          </div>

          {/* Main content - Scripture Pillars */}
          <main className="flex-1 px-6 md:px-12 py-8 max-w-2xl mx-auto w-full">
            <ScripturePillars />

            {/* Ornamental divider */}
            <div className="flex justify-center py-12 md:py-16">
              <span className="text-sandalwood text-xs tracking-[0.5em]">॰ ॰ ॰</span>
            </div>

            {/* Study Mode Selection */}
            <StudyModeSelection onSelect={handleStudyModeSelect} />

            {/* Sādhana Duration notice */}
            <SadhanaDuration />
          </main>

          {/* Footer Wisdom */}
          <FooterWisdom />
        </div>
      </div>
    </>
  );
}
