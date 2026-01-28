import { motion } from 'framer-motion';
import { ProfessionSelector } from '@/components/ProfessionSelector';
import { ProgressTracker } from '@/components/ProgressTracker';
import { useLearningStore } from '@/store/learningStore';
import { BookOpen, GraduationCap, Sparkles, Users, ArrowRight } from 'lucide-react';
import heroImage from '@/assets/hero-patanjali.jpg';
import manuscriptImage from '@/assets/sanskrit-manuscript.jpg';

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
      title: "AI Sanskrit Guide",
      description: "Chat with an AI tutor"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Ancient Image */}
      <section className="relative overflow-hidden">
        {/* Hero background image */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Ancient Sanskrit Manuscript" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 py-24 md:py-32">
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
              className="font-sanskrit text-xl text-primary mb-6"
            >
              ॐ श्री गणेशाय नमः
            </motion.p>
            
            {/* Main title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-semibold text-foreground mb-4 tracking-tight">
              Ashta Padi
            </h1>
            
            {/* Sanskrit subtitle */}
            <p className="font-sanskrit text-3xl md:text-4xl text-primary mb-8">
              अष्टपदी
            </p>
            
            {/* Tagline */}
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed mb-4">
              A comprehensive eight-step learning framework for Patanjali's Yoga Sutras 
              with profession-based personalization
            </p>

            {/* Conference badge */}
            <div className="inline-flex items-center gap-2 tag-outline mt-4 bg-background/80 backdrop-blur-sm">
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
                className="card-surface p-5 text-center backdrop-blur-sm bg-card/90"
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

      {/* About Section with Manuscript Image */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-10">
          <img 
            src={manuscriptImage} 
            alt="Sanskrit Manuscript" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="max-w-5xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl font-serif font-semibold text-foreground mb-4">
              Ancient Wisdom, Modern Learning
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The Yoga Sutras of Patanjali, composed over 2,000 years ago, remain one of the most profound 
              texts on the science of consciousness. Our platform makes this timeless wisdom accessible 
              through structured, personalized learning paths.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-muted-foreground">196 Sutras in 4 Chapters</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-muted-foreground">Word-by-Word Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-muted-foreground">Grammar Integration</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Profession Selection Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <ProfessionSelector />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/50 bg-card/50">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="font-sanskrit text-lg text-primary mb-1">
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
