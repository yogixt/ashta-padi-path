import { motion } from 'framer-motion';
import { ProfessionSelector } from '@/components/ProfessionSelector';
import { ProgressTracker } from '@/components/ProgressTracker';
import { useLearningStore } from '@/store/learningStore';
import { BookOpen, GraduationCap, Sparkles, Users, ArrowRight } from 'lucide-react';

export function HomeScreen() {
  const { vocabCompleted, sutrasCompleted } = useLearningStore();
  const hasProgress = vocabCompleted || sutrasCompleted > 0;

  const features = [
    {
      icon: BookOpen,
      title: "Vocabulary First",
      description: "Master key terms before sutras"
    },
    {
      icon: GraduationCap,
      title: "Grammar Reference",
      description: "Learn Sanskrit grammar alongside"
    },
    {
      icon: Sparkles,
      title: "Interactive Quizzes",
      description: "Test your understanding"
    },
    {
      icon: Users,
      title: "Profession-Based",
      description: "Personalized for your field"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/50">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }} />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Sanskrit invocation */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-sanskrit text-lg text-primary/50 mb-6"
            >
              ॐ श्री गणेशाय नमः
            </motion.p>
            
            {/* Main title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-semibold text-foreground mb-4 tracking-tight">
              Ashta Padi
            </h1>
            
            {/* Sanskrit subtitle */}
            <p className="font-sanskrit text-2xl md:text-3xl text-primary/80 mb-8">
              अष्टपदी
            </p>
            
            {/* Tagline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-4">
              A comprehensive eight-step learning framework for Patanjali's Yoga Sutras 
              with profession-based personalization
            </p>

            {/* Conference badge */}
            <div className="inline-flex items-center gap-2 tag-outline mt-4">
              Demo for ISCLS 2026
            </div>
          </motion.div>

          {/* Features grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="card-surface p-5 text-center"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Progress tracker (if has progress) */}
          {hasProgress && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="max-w-md mx-auto mt-12"
            >
              <ProgressTracker />
            </motion.div>
          )}
        </div>
      </section>

      {/* Profession Selection Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <ProfessionSelector />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/50 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="font-sanskrit text-lg text-primary/60 mb-1">
                योगः कर्मसु कौशलम्
              </p>
              <p className="text-sm text-muted-foreground">
                "Yoga is skill in action"
              </p>
            </div>
            <div className="text-center md:text-right text-sm text-muted-foreground">
              <p>8th International Sanskrit Computational Linguistics Symposium</p>
              <p className="text-xs mt-1 text-muted-foreground/60">
                Built for Sanskrit computational linguistics research
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
