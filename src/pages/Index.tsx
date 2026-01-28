import { useLearningStore } from '@/store/learningStore';
import { HomeScreen } from '@/components/screens/HomeScreen';
import { VocabularyScreen } from '@/components/screens/VocabularyScreen';
import { LearningScreen } from '@/components/screens/LearningScreen';
import { QuizScreen } from '@/components/screens/QuizScreen';
import { AnimatePresence, motion } from 'framer-motion';

const Index = () => {
  const { currentScreen } = useLearningStore();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'vocabulary':
        return <VocabularyScreen />;
      case 'learning':
        return <LearningScreen />;
      case 'quiz':
        return <QuizScreen />;
      case 'results':
        return <QuizScreen />; // Results are handled within QuizComponent
      default:
        return <HomeScreen />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentScreen}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderScreen()}
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
