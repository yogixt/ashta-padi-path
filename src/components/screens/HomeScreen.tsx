import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ProfessionSelector } from '@/components/ProfessionSelector';
import { ProgressTracker } from '@/components/ProgressTracker';
import { AshtaPadiSteps } from '@/components/AshtaPadiSteps';
import { useLearningStore } from '@/store/learningStore';
import { useAuth } from '@/contexts/AuthContext';
import { BookOpen, GraduationCap, Sparkles, Users, ArrowRight, Star, ChevronRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-patanjali.jpg';
import mandalaElegant from '@/assets/mandala-elegant.png';

// Author data from the research paper
const authors = [
  { name: "Bhagyashree Joshi Vyasa", title: "Vedic Scholar", affiliation: "Satyam Sadhana Kutir Ashram" },
  { name: "Bijoy Laxmi Biswas", title: "Yoga Practitioner, M.Tech CS", affiliation: "Satyam Sadhana Kutir Ashram" },
  { name: "Divyangana Kothari", title: "Yoga Practitioner, M.Sc. CS", affiliation: "Satyam Sadhana Kutir Ashram" },
  { name: "Aarti Panwar", title: "Pursuing Masters in Yogic Science", affiliation: "Uttarakhand Sanskrit University, Haridwar" }
];

export function HomeScreen() {
  const { vocabCompleted, sutrasCompleted, setScreen } = useLearningStore();
  const { user, role } = useAuth();
  const navigate = useNavigate();
  const hasProgress = vocabCompleted || sutrasCompleted > 0;
  
  const features = [
    {
      icon: BookOpen,
      title: "शब्दकोश (Vocabulary)",
      description: "Profession-aware vocabulary linked to sutra content",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: GraduationCap,
      title: "व्याकरण (Grammar)",
      description: "Contextual grammar: sandhi, pada, and varṇa",
      color: "from-amber-500 to-orange-600"
    },
    {
      icon: Sparkles,
      title: "परीक्षा (Assessment)",
      description: "Test and track your sutra-wise progress",
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: Users,
      title: "सहायक (AI Guide)",
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
            <img src={mandalaElegant} alt="" className="w-full h-full object-contain" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.06, scale: 1, rotate: -360 }}
            transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 left-0 w-[400px] h-[400px] -translate-x-1/3 translate-y-1/4"
          >
            <img src={mandalaElegant} alt="" className="w-full h-full object-contain" />
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
              <Button
                onClick={() => setScreen(role === 'teacher' ? 'guru-dashboard' : 'shishya-dashboard')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 gap-2"
              >
                <div className="w-5 h-5 rounded-full bg-primary-foreground/20 flex items-center justify-center text-xs font-bold font-sanskrit">
                  {role === 'teacher' ? 'गु' : 'शि'}
                </div>
                {role === 'teacher' ? 'Guru Dashboard' : 'My Dashboard'}
              </Button>
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
              Learn
              <span className="block text-primary">Sanskrit Scriptures</span>
              Through Your Profession
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              A comprehensive eight-step learning framework with profession-based personalization. 
              Master Yoga Sūtras, Bhagavad Gītā, Arthaśāstra, and more through the wisdom of ancient texts.
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
                className="h-12 px-8 border-border gap-2"
                onClick={() => document.getElementById('demo-video')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Play className="w-4 h-4" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 mt-12 pt-8 border-t border-border/50">
              {[
                { value: "8", label: "Learning Steps" },
                { value: "5+", label: "Scriptures" },
                { value: "22", label: "Grammar Lessons" }
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

      {/* Abstract Section */}
      <section className="py-16 px-4 bg-card/30 border-y border-border">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              सारांश (Abstract)
            </span>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Sanskrit scriptures form the foundation of Indian philosophy and contemplative traditions. 
              Despite their significance, systematic study remains inaccessible due to linguistic complexity 
              and lack of structured pathways. <strong className="text-foreground">Ashta Padi</strong> addresses 
              this gap by connecting Sanskrit learning with learners' professional contexts, lowering entry 
              barriers while preserving grammatical rigor.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section id="demo-video" className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              <Play className="w-4 h-4" />
              प्रदर्शनम् (Demo)
            </span>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              Watch Demo
            </h3>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              See Ashta Padi in action — learn how profession-based Sanskrit learning works
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 border border-border bg-card"
          >
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/qvM56Yg29AM"
                title="Ashta Padi Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
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
            <span className="tag mb-4 inline-block">Demo Scope: Steps 1-3</span>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-4">
              Key Features
            </h3>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              The demo implements Steps 1–3 using the Yoga Sūtras, Samādhi Pāda
            </p>
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
                <h4 className="text-lg font-semibold text-foreground mb-2 font-sanskrit">
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
          <img src={mandalaElegant} alt="" className="w-full h-full object-contain" />
        </motion.div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <AshtaPadiSteps />
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
          <img src={mandalaElegant} alt="" className="w-full h-full object-contain" />
        </div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 opacity-[0.06]">
          <img src={mandalaElegant} alt="" className="w-full h-full object-contain" />
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <ProfessionSelector />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 border-t border-border bg-card/50">
        <div className="max-w-6xl mx-auto">
          {/* Authors Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h4 className="text-center text-lg font-semibold text-foreground mb-6">
              Research Team
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {authors.map((author, index) => (
                <motion.div
                  key={author.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-4 rounded-xl bg-background/50 border border-border"
                >
                  <p className="font-medium text-foreground text-sm">{author.name}</p>
                  <p className="text-xs text-primary mt-1">{author.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{author.affiliation}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-border">
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
              <p className="text-xs text-muted-foreground mb-2">
                ISCLS 2026 Demo Paper
              </p>
              <div className="flex items-center justify-center md:justify-end gap-4 text-xs text-muted-foreground">
                <a 
                  href="https://github.com/DivyanganaKothari/Ashta-Padi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors underline"
                >
                  GitHub Repository
                </a>
                <span>•</span>
                <span>Satyam Sadhana Kutir Ashram</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
