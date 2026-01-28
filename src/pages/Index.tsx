import { useState } from 'react';
import { useLearningStore } from '@/store/learningStore';
import { HomeScreen } from '@/components/screens/HomeScreen';
import { VocabularyScreen } from '@/components/screens/VocabularyScreen';
import { LearningScreen } from '@/components/screens/LearningScreen';
import { QuizScreen } from '@/components/screens/QuizScreen';
import { SanskritChatbot } from '@/components/SanskritChatbot';
import { AnimatePresence, motion } from 'framer-motion';

const Index = () => {
  const { currentScreen } = useLearningStore();
  const [chatQuery, setChatQuery] = useState<string | undefined>();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleOpenChatWithQuery = (query: string) => {
    setChatQuery(query);
    setIsChatOpen(true);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'vocabulary':
        return <VocabularyScreen onOpenChatWithQuery={handleOpenChatWithQuery} />;
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
    <>
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
      
      {/* Floating Chatbot */}
      <SanskritChatbot 
        initialQuery={chatQuery}
        isOpenExternal={isChatOpen}
        onClose={() => {
          setIsChatOpen(false);
          setChatQuery(undefined);
        }}
      />
    </>
  );
};

export default Index;
