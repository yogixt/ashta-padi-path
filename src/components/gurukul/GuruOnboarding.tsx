import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GuruOnboardingProps {
  onComplete: () => void;
}

const onboardingScreens = [
  {
    text: 'शिष्य, आगतः असि।\nन जिज्ञासया केवलम् — श्रद्धया।',
  },
  {
    text: 'योगः न शीघ्रफलाय।\nयोगः जीवनपरिवर्तनाय।',
  },
  {
    text: 'ग्रन्थाः न उपदेशाः।\nते दर्पणाः।',
  },
  {
    text: 'यदा त्वं सिद्धः,\nमार्गः स्वयमेव प्रकाशते।',
  },
  {
    text: 'अधुना उपविश।\nश्वासं पश्य।\nअत्र एव आरम्भः।',
    isFinal: true,
  },
];

export function GuruOnboarding({ onComplete }: GuruOnboardingProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleContinue = () => {
    if (currentIndex < onboardingScreens.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Mark onboarding as complete in localStorage
      localStorage.setItem('gurukul-onboarding-complete', 'true');
      onComplete();
    }
  };

  const currentScreen = onboardingScreens[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-manuscript cursor-pointer"
      onClick={handleContinue}
    >
      {/* Subtle parchment texture overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-10 max-w-xl px-8 text-center"
        >
          <p className="font-sanskrit text-2xl md:text-3xl leading-relaxed text-sacred-ink whitespace-pre-line">
            {currentScreen.text}
          </p>

          {/* Subtle continue indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 2, duration: 1 }}
            className="mt-16"
          >
            <span className="text-sandalwood-dark text-sm tracking-widest">
              {currentScreen.isFinal ? 'आरम्भः' : '॰ ॰ ॰'}
            </span>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Progress dots - minimal */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
        {onboardingScreens.map((_, idx) => (
          <div
            key={idx}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
              idx === currentIndex ? 'bg-ochre' : 'bg-sandalwood/50'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
