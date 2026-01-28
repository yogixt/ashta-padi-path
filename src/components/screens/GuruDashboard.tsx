import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Users, BookOpen, BarChart3, Calendar, Clock, Award, TrendingUp, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLearningStore } from '@/store/learningStore';
import mandalaElegant from '@/assets/mandala-elegant.png';

export function GuruDashboard() {
  const { setScreen } = useLearningStore();

  const stats = [
    { label: 'Active Śiṣyas', value: '24', icon: Users, color: 'from-blue-500 to-indigo-600' },
    { label: 'Sūtras Taught', value: '48', icon: BookOpen, color: 'from-amber-500 to-orange-600' },
    { label: 'Avg. Progress', value: '67%', icon: TrendingUp, color: 'from-emerald-500 to-teal-600' },
    { label: 'Certificates', value: '12', icon: Award, color: 'from-violet-500 to-purple-600' },
  ];

  const recentActivity = [
    { name: 'Arjun Sharma', action: 'completed Sūtra 1.2', time: '2 hours ago' },
    { name: 'Priya Patel', action: 'started vocabulary module', time: '4 hours ago' },
    { name: 'Vikram Singh', action: 'passed grammar assessment', time: '1 day ago' },
    { name: 'Meera Joshi', action: 'enrolled in course', time: '2 days ago' },
  ];

  const quickActions = [
    { label: 'View All Śiṣyas', icon: Users, action: () => {} },
    { label: 'Create Assessment', icon: FileText, action: () => {} },
    { label: 'Schedule Session', icon: Calendar, action: () => {} },
    { label: 'View Analytics', icon: BarChart3, action: () => setScreen('analytics') },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background mandala */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.04 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
        >
          <img src={mandalaElegant} alt="" className="w-full h-full object-contain" />
        </motion.div>
      </div>

      <Header showBack backTo="home" />

      <main className="py-8 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl font-sanskrit">गुरु</span>
              <h1 className="text-3xl font-serif font-bold text-foreground">Guru Dashboard</h1>
            </div>
            <p className="text-muted-foreground">
              गुरुर्ब्रह्मा गुरुर्विष्णुः — Guide your śiṣyas on their Sanskrit journey
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-5 hover:shadow-lg transition-shadow"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 shadow-lg`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 bg-card border border-border rounded-2xl p-6"
            >
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Recent Śiṣya Activity
              </h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground text-sm font-bold">
                        {activity.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{activity.name}</p>
                        <p className="text-sm text-muted-foreground">{activity.action}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card border border-border rounded-2xl p-6"
            >
              <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start gap-3 h-12"
                    onClick={action.action}
                  >
                    <action.icon className="w-5 h-5" />
                    {action.label}
                  </Button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Teaching Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  Continue Teaching: Samādhi Pāda
                </h3>
                <p className="text-sm text-muted-foreground">
                  Your current class is on Sūtra 1.3 — तदा द्रष्टुः स्वरूपेऽवस्थानम्
                </p>
              </div>
              <Button 
                onClick={() => setScreen('learning')}
                className="bg-primary hover:bg-primary/90"
              >
                Open Sūtra Panel
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
