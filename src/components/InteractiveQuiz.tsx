import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ChevronRight, RotateCcw, Home, Trophy, Target, Zap, Clock } from 'lucide-react';
import { quizQuestions } from '@/data/yogaSutrasData';
import { useLearningStore } from '@/store/learningStore';
import { Button } from '@/components/ui/button';
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
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [showHint, setShowHint] = useState(false);

  const question = quizQuestions[currentQuestion];
  const selectedAnswer = quizAnswers[question.id];
  const isCorrect = selectedAnswer === question.correctAnswer;
  const totalQuestions = quizQuestions.length;

  // Timer effect
  useEffect(() => {
    if (!isTimerActive || showFeedback || isComplete) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Time's up - auto-select wrong answer
          handleAnswer(-1);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerActive, showFeedback, isComplete, currentQuestion]);

  // Reset timer on new question
  useEffect(() => {
    setTimeLeft(30);
    setShowHint(false);
  }, [currentQuestion]);

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
    setIsTimerActive(false);

    const correct = answerIndex === question.correctAnswer;
    if (correct) {
      setStreak(prev => prev + 1);
      if (streak >= 2) {
        triggerConfetti();
      }
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    setShowFeedback(false);
    setIsTimerActive(true);
    
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      const correctAnswers: Record<number, number> = {};
      quizQuestions.forEach(q => {
        correctAnswers[q.id] = q.correctAnswer;
      });
      calculateScore(correctAnswers);
      setIsComplete(true);
      
      // Big celebration for good scores
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

  const handleRetake = () => {
    resetQuiz();
    setCurrentQuestion(0);
    setShowFeedback(false);
    setIsComplete(false);
    setStreak(0);
    setTimeLeft(30);
    setIsTimerActive(true);
  };

  const handleBackToHome = () => {
    setScreen('home');
  };

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
          <div className="absolute inset-0 opacity-5">
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

            <span className="inline-block px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-semibold mb-4">
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
                <Zap className="w-5 h-5 text-accent mx-auto mb-1" />
                <p className="text-lg font-bold text-foreground">{streak}</p>
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

  const timerColor = timeLeft > 20 ? 'text-sage' : timeLeft > 10 ? 'text-accent' : 'text-destructive';

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* Header with timer and streak */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="tag">
            {question.type === 'vocabulary' ? 'Vocabulary' : 'Grammar'}
          </span>
          
          <div className="flex items-center gap-4">
            {/* Streak indicator */}
            {streak > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1 px-3 py-1 bg-accent/20 rounded-full"
              >
                <Zap className="w-4 h-4 text-accent" />
                <span className="text-sm font-bold text-accent">{streak}</span>
              </motion.div>
            )}
            
            {/* Timer */}
            <div className={`flex items-center gap-1 font-mono text-lg font-bold ${timerColor}`}>
              <Clock className="w-4 h-4" />
              {timeLeft}s
            </div>
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground text-center mb-4">
          Practice Quiz
        </h2>
        
        {/* Progress bar */}
        <div className="flex gap-1 max-w-md mx-auto">
          {quizQuestions.map((q, index) => {
            const answered = quizAnswers[q.id] !== undefined;
            const wasCorrect = answered && quizAnswers[q.id] === q.correctAnswer;
            
            return (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                  index < currentQuestion 
                    ? wasCorrect ? 'bg-sage' : 'bg-destructive/50'
                    : index === currentQuestion 
                      ? 'bg-primary/40' 
                      : 'bg-border'
                }`}
              />
            );
          })}
        </div>
      </motion.div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="card-elevated rounded-2xl p-6 md:p-8 relative overflow-hidden"
        >
          {/* Timer bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-muted overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: '100%' }}
              animate={{ width: `${(timeLeft / 30) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Question number */}
          <p className="text-sm text-muted-foreground mb-4 font-medium pt-2">
            Question {currentQuestion + 1} of {totalQuestions}
          </p>

          {/* Question text */}
          <h3 className="text-xl font-semibold text-foreground mb-6">
            {question.question}
          </h3>

          {/* Hint button */}
          {!showFeedback && !showHint && (
            <button
              onClick={() => setShowHint(true)}
              className="text-sm text-primary hover:underline mb-4"
            >
              Need a hint?
            </button>
          )}

          {showHint && !showFeedback && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-4 p-3 bg-primary/5 rounded-lg border border-primary/20"
            >
              <p className="text-sm text-muted-foreground">
                Think about the Sanskrit root and its core meaning...
              </p>
            </motion.div>
          )}

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectOption = index === question.correctAnswer;
              
              let optionClass = 'bg-background hover:bg-muted/50 border-border';
              let iconClass = '';
              
              if (showFeedback) {
                if (isCorrectOption) {
                  optionClass = 'bg-sage/10 border-sage/50 ring-2 ring-sage/30';
                  iconClass = 'bg-sage/20';
                } else if (isSelected && !isCorrectOption) {
                  optionClass = 'bg-destructive/5 border-destructive/30';
                  iconClass = 'bg-destructive/10';
                }
              } else if (isSelected) {
                optionClass = 'bg-primary/5 border-primary/40 ring-2 ring-primary/20';
              }

              return (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showFeedback}
                  whileHover={!showFeedback ? { scale: 1.01, x: 4 } : {}}
                  whileTap={!showFeedback ? { scale: 0.99 } : {}}
                  className={`
                    w-full p-4 rounded-xl text-left border-2 transition-all duration-200
                    flex items-center justify-between gap-4
                    ${optionClass}
                    ${showFeedback ? 'cursor-default' : 'cursor-pointer'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-sm font-semibold text-muted-foreground">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="font-medium text-foreground">{option}</span>
                  </div>
                  
                  {showFeedback && isCorrectOption && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${iconClass}`}
                    >
                      <Check className="w-5 h-5 text-sage" />
                    </motion.div>
                  )}
                  {showFeedback && isSelected && !isCorrectOption && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${iconClass}`}
                    >
                      <X className="w-5 h-5 text-destructive" />
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
                className={`
                  mt-6 p-5 rounded-xl border-l-4
                  ${isCorrect 
                    ? 'bg-sage/5 border-sage' 
                    : 'bg-muted/50 border-muted-foreground/30'
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    isCorrect ? 'bg-sage/20' : 'bg-muted'
                  }`}>
                    {isCorrect ? (
                      <Check className="w-4 h-4 text-sage" />
                    ) : (
                      <X className="w-4 h-4 text-destructive" />
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
