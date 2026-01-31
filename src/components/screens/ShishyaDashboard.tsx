import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { BookOpen, Target, Trophy, ArrowRight, Sparkles, GraduationCap, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useLearningStore } from '@/store/learningStore';
import { useAuth } from '@/contexts/AuthContext';
import { GuruDiscoveryCard } from '@/components/shishya/GuruDiscoveryCard';
import mandalaElegant from '@/assets/mandala-elegant.png';

const TOTAL_VOCAB_TERMS = 6;
const TOTAL_SUTRAS = 5;
const TOTAL_QUIZ_QUESTIONS = 5;

export function ShishyaDashboard() {
  const { 
    setScreen, 
    vocabCompleted, 
    sutrasCompleted, 
    quizScore, 
    quizAnswers,
    completedVocabTerms 
  } = useLearningStore();
  const { user } = useAuth();

  // Calculate real quiz percentage
  const totalQuizQuestions = Object.keys(quizAnswers).length || TOTAL_QUIZ_QUESTIONS;
  const quizPercentage = quizScore !== null 
    ? Math.round((quizScore / totalQuizQuestions) * 100) 
    : 0;

  // Calculate real overall progress based on actual completion
  const vocabProgress = (completedVocabTerms.size / TOTAL_VOCAB_TERMS) * 25; // 25% weight
  const sutrasProgress = (sutrasCompleted / TOTAL_SUTRAS) * 50; // 50% weight
  const quizProgress = quizScore !== null ? (quizScore / totalQuizQuestions) * 25 : 0; // 25% weight
  const totalProgress = Math.round(vocabProgress + sutrasProgress + quizProgress);

  const learningPath = [
    { 
      step: 1, 
      title: 'वृत्ति चयनम्', 
      subtitle: 'Profession Selection',
      status: 'completed',
      action: () => setScreen('home')
    },
    { 
      step: 2, 
      title: 'शब्दकोश', 
      subtitle: 'Vocabulary',
      status: vocabCompleted ? 'completed' : completedVocabTerms.size > 0 ? 'in-progress' : 'current',
      action: () => setScreen('vocabulary')
    },
    { 
      step: 3, 
      title: 'सूत्र अध्ययनम्', 
      subtitle: 'Sūtra Study',
      status: sutrasCompleted >= TOTAL_SUTRAS ? 'completed' : sutrasCompleted > 0 ? 'in-progress' : (vocabCompleted ? 'current' : 'locked'),
      action: () => setScreen('learning')
    },
    { 
      step: 4, 
      title: 'परीक्षा', 
      subtitle: 'Assessment',
      status: quizPercentage === 100 ? 'completed' : quizScore !== null ? 'in-progress' : (sutrasCompleted > 0 ? 'current' : 'locked'),
      action: () => setScreen('quiz')
    },
  ];

  const dailyGoals = [
    { label: 'Learn vocabulary terms', completed: completedVocabTerms.size, total: TOTAL_VOCAB_TERMS },
    { label: 'Study sūtras', completed: sutrasCompleted, total: TOTAL_SUTRAS },
    { label: 'Complete quiz with 100%', completed: quizPercentage === 100 ? 1 : 0, total: 1 },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background mandala */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.04 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
        >
          <img src={mandalaElegant} alt="" className="w-full h-full object-contain" />
        </motion.div>
      </div>

      <Header showBack backTo="home" />

      <main className="py-8 px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl font-sanskrit">शिष्य</span>
              <h1 className="text-3xl font-serif font-bold text-foreground">Śiṣya Dashboard</h1>
            </div>
            <p className="text-muted-foreground">
              विद्या ददाति विनयम् — Knowledge gives humility
            </p>
          </motion.div>

          {/* Quick Action - My Profile Only */}
          <div className="mb-8">
            <Button
              variant="outline"
              className="h-16 gap-3 w-full sm:w-auto"
              onClick={() => setScreen('student-profile')}
            >
              <User className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium">My Profile</p>
                <p className="text-xs text-muted-foreground">Edit details & interests</p>
              </div>
            </Button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card border border-border rounded-2xl p-4"
            >
              <BookOpen className="w-6 h-6 mb-2 text-primary" />
              <p className="text-2xl font-bold text-foreground">{sutrasCompleted}</p>
              <p className="text-sm text-muted-foreground">Sūtras Learned</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-card border border-border rounded-2xl p-4"
            >
              <Target className="w-6 h-6 mb-2 text-emerald-500" />
              <p className="text-2xl font-bold text-foreground">
                {quizScore !== null ? `${quizPercentage}%` : '—'}
              </p>
              <p className="text-sm text-muted-foreground">Quiz Score</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-4 text-primary-foreground"
            >
              <Trophy className="w-6 h-6 mb-2" />
              <p className="text-2xl font-bold">{totalProgress}%</p>
              <p className="text-sm opacity-90">Overall Progress</p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Learning Path */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 bg-card border border-border rounded-2xl p-6"
            >
              <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                Your Learning Path — अष्टपदी
              </h2>
              
              <div className="space-y-4">
                {learningPath.map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                      item.status === 'current' 
                        ? 'bg-primary/5 border-primary/30' 
                        : item.status === 'completed'
                        ? 'bg-emerald-50 border-emerald-200'
                        : 'bg-muted/30 border-border opacity-60'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      item.status === 'completed'
                        ? 'bg-emerald-500 text-white'
                        : item.status === 'current'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {item.status === 'completed' ? '✓' : item.step}
                    </div>
                    
                    <div className="flex-1">
                      <p className="font-semibold text-foreground font-sanskrit">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                    </div>
                    
                    {item.status !== 'locked' && (
                      <Button 
                        variant={item.status === 'current' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={item.action}
                        className="gap-1"
                      >
                        {item.status === 'current' ? 'Continue' : 'Review'}
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Daily Goals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-card border border-border rounded-2xl p-6"
            >
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                Daily Goals
              </h2>
              
              <div className="space-y-5">
                {dailyGoals.map((goal, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-foreground">{goal.label}</span>
                      <span className="text-muted-foreground">{goal.completed}/{goal.total}</span>
                    </div>
                    <Progress value={(goal.completed / goal.total) * 100} className="h-2" />
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/20">
                <p className="text-sm text-foreground font-medium mb-1">Today's Sūtra</p>
                <p className="text-lg font-sanskrit text-primary">
                  योगश्चित्तवृत्तिनिरोधः
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Yoga is the cessation of mind fluctuations
                </p>
              </div>
            </motion.div>

            {/* Guru Discovery Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="lg:col-span-3"
            >
              <GuruDiscoveryCard />
            </motion.div>
          </div>

          {/* Continue Learning CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {vocabCompleted ? 'Continue Your Journey' : 'Start with Vocabulary'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {vocabCompleted 
                    ? "You're studying Samādhi Pāda - the chapter on concentration"
                    : 'Master key Sanskrit terms before diving into the sūtras'
                  }
                </p>
              </div>
              <Button 
                onClick={() => setScreen(vocabCompleted ? 'learning' : 'vocabulary')}
                className="bg-primary hover:bg-primary/90 gap-2"
              >
                {vocabCompleted ? 'Continue Learning' : 'Start Vocabulary'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
