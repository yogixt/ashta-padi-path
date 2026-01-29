import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Users, BookOpen, Clock, Award, TrendingUp, FileText, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLearningStore } from '@/store/learningStore';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import mandalaElegant from '@/assets/mandala-elegant.png';

interface ConnectedStudent {
  student_id: string;
  student_name: string | null;
  connected_at: string;
}

export function GuruDashboard() {
  const { setScreen } = useLearningStore();
  const { user } = useAuth();
  const [pendingRequests, setPendingRequests] = useState(0);
  const [approvedStudents, setApprovedStudents] = useState<ConnectedStudent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user) return;
    setLoading(true);
    
    try {
      // Fetch pending requests count
      const { count: pendingCount } = await supabase
        .from('connection_requests')
        .select('*', { count: 'exact', head: true })
        .eq('teacher_id', user.id)
        .eq('status', 'pending');
      setPendingRequests(pendingCount || 0);

      // Fetch approved students with their profiles
      const { data: connections } = await supabase
        .from('connection_requests')
        .select('student_id, created_at')
        .eq('teacher_id', user.id)
        .eq('status', 'approved');

      if (connections && connections.length > 0) {
        const studentIds = connections.map(c => c.student_id);
        const { data: profiles } = await supabase
          .from('profiles')
          .select('user_id, full_name')
          .in('user_id', studentIds);

        const studentsWithNames = connections.map(conn => ({
          student_id: conn.student_id,
          student_name: profiles?.find(p => p.user_id === conn.student_id)?.full_name || null,
          connected_at: conn.created_at
        }));
        setApprovedStudents(studentsWithNames);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Real stats from database
  const stats = [
    { label: 'Connected Śiṣyas', value: approvedStudents.length.toString(), icon: Users, color: 'from-blue-500 to-indigo-600' },
    { label: 'Pending Requests', value: pendingRequests.toString(), icon: Clock, color: 'from-amber-500 to-orange-600' },
  ];

  const quickActions = [
    { label: 'My Profile', icon: User, action: () => setScreen('teacher-profile') },
    { label: 'Student Requests', icon: Users, action: () => setScreen('teacher-profile'), badge: pendingRequests },
    { label: 'Create Assessment', icon: FileText, action: () => setScreen('assessments') },
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
            {/* Connected Students */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 bg-card border border-border rounded-2xl p-6"
            >
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Your Connected Śiṣyas
              </h2>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                </div>
              ) : approvedStudents.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No students connected yet</p>
                  <p className="text-sm mt-1">Students will appear here once you approve their connection requests</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {approvedStudents.map((student, index) => (
                    <div key={student.student_id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground text-sm font-bold font-sanskrit">
                          शि
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{student.student_name || 'Student'}</p>
                          <p className="text-sm text-muted-foreground">
                            Connected {new Date(student.connected_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                  ))}
                </div>
              )}
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
                    className="w-full justify-start gap-3 h-12 relative"
                    onClick={action.action}
                  >
                    <action.icon className="w-5 h-5" />
                    {action.label}
                    {action.badge && action.badge > 0 && (
                      <Badge className="absolute right-3 bg-primary">{action.badge}</Badge>
                    )}
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
