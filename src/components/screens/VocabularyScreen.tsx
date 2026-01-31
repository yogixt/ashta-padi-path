import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { VocabularyCards } from '@/components/VocabularyCards';
import mandalaElegant from '@/assets/mandala-elegant.png';
import certificateSelfStudy from '@/assets/certificate-self-study.png';
import certificateUniversity from '@/assets/certificate-university.png';
import { Award, BookOpen, Calendar, CheckCircle2, GraduationCap, Users } from 'lucide-react';
import { useLearningStore } from '@/store/learningStore';
import { useMemo } from 'react';

const TOTAL_VOCAB_TERMS = 6;

// Generate mock activity data for the last 12 weeks
function generateActivityData() {
  const weeks = 12;
  const data: { date: Date; level: number }[] = [];
  const today = new Date();
  
  for (let w = weeks - 1; w >= 0; w--) {
    for (let d = 0; d < 7; d++) {
      const date = new Date(today);
      date.setDate(date.getDate() - (w * 7 + (6 - d)));
      // Random activity level (0-4), with higher probability for recent days
      const recency = 1 - (w / weeks);
      const level = Math.random() < 0.3 + recency * 0.3 
        ? Math.floor(Math.random() * 4) + 1 
        : 0;
      data.push({ date, level });
    }
  }
  return data;
}

function ActivityCalendar() {
  const activityData = useMemo(() => generateActivityData(), []);
  const weeks: { date: Date; level: number }[][] = [];
  
  for (let i = 0; i < activityData.length; i += 7) {
    weeks.push(activityData.slice(i, i + 7));
  }

  const getLevelColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-muted';
      case 1: return 'bg-primary/20';
      case 2: return 'bg-primary/40';
      case 3: return 'bg-primary/60';
      case 4: return 'bg-primary';
      default: return 'bg-muted';
    }
  };

  const totalActiveDays = activityData.filter(d => d.level > 0).length;

  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" />
          <h4 className="text-sm font-medium text-foreground">Sādhanā Activity</h4>
        </div>
        <span className="text-xs text-muted-foreground">{totalActiveDays} active days</span>
      </div>
      
      {/* Calendar grid */}
      <div className="flex gap-[3px] mb-3">
        {weeks.map((week, weekIdx) => (
          <div key={weekIdx} className="flex flex-col gap-[3px]">
            {week.map((day, dayIdx) => (
              <motion.div
                key={dayIdx}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: (weekIdx * 7 + dayIdx) * 0.005 }}
                className={`w-[10px] h-[10px] rounded-sm ${getLevelColor(day.level)}`}
                title={`${day.date.toLocaleDateString()}: ${day.level > 0 ? 'Active' : 'No activity'}`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Less</span>
        <div className="flex gap-[3px]">
          {[0, 1, 2, 3, 4].map(level => (
            <div key={level} className={`w-[10px] h-[10px] rounded-sm ${getLevelColor(level)}`} />
          ))}
        </div>
        <span>More</span>
      </div>

      {/* Total learning days */}
      <div className="mt-3 pt-3 border-t border-border flex items-center justify-center gap-2">
        <BookOpen className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-foreground">{totalActiveDays} Days Learning</span>
      </div>
    </div>
  );
}

function ProgressIndicator() {
  const { completedVocabTerms, quizScore } = useLearningStore();
  const vocabProgress = (completedVocabTerms.size / TOTAL_VOCAB_TERMS) * 100;
  const quizProgress = quizScore !== null ? (quizScore / 5) * 100 : 0;

  return (
    <div className="bg-card border border-border rounded-xl p-4 space-y-4">
      <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-primary" />
        Your Progress
      </h4>

      {/* Vocabulary Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Vocabulary</span>
          <span className="font-medium text-foreground">{completedVocabTerms.size}/{TOTAL_VOCAB_TERMS}</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${vocabProgress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
          />
        </div>
      </div>

      {/* Quiz Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Quiz Score</span>
          <span className="font-medium text-foreground">
            {quizScore !== null ? `${Math.round(quizProgress)}%` : 'Not taken'}
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${quizProgress}%` }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className={`h-full rounded-full ${
              quizProgress === 100 
                ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' 
                : 'bg-gradient-to-r from-amber-500 to-amber-400'
            }`}
          />
        </div>
        {quizScore !== null && quizProgress < 100 && (
          <p className="text-xs text-muted-foreground">Need 100% to select mentor</p>
        )}
      </div>
    </div>
  );
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
        {/* Progress Indicator */}
        <ProgressIndicator />

        {/* Activity Calendar */}
        <ActivityCalendar />

        {/* Self Study Path Card */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="relative h-28 overflow-hidden">
            <img 
              src={certificateSelfStudy} 
              alt="Completion Certificate" 
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/90 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-foreground text-sm">स्वाध्यायः</h3>
                  <p className="text-xs text-muted-foreground">Self Study</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                <Award className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Completion Certificate</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Digital certificate upon completing all modules
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 6-Month Guru Path Card */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="relative h-28 overflow-hidden">
            <img 
              src={certificateUniversity} 
              alt="University Certification" 
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-accent/90 flex items-center justify-center">
                  <Users className="w-4 h-4 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-foreground text-sm">गुरुकुलवासः</h3>
                  <p className="text-xs text-muted-foreground">6-Month with Guru</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4 text-violet-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">6-Month Sādhanā</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Immersive journey with dedicated mentor
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <GraduationCap className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">University Certification</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Accredited by partner universities
                </p>
              </div>
            </div>
          </div>
          {/* Unlock hint */}
          <div className="px-4 pb-4">
            <div className="text-center py-2 px-3 bg-muted/50 rounded-lg border border-dashed border-border">
              <p className="text-xs text-muted-foreground">
                🔒 Unlocks after 100% quiz score
              </p>
            </div>
          </div>
        </motion.div>


        {/* Sanskrit wisdom */}
        <div className="text-center py-3 px-4 bg-muted/30 rounded-xl border border-border">
          <p className="font-sanskrit text-sm text-primary">विद्या ददाति विनयम्</p>
          <p className="text-xs text-muted-foreground mt-1 italic">Knowledge bestows humility</p>
        </div>
      </div>
    </motion.div>
  );
}

interface VocabularyScreenProps {
  onOpenChatWithQuery?: (query: string) => void;
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
