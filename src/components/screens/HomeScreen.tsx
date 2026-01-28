import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ProfessionSelector } from '@/components/ProfessionSelector';
import { ProgressTracker } from '@/components/ProgressTracker';
import { useLearningStore } from '@/store/learningStore';
import { useAuth } from '@/contexts/AuthContext';
import { BookOpen, GraduationCap, Sparkles, Users, ArrowRight, Star, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-patanjali.jpg';
import mandalaDecorative from '@/assets/mandala-decorative.png';
import ashtaPadiFramework from '@/assets/ashta-padi-framework.jpg';

export function HomeScreen() {
  const { vocabCompleted, sutrasCompleted } = useLearningStore();
  const { user, role } = useAuth();
  const navigate = useNavigate();
  const hasProgress = vocabCompleted || sutrasCompleted > 0;
  
  const features = [
    {
      icon: BookOpen,
      title: "Vocabulary First",
      description: "Master key Sanskrit terms before diving into sutras",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: GraduationCap,
      title: "Grammar Reference",
      description: "Learn Sanskrit grammar alongside your studies",
      color: "from-amber-500 to-orange-600"
    },
    {
      icon: Sparkles,
      title: "Interactive Quizzes",
      description: "Test and reinforce your understanding",
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: Users,
      title: "AI Sanskrit Guide",
      description: "Chat with an AI tutor for personalized help",
      color: "from-violet-500 to-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Ancient Sanskrit Manuscript" 
            className="w-full h-full object-cover opacity-30" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
          
          {/* Mandala decorations */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.08, scale: 1, rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 right-0 w-[500px] h-[500px] translate-x-1/3"
          >
            <img src={mandalaDecorative} alt="" className="w-full h-full object-contain" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.06, scale: 1, rotate: -360 }}
            transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 left-0 w-[400px] h-[400px] -translate-x-1/3 translate-y-1/4"
          >
            <img src={mandalaDecorative} alt="" className="w-full h-full object-contain" />
          </motion.div>
        </div>

        {/* Navigation */}
        <nav className="relative max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-sanskrit text-2xl font-bold shadow-lg">
              ॐ
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Ashta Padi</h1>
              <p className="text-xs text-muted-foreground font-sanskrit">अष्टपदी</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-card border border-border rounded-full">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground text-xs font-bold font-sanskrit">
                  {role === 'teacher' ? 'गु' : 'शि'}
                </div>
                <span className="text-sm font-medium text-foreground">{role === 'teacher' ? 'Guru' : 'Śiṣya'}</span>
              </div>
            ) : (
              <Button
                onClick={() => navigate('/auth')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25"
              >
                Get Started
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-6"
            >
              <Star className="w-4 h-4" />
              Demo for ISCLS 2026
            </motion.div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight mb-6">
              Master the
              <span className="block text-primary">Yoga Sutras</span>
              of Patanjali
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              A comprehensive eight-step learning framework with profession-based personalization. 
              Learn Sanskrit through the timeless wisdom of ancient texts.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              {!user && (
                <Button
                  onClick={() => navigate('/auth')}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 h-12 px-8"
                >
                  Start Learning
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              )}
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 border-border"
              >
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 mt-12 pt-8 border-t border-border/50">
              {[
                { value: "196", label: "Sutras" },
                { value: "4", label: "Chapters" },
                { value: "8", label: "Learning Steps" }
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="text-center"
                >
                  <p className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="tag mb-4 inline-block">Features</span>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-4">
              Everything you need to learn Sanskrit
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/30"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-lg`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8-Step Framework Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden">
        {/* Subtle mandala background */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.04 }}
          viewport={{ once: true }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]"
        >
          <img src={mandalaDecorative} alt="" className="w-full h-full object-contain" />
        </motion.div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              अष्टपदी
            </span>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              The 8-Step Learning Framework
            </h3>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              A university-integrated progression from profession selection to advanced scholarship
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl border border-border"
          >
            <img 
              src={ashtaPadiFramework} 
              alt="Ashta Padi 8-Step Learning Framework" 
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Progress Section */}
      {hasProgress && (
        <section className="py-16 px-4">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <ProgressTracker />
            </motion.div>
          </div>
        </section>
      )}

      {/* Profession Selection Section */}
      <section className="py-20 px-4 section-pattern relative overflow-hidden">
        {/* Corner mandalas */}
        <div className="absolute -top-32 -right-32 w-80 h-80 opacity-[0.06]">
          <img src={mandalaDecorative} alt="" className="w-full h-full object-contain" />
        </div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 opacity-[0.06]">
          <img src={mandalaDecorative} alt="" className="w-full h-full object-contain" />
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <ProfessionSelector />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo & Quote */}
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-sanskrit text-lg font-bold">
                  अ
                </div>
                <span className="font-semibold text-lg text-foreground">Ashta Padi</span>
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
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
