import { motion } from 'framer-motion';
import { ProfessionSelector } from '@/components/ProfessionSelector';
import { ProgressTracker } from '@/components/ProgressTracker';
import { useLearningStore } from '@/store/learningStore';
import { BookOpen, GraduationCap, Sparkles, Users, ArrowRight, Star } from 'lucide-react';
import heroImage from '@/assets/hero-patanjali.jpg';
import manuscriptImage from '@/assets/sanskrit-manuscript.jpg';
import mandalaImage from '@/assets/mandala-pattern.jpg';
export function HomeScreen() {
  const {
    vocabCompleted,
    sutrasCompleted
  } = useLearningStore();
  const hasProgress = vocabCompleted || sutrasCompleted > 0;
  const features = [{
    icon: BookOpen,
    title: "Vocabulary First",
    description: "Master key terms before sutras"
  }, {
    icon: GraduationCap,
    title: "Grammar Reference",
    description: "Learn Sanskrit grammar alongside"
  }, {
    icon: Sparkles,
    title: "Interactive Quizzes",
    description: "Test your understanding"
  }, {
    icon: Users,
    title: "AI Sanskrit Guide",
    description: "Chat with an AI tutor"
  }];
  return <div className="min-h-screen bg-background">
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 opacity-[0.04]">
          <img src={mandalaImage} alt="" className="w-full h-full object-cover rounded-full" />
        </div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 opacity-[0.04]">
          <img src={mandalaImage} alt="" className="w-full h-full object-cover rounded-full" />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Hero background with overlay */}
        <div className="absolute inset-0">
          <img src={heroImage} alt="Ancient Sanskrit Manuscript" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/75 to-background" />
          {/* Traditional pattern overlay */}
          <div className="absolute inset-0 opacity-10 section-pattern" />
        </div>

        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-primary to-transparent" />

        <div className="relative max-w-5xl mx-auto px-4 py-20 md:py-28 lg:py-36">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.7
        }} className="text-center">
            {/* Om symbol decoration */}
            <motion.div initial={{
            opacity: 0,
            scale: 0.8
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            delay: 0.2,
            duration: 0.5
          }} className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-3xl font-sanskrit mb-6 shadow-lg animate-glow">
              ॐ
            </motion.div>

            {/* Main title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-foreground mb-3 tracking-tight">
              Ashta Padi
            </h1>
            
            {/* Sanskrit subtitle with decorative lines */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
              <p className="font-sanskrit text-3xl md:text-4xl text-primary">
                अष्टपदी
              </p>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
            </div>
            
            {/* Tagline */}
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed mb-6 font-serif">
              A comprehensive eight-step learning framework for Patanjali's Yoga Sutras 
              with profession-based personalization
            </p>

            {/* Conference badge */}
            <motion.div initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.4
          }} className="inline-flex items-center gap-2 tag-gold mt-2">
              <Star className="w-3.5 h-3.5" />
              Demo for ISCLS 2026
            </motion.div>
          </motion.div>

          {/* Features grid */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.5,
          duration: 0.6
        }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {features.map((feature, index) => <motion.div key={feature.title} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.6 + index * 0.1
          }} className="card-surface p-5 text-center group hover:shadow-lg transition-all duration-300 hover:border-primary/30">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-3 group-hover:from-primary/20 group-hover:to-accent/20 transition-colors">
                  
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>)}
          </motion.div>

          {/* Progress tracker (if has progress) */}
          {hasProgress && <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.7
        }} className="max-w-md mx-auto mt-12">
              <ProgressTracker />
            </motion.div>}
        </div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full h-12 fill-background">
            <path d="M0,60 L0,30 Q360,0 720,30 T1440,30 L1440,60 Z" />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-[0.06]">
          <img src={manuscriptImage} alt="" className="w-full h-full object-cover" />
        </div>
        
        <div className="max-w-5xl mx-auto relative">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="max-w-2xl">
            {/* Section tag */}
            <span className="tag mb-4 inline-block">About the Framework</span>
            
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6 line-accent">
              Ancient Wisdom, Modern Learning
            </h2>
            
            <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
              The Yoga Sutras of Patanjali, composed over 2,000 years ago, remain one of the most profound 
              texts on the science of consciousness. Our platform makes this timeless wisdom accessible 
              through structured, personalized learning paths.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[{
              value: "196",
              label: "Sutras in 4 Chapters"
            }, {
              value: "8",
              label: "Step Learning Path"
            }, {
              value: "∞",
              label: "Depth of Wisdom"
            }].map((stat, i) => <motion.div key={stat.label} initial={{
              opacity: 0,
              y: 10
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: i * 0.1
            }} className="text-center p-4 card-surface">
                  <p className="text-2xl md:text-3xl font-serif font-bold text-primary mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </motion.div>)}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider-ornate max-w-md mx-auto" />

      {/* Profession Selection Section */}
      <section className="py-20 px-4 section-pattern">
        <div className="max-w-5xl mx-auto">
          <ProfessionSelector />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 border-t-2 border-border bg-card/50 relative overflow-hidden">
        {/* Decorative mandala */}
        <div className="absolute right-0 bottom-0 w-64 h-64 opacity-[0.03] translate-x-1/2 translate-y-1/2">
          <img src={mandalaImage} alt="" className="w-full h-full object-cover rounded-full" />
        </div>
        
        <div className="max-w-5xl mx-auto relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Sanskrit quote */}
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-sanskrit text-lg font-bold">
                  अ
                </div>
                <span className="font-serif font-semibold text-lg text-foreground">Ashta Padi</span>
              </div>
              <p className="font-sanskrit text-xl text-primary mb-1">
                योगः कर्मसु कौशलम्
              </p>
              <p className="text-sm text-muted-foreground italic">
                "Yoga is skill in action" — Bhagavad Gita 2.50
              </p>
            </div>
            
            {/* Conference info */}
            <div className="text-center md:text-right">
              <p className="text-sm text-foreground font-medium mb-1">
                8th International Sanskrit Computational Linguistics Symposium
              </p>
              <p className="text-xs text-muted-foreground">
                Built for Sanskrit computational linguistics research
              </p>
              <div className="flex items-center justify-center md:justify-end gap-2 mt-3">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="w-2 h-2 rounded-full bg-primary" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>;
}