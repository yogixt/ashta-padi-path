import { motion } from 'framer-motion';
import { ProfessionSelector } from '@/components/ProfessionSelector';
import { ProgressTracker } from '@/components/ProgressTracker';
import { useLearningStore } from '@/store/learningStore';
import { BookOpen, GraduationCap, Sparkles, Users } from 'lucide-react';

export function HomeScreen() {
  const { vocabCompleted, sutrasCompleted } = useLearningStore();
  const hasProgress = vocabCompleted || sutrasCompleted > 0;

  const features = [
    {
      icon: BookOpen,
      title: "Vocabulary First",
      description: "Master key terms before diving into sutras"
    },
    {
      icon: GraduationCap,
      title: "Grammar Reference",
      description: "Learn Sanskrit grammar alongside your studies"
    },
    {
      icon: Sparkles,
      title: "Interactive Quizzes",
      description: "Test your understanding with practice questions"
    },
    {
      icon: Users,
      title: "Profession-Based",
      description: "Personalized learning for your field"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            {/* Sanskrit decorative text */}
            <p className="font-sanskrit text-2xl text-primary/60 mb-4">
              ॐ श्री गणेशाय नमः
            </p>
            
            {/* Main title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground mb-4">
              Ashta Padi
            </h1>
            
            {/* Sanskrit subtitle */}
            <p className="font-sanskrit text-2xl md:text-3xl text-primary mb-6">
              अष्टपदी
            </p>
            
            {/* Tagline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Eight steps to Sanskrit mastery — A comprehensive learning framework 
              for Patanjali's Yoga Sutras with profession-based personalization
            </p>

            {/* Decorative line */}
            <div className="decorative-line w-32 mx-auto mt-8" />
          </motion.div>

          {/* Features grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          >
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="glass-card p-5 rounded-xl text-center"
              >
                <feature.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground text-sm mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Progress tracker (if has progress) */}
          {hasProgress && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-md mx-auto mb-12"
            >
              <ProgressTracker />
            </motion.div>
          )}
        </div>
      </section>

      {/* Profession Selection Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <ProfessionSelector />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-sanskrit text-lg text-primary/60 mb-2">
            योगः कर्मसु कौशलम्
          </p>
          <p className="text-sm text-muted-foreground">
            "Yoga is skill in action" — Demo for ISCLS 2026
          </p>
          <div className="mt-4 text-xs text-muted-foreground/60">
            Built with 🙏 for Sanskrit computational linguistics
          </div>
        </div>
      </footer>
    </div>
  );
}
