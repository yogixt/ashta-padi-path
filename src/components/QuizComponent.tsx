import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ChevronRight, RotateCcw, Home, GraduationCap, BookOpen, Target, Sparkles, Clock, Award } from 'lucide-react';
import { quizQuestions } from '@/data/yogaSutrasData';
import { useLearningStore } from '@/store/learningStore';
import { Button } from '@/components/ui/button';
import { useActivityTracking } from '@/hooks/useActivityTracking';

export function QuizComponent() {
  const { 
    quizAnswers, 
    quizScore, 
    setQuizAnswer, 
    calculateScore,
    resetQuiz,
    setScreen
  } = useLearningStore();
  
  const { logActivity } = useActivityTracking();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const question = quizQuestions[currentQuestion];
  const selectedAnswer = quizAnswers[question.id];
  const isCorrect = selectedAnswer === question.correctAnswer;
  const totalQuestions = quizQuestions.length;

  const handleAnswer = (answerIndex: number) => {
    if (showFeedback) return;
    setQuizAnswer(question.id, answerIndex);
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      const correctAnswers: Record<number, number> = {};
      quizQuestions.forEach(q => {
        correctAnswers[q.id] = q.correctAnswer;
      });
      calculateScore(correctAnswers);
      setIsComplete(true);
      // Log quiz completion activity
      logActivity('quiz');
    }
  };

  const handleRetake = () => {
    resetQuiz();
    setCurrentQuestion(0);
    setShowFeedback(false);
    setIsComplete(false);
  };

  const handleBackToHome = () => {
    setScreen('home');
  };

  const handleProceedToMentor = () => {
    setScreen('mentor-selection');
  };

  const handleReviewContent = () => {
    setScreen('learning');
  };

  // Results screen
  if (isComplete && quizScore !== null) {
    const percentage = Math.round((quizScore / totalQuestions) * 100);
    const hasPassed = percentage === 100;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl mx-auto px-4"
      >
        <div className="card-elevated rounded-2xl p-8 md:p-10 text-center">
          {/* Master Scholar Badge - only on 100% */}
          {hasPassed && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary mb-6"
            >
              <Award className="w-4 h-4" />
              <span className="text-sm font-medium">Master Scholar</span>
            </motion.div>
          )}

          {/* Score circle */}
          <div className="relative w-40 h-40 mx-auto mb-6">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="6"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={264}
                initial={{ strokeDashoffset: 264 }}
                animate={{ strokeDashoffset: 264 - (percentage / 100) * 264 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-foreground">{percentage}%</span>
              <span className="text-sm text-muted-foreground">{quizScore}/{totalQuestions} correct</span>
            </div>
          </div>
          
          {/* Message */}
          <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
            {hasPassed ? 'Outstanding!' : percentage >= 80 ? 'Almost There!' : 'Keep Practicing'}
          </h2>
          
          <p className="text-muted-foreground mb-8">
            {hasPassed 
              ? 'You have truly mastered the Yoga Sutras' 
              : 'You need 100% to unlock Guru selection'
            }
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="bg-muted/30 rounded-xl p-4 border border-border">
              <Target className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-xl font-bold text-foreground">{quizScore}</p>
              <p className="text-xs text-muted-foreground">Correct</p>
            </div>
            <div className="bg-muted/30 rounded-xl p-4 border border-border">
              <Sparkles className="w-5 h-5 text-amber-500 mx-auto mb-2" />
              <p className="text-xl font-bold text-foreground">{quizScore}</p>
              <p className="text-xs text-muted-foreground">Best Streak</p>
            </div>
            <div className="bg-muted/30 rounded-xl p-4 border border-border">
              <Clock className="w-5 h-5 text-muted-foreground mx-auto mb-2" />
              <p className="text-xl font-bold text-foreground">{totalQuestions}</p>
              <p className="text-xs text-muted-foreground">Questions</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="outline"
              onClick={handleRetake}
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Retake Quiz
            </Button>
            {hasPassed ? (
              <Button
                onClick={handleProceedToMentor}
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <GraduationCap className="w-4 h-4" />
                Choose Guru
              </Button>
            ) : (
              <Button
                onClick={handleBackToHome}
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Home className="w-4 h-4" />
                Back to Home
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <span className="tag mb-4 inline-block">
          {question.type === 'vocabulary' ? 'Vocabulary' : 'Grammar'}
        </span>
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-4">
          Practice Quiz
        </h2>
        
        {/* Progress */}
        <div className="flex gap-1 max-w-md mx-auto">
          {quizQuestions.map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                index < currentQuestion 
                  ? 'bg-primary' 
                  : index === currentQuestion 
                    ? 'bg-primary/40' 
                    : 'bg-border'
              }`}
            />
          ))}
        </div>
      </motion.div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
          className="card-elevated rounded-2xl p-6 md:p-8"
        >
          {/* Question number */}
          <p className="text-sm text-muted-foreground mb-4 font-medium">
            Question {currentQuestion + 1} of {totalQuestions}
          </p>

          {/* Question text */}
          <h3 className="text-xl font-semibold text-foreground mb-6">
            {question.question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectOption = index === question.correctAnswer;
              
              let optionClass = 'bg-background hover:bg-muted/30 border-border';
              if (showFeedback) {
                if (isCorrectOption) {
                  optionClass = 'bg-sage/10 border-sage/50';
                } else if (isSelected && !isCorrectOption) {
                  optionClass = 'bg-destructive/5 border-destructive/30';
                }
              } else if (isSelected) {
                optionClass = 'bg-primary/5 border-primary/40';
              }

              return (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showFeedback}
                  whileHover={!showFeedback ? { scale: 1.01 } : {}}
                  whileTap={!showFeedback ? { scale: 0.99 } : {}}
                  className={`
                    w-full p-4 rounded-xl text-left border-2 transition-all duration-200
                    flex items-center justify-between
                    ${optionClass}
                    ${showFeedback ? 'cursor-default' : 'cursor-pointer'}
                  `}
                >
                  <span className="font-medium text-foreground">{option}</span>
                  
                  {showFeedback && isCorrectOption && (
                    <div className="w-6 h-6 rounded-full bg-sage/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-sage" />
                    </div>
                  )}
                  {showFeedback && isSelected && !isCorrectOption && (
                    <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center">
                      <X className="w-4 h-4 text-destructive" />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`
                  mt-6 p-4 rounded-xl border-l-2
                  ${isCorrect 
                    ? 'bg-sage/5 border-sage' 
                    : 'bg-muted/50 border-muted-foreground/30'
                  }
                `}
              >
                <p className="font-semibold text-foreground mb-1 text-sm">
                  {isCorrect ? 'Correct' : 'Incorrect'}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {question.explanation}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Next button */}
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 flex justify-end"
            >
              <Button
                onClick={handleNext}
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {currentQuestion < totalQuestions - 1 ? 'Next Question' : 'View Results'}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
