import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { VocabularyCards } from '@/components/VocabularyCards';
import mandalaElegant from '@/assets/mandala-elegant.png';
import { Award, BookOpen, Calendar, CheckCircle2, GraduationCap, ScrollText, Scroll, Star } from 'lucide-react';
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

const SCRIPTURES = [
  { name: 'Yoga Sūtra', sanskrit: 'योगसूत्र' },
  { name: 'Haṭha Yoga', sanskrit: 'हठयोग' },
  { name: 'Yoga Tārāvalī', sanskrit: 'योगतारावली' },
  { name: 'Bhagavad Gītā', sanskrit: 'भगवद्गीता' },
  { name: 'Yoga Vāsiṣṭha', sanskrit: 'योगवासिष्ठ' },
];

function ScriptureProgressTracker() {
  // Mock: 0 scriptures completed for now - this would come from user data
  const completedScriptures = 0;
  
  const getTierStatus = (required: number) => {
    if (completedScriptures >= required) return 'completed';
    if (completedScriptures > 0 && completedScriptures < required) return 'in-progress';
    return 'locked';
  };

  const tiers = [
    { required: 1, label: 'Certificate', sanskrit: 'प्रमाणपत्रम्' },
    { required: 3, label: 'Diploma', sanskrit: 'उपाधिपत्रम्' },
    { required: 5, label: 'Degree', sanskrit: 'उपाधिः' },
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ScrollText className="w-4 h-4 text-primary" />
          <h4 className="text-sm font-medium text-foreground">Scripture Journey</h4>
        </div>
        <span className="text-xs font-semibold text-primary">{completedScriptures}/5</span>
      </div>

      {/* Scripture dots */}
      <div className="flex justify-between mb-4">
        {SCRIPTURES.map((scripture, idx) => {
          const isCompleted = idx < completedScriptures;
          const isCurrent = idx === completedScriptures;
          return (
            <div key={idx} className="flex flex-col items-center gap-1.5">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                  isCompleted 
                    ? 'bg-primary border-primary text-primary-foreground' 
                    : isCurrent
                    ? 'bg-primary/20 border-primary text-primary'
                    : 'bg-muted border-border text-muted-foreground'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <span className="text-xs font-medium">{idx + 1}</span>
                )}
              </motion.div>
              <span className="text-[10px] text-muted-foreground text-center leading-tight max-w-[50px]">
                {scripture.sanskrit}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progress bar with tier markers */}
      <div className="relative mb-3">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(completedScriptures / 5) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
          />
        </div>
        {/* Tier markers */}
        <div className="absolute top-0 left-0 right-0 h-2 flex">
          {[1, 3, 5].map((tier) => (
            <div
              key={tier}
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: `${(tier / 5) * 100}%` }}
            >
              <div className={`w-1.5 h-3 rounded-full ${
                completedScriptures >= tier ? 'bg-primary' : 'bg-border'
              }`} />
            </div>
          ))}
        </div>
      </div>

      {/* Tier labels */}
      <div className="flex justify-between text-[10px]">
        {tiers.map((tier) => {
          const status = getTierStatus(tier.required);
          return (
            <div 
              key={tier.required}
              className={`flex flex-col items-center ${
                status === 'completed' ? 'text-primary' : 
                status === 'in-progress' ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              <span className="font-medium">{tier.label}</span>
              <span className="opacity-70">{tier.required} text{tier.required > 1 ? 's' : ''}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CertificationCard({ 
  titleSanskrit, 
  titleEnglish, 
  requirement, 
  details,
  tier,
  isLocked = false 
}: { 
  titleSanskrit: string; 
  titleEnglish: string; 
  requirement: string;
  details: string[];
  tier: 'certificate' | 'diploma' | 'degree';
  isLocked?: boolean;
}) {
  const tierStyles = {
    certificate: {
      bg: 'bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 dark:from-amber-950/40 dark:via-orange-950/30 dark:to-amber-900/40',
      border: 'border-amber-300 dark:border-amber-700',
      accent: 'text-amber-700 dark:text-amber-400',
      icon: 'text-amber-600 dark:text-amber-500',
    },
    diploma: {
      bg: 'bg-gradient-to-br from-orange-50 via-rose-50 to-orange-100 dark:from-orange-950/40 dark:via-rose-950/30 dark:to-orange-900/40',
      border: 'border-orange-300 dark:border-orange-700',
      accent: 'text-orange-700 dark:text-orange-400',
      icon: 'text-orange-600 dark:text-orange-500',
    },
    degree: {
      bg: 'bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-200 dark:from-amber-900/50 dark:via-yellow-900/30 dark:to-amber-800/50',
      border: 'border-amber-400 dark:border-amber-600',
      accent: 'text-amber-800 dark:text-amber-300',
      icon: 'text-amber-600 dark:text-amber-400',
    },
  };

  const styles = tierStyles[tier];
  const isDegree = tier === 'degree';

  return (
    <motion.div 
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
      className={`relative ${styles.bg} border-2 ${styles.border} rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all ${isLocked ? 'opacity-90' : ''} ${isDegree ? 'ring-2 ring-amber-400/50 dark:ring-amber-500/40' : ''}`}
    >
      {/* Golden shimmer overlay for degree */}
      {isDegree && (
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/40 to-transparent dark:via-amber-400/30"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
              ease: 'easeInOut',
            }}
            style={{ width: '50%' }}
          />
        </motion.div>
      )}

      {/* Header with Sanskrit title */}
      <div className={`p-4 pb-3 text-center border-b border-current/10 relative ${isDegree ? 'bg-gradient-to-r from-amber-200/30 via-yellow-100/50 to-amber-200/30 dark:from-amber-800/30 dark:via-yellow-900/20 dark:to-amber-800/30' : ''}`}>
        <div className="flex items-center justify-center gap-2 mb-1">
          <Star className={`w-4 h-4 ${styles.icon} ${isDegree ? 'fill-amber-400' : ''}`} />
          <h3 className={`font-sanskrit text-2xl font-bold ${styles.accent} ${isDegree ? 'drop-shadow-sm' : ''}`}>
            {titleSanskrit}
          </h3>
          <Star className={`w-4 h-4 ${styles.icon} ${isDegree ? 'fill-amber-400' : ''}`} />
        </div>
        <p className={`text-sm font-semibold uppercase tracking-wider ${styles.accent} opacity-80`}>
          {titleEnglish}
        </p>
        {isDegree && (
          <motion.div 
            className="absolute top-1 right-2 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/50 px-2 py-0.5 rounded-full"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✦ सर्वोच्च ✦
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3 relative">
        <div className={`flex items-center justify-center gap-2 rounded-lg py-2 px-3 ${isDegree ? 'bg-gradient-to-r from-amber-100/70 via-yellow-50/80 to-amber-100/70 dark:from-amber-900/40 dark:via-yellow-900/30 dark:to-amber-900/40' : 'bg-white/50 dark:bg-black/20'}`}>
          <Award className={`w-5 h-5 ${styles.icon} ${isDegree ? 'fill-amber-200' : ''}`} />
          <span className={`text-base font-bold ${styles.accent}`}>{requirement}</span>
        </div>
        
        <div className="space-y-2">
          {details.map((detail, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <CheckCircle2 className={`w-4 h-4 ${styles.icon} shrink-0`} />
              <span className="text-sm font-medium text-foreground">{detail}</span>
            </div>
          ))}
        </div>

        {isLocked && (
          <div className={`text-center py-2 px-3 rounded-lg border border-dashed mt-3 ${isDegree ? 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700' : 'bg-white/60 dark:bg-black/30 border-current/20'}`}>
            <p className={`text-sm font-medium ${isDegree ? 'text-amber-700 dark:text-amber-400' : 'text-muted-foreground'}`}>🔒 गुरुनिर्णयः</p>
            <p className="text-xs text-muted-foreground">Guru/Gurukul decides</p>
          </div>
        )}
      </div>
    </motion.div>
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
      <div className="sticky top-24 space-y-3">
        {/* Scripture Progress Tracker */}
        <ScriptureProgressTracker />

        {/* Module Progress Indicator */}
        <ProgressIndicator />

        {/* Activity Calendar */}
        <ActivityCalendar />

        {/* Certification Tiers */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground flex items-center gap-2 px-1">
            <GraduationCap className="w-4 h-4 text-primary" />
            Certification Path
          </h4>
          
          {/* 1 Scripture = Certificate */}
          <CertificationCard
            tier="certificate"
            titleSanskrit="प्रमाणपत्रम्"
            titleEnglish="Certificate"
            requirement="Complete 1 Scripture"
            details={[
              "Pass all module exams",
              "Submit assessment",
              "Complete thesis"
            ]}
          />

          {/* 3 Scriptures = Diploma */}
          <CertificationCard
            tier="diploma"
            titleSanskrit="उपाधिपत्रम्"
            titleEnglish="Diploma"
            requirement="Complete 3 Scriptures"
            details={[
              "3 scripture certificates",
              "Combined assessment",
              "Research thesis"
            ]}
          />

          {/* 5 Scriptures = Degree */}
          <CertificationCard
            tier="degree"
            titleSanskrit="उपाधिः"
            titleEnglish="Degree"
            requirement="Complete All 5 Scriptures"
            details={[
              "All scripture certificates",
              "Final examination",
              "Doctoral thesis"
            ]}
            isLocked={true}
          />
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
