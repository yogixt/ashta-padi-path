import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { VocabularyCards } from '@/components/VocabularyCards';
import mandalaElegant from '@/assets/mandala-elegant.png';
import { Award, GraduationCap, BookOpen, Users, Sparkles, Calendar } from 'lucide-react';

interface VocabularyScreenProps {
  onOpenChatWithQuery?: (query: string) => void;
}

function SadhanaDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="w-full lg:w-80 shrink-0"
    >
      <div className="sticky top-24 space-y-4">
        {/* Self Study Path */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-serif font-semibold text-foreground">स्वाध्यायः</h3>
                <p className="text-xs text-muted-foreground">Self Study Path</p>
              </div>
            </div>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                <Award className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Completion Certificate</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Receive a digital certificate upon completing all modules
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Learn at Your Pace</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Flexible timing with AI-powered guidance
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Gurukulavasa Path */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-accent/20 to-accent/10 p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/30 flex items-center justify-center">
                <Users className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-serif font-semibold text-foreground">गुरुकुलवासः</h3>
                <p className="text-xs text-muted-foreground">With Guru / Mentor</p>
              </div>
            </div>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center shrink-0 mt-0.5">
                <Calendar className="w-4 h-4 text-violet-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">6-Month Sādhanā</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Structured immersive journey with a dedicated mentor
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                <GraduationCap className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">University Certification</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Accredited certification from partner universities
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sanskrit wisdom */}
        <div className="text-center py-3 px-4 bg-muted/30 rounded-xl border border-border">
          <p className="font-sanskrit text-sm text-primary">विद्या ददाति विनयम्</p>
          <p className="text-xs text-muted-foreground mt-1 italic">Knowledge bestows humility</p>
        </div>
      </div>
    </motion.div>
  );
}

export function VocabularyScreen({ onOpenChatWithQuery }: VocabularyScreenProps) {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Background decorations with mandala */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 0.05, rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -right-32 w-96 h-96"
        >
          <img src={mandalaElegant} alt="" className="w-full h-full object-contain" />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 0.04, rotate: -360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-32 -left-32 w-96 h-96"
        >
          <img src={mandalaElegant} alt="" className="w-full h-full object-contain" />
        </motion.div>
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 section-pattern opacity-20" />
      </div>
      
      <Header showBack backTo="home" />
      
      <main className="py-10 md:py-16 relative z-10">
        {/* Section header */}
        <div className="text-center mb-10 px-4">
          <span className="tag-gold mb-4 inline-block">Step 2 of 8</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
            Master Key Vocabulary
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Learn the essential Sanskrit terms before diving into the sutras
          </p>
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-primary/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
        </div>
        
        {/* Main content with sidebar */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Vocabulary cards - main content */}
            <div className="flex-1">
              <VocabularyCards onOpenChatWithQuery={onOpenChatWithQuery} />
            </div>
            
            {/* Right sidebar dashboard */}
            <SadhanaDashboard />
          </div>
        </div>
      </main>
    </div>
  );
}
