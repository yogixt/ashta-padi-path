import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ChevronLeft, ChevronRight, RotateCcw, Home, Trophy, Target, Zap, Clock, Award, Sparkles } from 'lucide-react';
import { quizQuestions } from '@/data/yogaSutrasData';
import { useLearningStore } from '@/store/learningStore';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

const optionLabels = ['A', 'B', 'C', 'D'];

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
      colors: ['#b45309', '#d97706', '#ca8a04', '#a16207']
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
  const progressPercent = ((currentQuestion + 1) / totalQuestions) * 100;

  // Results screen
  if (isComplete && quizScore !== null) {
    const percentage = Math.round((quizScore / totalQuestions) * 100);
    const getMessage = () => {
      if (percentage >= 90) return { text: "Outstanding!", subtext: "You have truly mastered the Yoga Sutras", badge: "Master Scholar" };
      if (percentage >= 70) return { text: "Excellent Progress!", subtext: "Your understanding is impressive", badge: "Advanced Learner" };
      if (percentage >= 50) return { text: "Good Foundation!", subtext: "Keep building your knowledge", badge: "Dedicated Student" };
      return { text: "Keep Learning!", subtext: "Practice makes perfect", badge: "Aspiring Scholar" };
    };
    const message = getMessage();

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg mx-auto px-4"
      >
        <div className="card-traditional rounded-xl overflow-hidden">
          {/* Top accent */}
          <div className="h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />
          
          <div className="p-8 md:p-10 text-center bg-card relative overflow-hidden">
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
                className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center shadow-xl animate-glow"
                style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))' }}
              >
                <Trophy className="w-12 h-12 text-primary-foreground" />
              </motion.div>

              <span className="inline-flex items-center gap-2 tag-gold mb-4">
                <Award className="w-4 h-4" />
                {message.badge}
              </span>
              
              {/* Score circle */}
              <div className="relative w-44 h-44 mx-auto mb-6">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="6"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="url(#scoreGradient)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={264}
                    initial={{ strokeDashoffset: 264 }}
                    animate={{ strokeDashoffset: 264 - (percentage / 100) * 264 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" />
                      <stop offset="100%" stopColor="hsl(var(--accent))" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-4xl font-serif font-bold text-foreground"
                  >
                    {percentage}%
                  </motion.span>
                  <span className="text-sm text-muted-foreground">{quizScore}/{totalQuestions} correct</span>
                </div>
              </div>
              
              <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
                {message.text}
              </h2>
              
              <p className="text-muted-foreground mb-8">
                {message.subtext}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="p-4 bg-muted/30 rounded-xl border-2 border-border">
                  <Target className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-xl font-serif font-bold text-foreground">{quizScore}</p>
                  <p className="text-xs text-muted-foreground">Correct</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl border-2 border-border">
                  <Zap className="w-5 h-5 text-accent mx-auto mb-2" />
                  <p className="text-xl font-serif font-bold text-foreground">{bestStreak}</p>
                  <p className="text-xs text-muted-foreground">Best Streak</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl border-2 border-border">
                  <Clock className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-xl font-serif font-bold text-foreground">{totalQuestions}</p>
                  <p className="text-xs text-muted-foreground">Questions</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={handleRetake}
                  className="gap-2 h-12 px-6 rounded-xl border-2 font-semibold"
                >
                  <RotateCcw className="w-4 h-4" />
                  Retake Quiz
                </Button>
                <Button
                  onClick={handleBackToHome}
                  className="gap-2 h-12 px-6 rounded-xl btn-primary"
                >
                  <Home className="w-4 h-4" />
                  Back to Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* Header with progress */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        {/* Progress info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center border-2 border-primary/20">
              <span className="text-primary font-serif font-bold">{currentQuestion + 1}</span>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Question</p>
              <p className="text-foreground font-semibold">{currentQuestion + 1} of {totalQuestions}</p>
            </div>
          </div>
          
          {/* Streak badge */}
          {currentStreak > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full border-2"
              style={{ 
                background: 'linear-gradient(135deg, hsl(var(--accent) / 0.1), hsl(var(--primary) / 0.1))',
                borderColor: 'hsl(var(--accent) / 0.3)'
              }}
            >
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-sm font-bold text-accent">{currentStreak} streak</span>
            </motion.div>
          )}
          
          <div className="text-right">
            <p className="text-xs text-muted-foreground font-medium">Progress</p>
            <p className="text-foreground font-semibold">{Math.round(progressPercent)}%</p>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="progress-traditional">
          <motion.div
            className="fill"
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
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="card-traditional rounded-xl overflow-hidden"
        >
          {/* Top accent */}
          <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />
          
          <div className="p-6 md:p-8 bg-card">
            {/* Category tag */}
            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex items-center gap-2 tag">
                <Target className="w-3 h-3" />
                Vocabulary & Grammar
              </span>
            </div>

            {/* Question text */}
            <h3 className="text-xl md:text-2xl font-serif font-semibold text-foreground mb-8 leading-relaxed">
              {question.question}
            </h3>

            {/* Options */}
            <div className="space-y-3">
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
                      "w-full p-4 rounded-xl text-left transition-all duration-200",
                      "flex items-center gap-4 group",
                      "border-2",
                      showFeedback 
                        ? isCorrectOption 
                          ? "bg-sage/10 border-sage" 
                          : isSelected && !isCorrectOption
                            ? "bg-destructive/10 border-destructive/50"
                            : "bg-muted/20 border-border"
                        : isSelected 
                          ? "bg-primary/10 border-primary shadow-md"
                          : "bg-card border-border hover:bg-muted/30 hover:border-primary/40",
                      showFeedback ? "cursor-default" : "cursor-pointer"
                    )}
                  >
                    {/* Option label */}
                    <div className={cn(
                      "w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-all border-2",
                      showFeedback
                        ? isCorrectOption
                          ? "bg-sage text-primary-foreground border-sage"
                          : isSelected && !isCorrectOption
                            ? "bg-destructive text-primary-foreground border-destructive"
                            : "bg-muted text-muted-foreground border-border"
                        : isSelected
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-muted text-muted-foreground border-border group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/40"
                    )}>
                      {optionLabels[index]}
                    </div>
                    
                    {/* Option text */}
                    <span className="font-medium text-foreground flex-1">
                      {option}
                    </span>
                    
                    {/* Feedback icons */}
                    {showFeedback && isCorrectOption && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-8 h-8 rounded-full bg-sage flex items-center justify-center shrink-0"
                      >
                        <Check className="w-5 h-5 text-primary-foreground" />
                      </motion.div>
                    )}
                    {showFeedback && isSelected && !isCorrectOption && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-8 h-8 rounded-full bg-destructive flex items-center justify-center shrink-0"
                      >
                        <X className="w-5 h-5 text-primary-foreground" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback panel */}
            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="mt-6 overflow-hidden"
                >
                  <div className={cn(
                    "p-5 rounded-xl border-2",
                    isCorrect 
                      ? "bg-sage/10 border-sage/30" 
                      : "bg-muted/30 border-border"
                  )}>
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                        isCorrect ? "bg-sage/20" : "bg-muted"
                      )}>
                        {isCorrect ? (
                          <Check className="w-5 h-5 text-sage" />
                        ) : (
                          <X className="w-5 h-5 text-destructive" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground mb-1">
                          {isCorrect ? 'Excellent! That\'s correct.' : 'Not quite right'}
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {question.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex gap-4 mt-6"
      >
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="flex-1 h-14 text-base gap-2 rounded-xl border-2 font-semibold"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </Button>

        <Button
          onClick={handleNext}
          disabled={!showFeedback}
          className={cn(
            "flex-1 h-14 text-base gap-2 rounded-xl font-semibold",
            showFeedback 
              ? "btn-primary" 
              : "bg-muted text-muted-foreground cursor-not-allowed border-2 border-border"
          )}
        >
          {currentQuestion < totalQuestions - 1 ? 'Next Question' : 'View Results'}
          <ChevronRight className="w-5 h-5" />
        </Button>
      </motion.div>

      {/* Question dots */}
      <div className="flex justify-center gap-2 mt-6">
        {quizQuestions.map((_, index) => {
          const isAnswered = quizAnswers[quizQuestions[index].id] !== undefined;
          const wasCorrect = quizAnswers[quizQuestions[index].id] === quizQuestions[index].correctAnswer;
          
          return (
            <div
              key={index}
              className={cn(
                "w-3 h-3 rounded-full transition-all border-2",
                index === currentQuestion
                  ? "w-7 bg-primary border-primary"
                  : isAnswered
                    ? wasCorrect
                      ? "bg-sage border-sage"
                      : "bg-destructive/60 border-destructive/60"
                    : "bg-muted border-border"
              )}
            />
          );
        })}
      </div>
    </div>
  );
}