import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ChevronLeft, ChevronRight, RotateCcw, Home, Trophy, Target, Zap, Clock } from 'lucide-react';
import { quizQuestions } from '@/data/yogaSutrasData';
import { useLearningStore } from '@/store/learningStore';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

export function InteractiveQuiz() {
  const { 
    quizAnswers, 
    quizScore, 
    setQuizAnswer, 
    calculateScore,
    resetQuiz,
    setScreen
  } = useLearningStore();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [bestStreak, setBestStreak] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);

  const question = quizQuestions[currentQuestion];
  const selectedAnswer = quizAnswers[question.id];
  const isCorrect = selectedAnswer === question.correctAnswer;
  const totalQuestions = quizQuestions.length;

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#c4632a', '#d4a574', '#8b5a2b']
    });
  };

  const handleAnswer = (answerIndex: number) => {
    if (showFeedback) return;
    setQuizAnswer(question.id, answerIndex);
    setShowFeedback(true);

    const correct = answerIndex === question.correctAnswer;
    if (correct) {
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      if (newStreak > bestStreak) {
        setBestStreak(newStreak);
      }
      if (newStreak >= 3) {
        triggerConfetti();
      }
    } else {
      setCurrentStreak(0);
    }
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setShowFeedback(false);
      setCurrentQuestion(prev => prev + 1);
    } else {
      const correctAnswers: Record<number, number> = {};
      quizQuestions.forEach(q => {
        correctAnswers[q.id] = q.correctAnswer;
      });
      calculateScore(correctAnswers);
      setIsComplete(true);
      
      // Celebration for good scores
      setTimeout(() => {
        const score = Object.entries(correctAnswers).filter(
          ([id]) => quizAnswers[parseInt(id)] === correctAnswers[parseInt(id)]
        ).length;
        if (score >= 7) {
          triggerConfetti();
        }
      }, 500);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setShowFeedback(false);
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleRetake = () => {
    resetQuiz();
    setCurrentQuestion(0);
    setShowFeedback(false);
    setIsComplete(false);
    setCurrentStreak(0);
    setBestStreak(0);
  };

  const handleBackToHome = () => {
    setScreen('home');
  };

  // Calculate progress percentage
  const progressPercent = ((currentQuestion) / totalQuestions) * 100;

  // Results screen
  if (isComplete && quizScore !== null) {
    const percentage = Math.round((quizScore / totalQuestions) * 100);
    const getMessage = () => {
      if (percentage >= 90) return { text: "Outstanding", subtext: "You have truly mastered the material", badge: "Master Scholar" };
      if (percentage >= 70) return { text: "Excellent Progress", subtext: "Your understanding is impressive", badge: "Advanced Learner" };
      if (percentage >= 50) return { text: "Good Foundation", subtext: "Keep building your knowledge", badge: "Dedicated Student" };
      return { text: "Keep Learning", subtext: "Practice makes perfect", badge: "Aspiring Scholar" };
    };
    const message = getMessage();

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg mx-auto px-4"
      >
        <div className="card-elevated rounded-2xl p-8 md:p-10 text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent rounded-full blur-3xl" />
          </div>
          
          <div className="relative z-10">
            {/* Achievement badge */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center"
            >
              <Trophy className="w-10 h-10 text-primary-foreground" />
            </motion.div>

            <span className="inline-block px-3 py-1 bg-accent/20 text-foreground rounded-full text-xs font-semibold mb-4">
              {message.badge}
            </span>
            
            {/* Score circle */}
            <div className="relative w-36 h-36 mx-auto mb-6">
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
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-4xl font-bold text-foreground"
                >
                  {percentage}%
                </motion.span>
                <span className="text-sm text-muted-foreground">{quizScore}/{totalQuestions} correct</span>
              </div>
            </div>
            
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-2">
              {message.text}
            </h2>
            
            <p className="text-muted-foreground mb-8">
              {message.subtext}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-3 bg-muted/50 rounded-xl">
                <Target className="w-5 h-5 text-primary mx-auto mb-1" />
                <p className="text-lg font-bold text-foreground">{quizScore}</p>
                <p className="text-xs text-muted-foreground">Correct</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-xl">
                <Zap className="w-5 h-5 text-primary mx-auto mb-1" />
                <p className="text-lg font-bold text-foreground">{bestStreak}</p>
                <p className="text-xs text-muted-foreground">Best Streak</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-xl">
                <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
                <p className="text-lg font-bold text-foreground">{totalQuestions}</p>
                <p className="text-xs text-muted-foreground">Attempted</p>
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
              <Button
                onClick={handleBackToHome}
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Home className="w-4 h-4" />
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <p className="text-muted-foreground mb-6">
          Test your understanding of vocabulary and grammar
        </p>
        
        {/* Question counter */}
        <p className="text-foreground font-medium mb-4">
          Question {currentQuestion + 1} of {totalQuestions}
        </p>
        
        {/* Progress bar */}
        <div className="max-w-md mx-auto h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ 
              background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary)/0.7))'
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="card-elevated rounded-2xl p-8 md:p-10"
        >
          {/* Question text */}
          <h3 className="text-xl md:text-2xl font-semibold text-primary text-center mb-8">
            {question.question}
          </h3>

          {/* Options */}
          <div className="space-y-4">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectOption = index === question.correctAnswer;
              
              return (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showFeedback}
                  whileHover={!showFeedback ? { scale: 1.01 } : {}}
                  whileTap={!showFeedback ? { scale: 0.99 } : {}}
                  className={cn(
                    "w-full p-5 rounded-xl text-center border-2 transition-all duration-200",
                    "flex items-center justify-center gap-3",
                    showFeedback 
                      ? isCorrectOption 
                        ? "bg-green-50 border-green-400 dark:bg-green-900/20" 
                        : isSelected && !isCorrectOption
                          ? "bg-red-50 border-red-300 dark:bg-red-900/20"
                          : "bg-muted/30 border-border/50"
                      : isSelected 
                        ? "bg-primary/10 border-primary"
                        : "bg-muted/20 border-border hover:bg-muted/40 hover:border-primary/30",
                    showFeedback ? "cursor-default" : "cursor-pointer"
                  )}
                >
                  <span className="font-medium text-foreground text-base md:text-lg">
                    {option}
                  </span>
                  
                  {showFeedback && isCorrectOption && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0"
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                  {showFeedback && isSelected && !isCorrectOption && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center shrink-0"
                    >
                      <X className="w-4 h-4 text-white" />
                    </motion.div>
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
                className={cn(
                  "mt-6 p-5 rounded-xl border-l-4",
                  isCorrect 
                    ? "bg-green-50 border-green-500 dark:bg-green-900/10" 
                    : "bg-muted/50 border-muted-foreground/30"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                    isCorrect ? "bg-green-100 dark:bg-green-900/30" : "bg-muted"
                  )}>
                    {isCorrect ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <X className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">
                      {isCorrect ? 'Excellent!' : 'Not quite right'}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {question.explanation}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex gap-4 mt-8"
      >
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="flex-1 h-14 text-base gap-2 rounded-xl border-2"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </Button>

        <Button
          onClick={handleNext}
          disabled={!showFeedback}
          className={cn(
            "flex-1 h-14 text-base gap-2 rounded-xl",
            showFeedback 
              ? "bg-primary hover:bg-primary/90 text-primary-foreground" 
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
        >
          {currentQuestion < totalQuestions - 1 ? 'Next' : 'View Results'}
          <ChevronRight className="w-5 h-5" />
        </Button>
      </motion.div>

      {/* Streak indicator */}
      {currentStreak > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{currentStreak} correct in a row!</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
