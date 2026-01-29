import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLearningStore, Screen } from '@/store/learningStore';
import { useAuth } from '@/contexts/AuthContext';
import { HomeScreen } from '@/components/screens/HomeScreen';
import { VocabularyScreen } from '@/components/screens/VocabularyScreen';
import { LearningScreen } from '@/components/screens/LearningScreen';
import { QuizScreen } from '@/components/screens/QuizScreen';
import { AnalyticsScreen } from '@/components/screens/AnalyticsScreen';
import { GuruDashboard } from '@/components/screens/GuruDashboard';
import { ShishyaDashboard } from '@/components/screens/ShishyaDashboard';
import { TeacherProfileScreen } from '@/components/screens/TeacherProfileScreen';
import { StudentProfileScreen } from '@/components/screens/StudentProfileScreen';
import { MentorSelectionScreen } from '@/components/screens/MentorSelectionScreen';
import { SanskritChatbot } from '@/components/SanskritChatbot';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const Index = () => {
  const { currentScreen, setScreen, selectedProfession } = useLearningStore();
  const { user, loading, role } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [chatQuery, setChatQuery] = useState<string | undefined>();
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Handle screen parameter from URL (used after login redirect)
  useEffect(() => {
    const screenParam = searchParams.get('screen') as Screen | null;
    if (screenParam && ['guru-dashboard', 'shishya-dashboard'].includes(screenParam)) {
      setScreen(screenParam);
      // Clear the URL parameter
      setSearchParams({});
    }
  }, [searchParams, setScreen, setSearchParams]);

  // Handle post-auth redirect to vocabulary
  useEffect(() => {
    const redirect = sessionStorage.getItem('postAuthRedirect');
    if (redirect === 'vocabulary' && user && selectedProfession) {
      sessionStorage.removeItem('postAuthRedirect');
      setScreen('vocabulary');
    }
  }, [user, selectedProfession, setScreen]);

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
      case 'analytics':
        return <AnalyticsScreen />;
      case 'guru-dashboard':
        return <GuruDashboard />;
      case 'shishya-dashboard':
        return <ShishyaDashboard />;
      case 'teacher-profile':
        return <TeacherProfileScreen />;
      case 'student-profile':
        return <StudentProfileScreen />;
      case 'mentor-selection':
        return <MentorSelectionScreen />;
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
