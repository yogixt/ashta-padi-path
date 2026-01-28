import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { ProgressOverview } from '@/components/analytics/ProgressOverview';
import { QuizPerformanceChart } from '@/components/analytics/QuizPerformanceChart';
import { LearningMetrics } from '@/components/analytics/LearningMetrics';
import { AchievementBadges } from '@/components/analytics/AchievementBadges';

export function AnalyticsScreen() {
  return (
    <div className="min-h-screen bg-background">
      <Header showBack backTo="home" />
      
      <main className="py-8 md:py-12 relative z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <span className="tag-gold mb-4">Learning Analytics</span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-4 mb-3">
              Your Progress Report
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Track your Sanskrit learning journey with detailed insights and performance metrics
            </p>
            <div className="divider-ornate mt-8 max-w-md mx-auto" />
          </motion.div>

          {/* Progress Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <ProgressOverview />
          </motion.div>

          {/* Charts and Metrics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <QuizPerformanceChart />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <LearningMetrics />
            </motion.div>
          </div>

          {/* Achievement Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <AchievementBadges />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
