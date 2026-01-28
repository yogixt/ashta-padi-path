import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ChevronRight, RotateCcw } from 'lucide-react';
import { quizQuestions } from '@/data/yogaSutrasData';
import { useLearningStore } from '@/store/learningStore';
import { Button } from '@/components/ui/button';

export function QuizComponent() {
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
      // Calculate score
      const correctAnswers: Record<number, number> = {};
      quizQuestions.forEach(q => {
        correctAnswers[q.id] = q.correctAnswer;
      });
      calculateScore(correctAnswers);
      setIsComplete(true);
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

  // Results screen
  if (isComplete && quizScore !== null) {
    const percentage = Math.round((quizScore / totalQuestions) * 100);
    const getMessage = () => {
      if (percentage >= 90) return { text: "Excellent! शाबाश!", emoji: "🏆" };
      if (percentage >= 70) return { text: "Great work! बहुत अच्छा!", emoji: "🌟" };
      if (percentage >= 50) return { text: "Good effort! अच्छा प्रयास!", emoji: "👍" };
      return { text: "Keep practicing! अभ्यास जारी रखें!", emoji: "📚" };
    };
    const message = getMessage();

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl mx-auto px-4"
      >
        <div className="glass-card rounded-2xl p-8 md:p-10 text-center">
          <span className="text-6xl mb-6 block">{message.emoji}</span>
          
          <h2 className="text-3xl font-serif font-semibold text-foreground mb-2">
            Quiz Complete!
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8">
            {message.text}
          </p>

          {/* Score display */}
          <div className="bg-primary/10 rounded-2xl p-6 mb-8">
            <div className="text-5xl font-bold text-primary mb-2">
              {quizScore}/{totalQuestions}
            </div>
            <p className="text-muted-foreground">
              {percentage}% Correct
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-8">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-saffron rounded-full"
            />
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
              Back to Home
              <ChevronRight className="w-4 h-4" />
            </Button>
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
        className="text-center mb-8"
      >
        <span className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-3">
          {question.type === 'vocabulary' ? 'Vocabulary' : 'Grammar'}
        </span>
        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
          Practice Quiz
        </h2>
        
        {/* Progress */}
        <div className="flex gap-1.5 mt-6 max-w-md mx-auto">
          {quizQuestions.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                index < currentQuestion 
                  ? 'bg-primary' 
                  : index === currentQuestion 
                    ? 'bg-primary/50' 
                    : 'bg-muted'
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
          className="glass-card rounded-2xl p-6 md:p-8"
        >
          {/* Question number */}
          <p className="text-sm text-muted-foreground mb-4">
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
              
              let optionClass = 'bg-muted/50 hover:bg-muted border-transparent';
              if (showFeedback) {
                if (isCorrectOption) {
                  optionClass = 'bg-sage/20 border-sage text-foreground';
                } else if (isSelected && !isCorrectOption) {
                  optionClass = 'bg-destructive/10 border-destructive text-foreground';
                }
              } else if (isSelected) {
                optionClass = 'bg-primary/10 border-primary text-foreground';
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
                  <span className="font-medium">{option}</span>
                  
                  {showFeedback && isCorrectOption && (
                    <CheckCircle2 className="w-5 h-5 text-sage shrink-0" />
                  )}
                  {showFeedback && isSelected && !isCorrectOption && (
                    <XCircle className="w-5 h-5 text-destructive shrink-0" />
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
                  mt-6 p-4 rounded-lg border-l-4
                  ${isCorrect 
                    ? 'bg-sage/10 border-sage' 
                    : 'bg-destructive/5 border-destructive'
                  }
                `}
              >
                <p className="font-semibold text-foreground mb-1">
                  {isCorrect ? '✓ Correct!' : '✗ Not quite'}
                </p>
                <p className="text-sm text-muted-foreground">
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
                {currentQuestion < totalQuestions - 1 ? 'Next Question' : 'See Results'}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
