import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, Clock, BookOpen, Linkedin, Building2, GraduationCap, Users, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface TeacherWithProfile {
  user_id: string;
  faculty_type: 'permanent' | 'visiting';
  degree: string | null;
  profile: {
    full_name: string | null;
    avatar_url: string | null;
    bio: string | null;
    linkedin_url: string | null;
    university: string | null;
    department: string | null;
  } | null;
  publications_count: number;
  connection_status: 'none' | 'pending' | 'approved' | 'rejected';
}

export function GuruDiscoveryCard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [teachers, setTeachers] = useState<TeacherWithProfile[]>([]);
  const [stats, setStats] = useState({ total: 0, connected: 0, pending: 0 });
  
  // Request modal state
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherWithProfile | null>(null);
  const [requestMessage, setRequestMessage] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (user) {
      fetchTeachers();
    }
  }, [user]);

  const fetchTeachers = async () => {
    if (!user) return;
    
    try {
      // Fetch teacher profiles using the public view
      const { data: teacherProfiles, error } = await supabase
        .from('teacher_profiles_public')
        .select('user_id, faculty_type, degree');

      if (error) throw error;

      // Enrich with profile data and connection status
      const enrichedTeachers = await Promise.all(
        (teacherProfiles || []).map(async (tp) => {
          // Check connection status
          const { data: connection } = await supabase
            .from('connection_requests')
            .select('status')
            .eq('student_id', user.id)
            .eq('teacher_id', tp.user_id)
            .maybeSingle();
          
          const connectionStatus = (connection?.status as 'none' | 'pending' | 'approved' | 'rejected') || 'none';
          
          // Fetch profile data
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name, avatar_url, bio, linkedin_url, university, department')
            .eq('user_id', tp.user_id)
            .maybeSingle();

          // Count publications
          const { count } = await supabase
            .from('publications')
            .select('*', { count: 'exact', head: true })
            .eq('teacher_id', tp.user_id);

          return {
            user_id: tp.user_id,
            faculty_type: tp.faculty_type as 'permanent' | 'visiting',
            degree: tp.degree,
            profile,
            publications_count: count || 0,
            connection_status: connectionStatus,
          };
        })
      );

      setTeachers(enrichedTeachers);
      
      // Calculate stats
      const connected = enrichedTeachers.filter(t => t.connection_status === 'approved').length;
      const pending = enrichedTeachers.filter(t => t.connection_status === 'pending').length;
      setStats({
        total: enrichedTeachers.length,
        connected,
        pending,
      });
    } catch (error) {
      console.error('Error fetching teachers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendRequest = async () => {
    if (!user || !selectedTeacher) return;
    
    setSending(true);
    try {
      const { error } = await supabase
        .from('connection_requests')
        .insert({
          student_id: user.id,
          teacher_id: selectedTeacher.user_id,
          message: requestMessage || null,
        });

      if (error) throw error;

      // Update local state
      setTeachers(teachers.map(t => 
        t.user_id === selectedTeacher.user_id 
          ? { ...t, connection_status: 'pending' as const }
          : t
      ));
      
      setStats(prev => ({ ...prev, pending: prev.pending + 1 }));

      setShowRequestModal(false);
      setRequestMessage('');
      setSelectedTeacher(null);
      toast.success('Connection request sent to ' + (selectedTeacher.profile?.full_name || 'teacher') + '!');
    } catch (error) {
      console.error('Error sending request:', error);
      toast.error('Failed to send request');
    } finally {
      setSending(false);
    }
  };

  // Filter to show available teachers (not yet connected/pending)
  const availableTeachers = teachers.filter(t => t.connection_status === 'none');
  const connectedTeachers = teachers.filter(t => t.connection_status === 'approved');
  const pendingTeachers = teachers.filter(t => t.connection_status === 'pending');

  if (loading) {
    return (
      <Card className="bg-card border border-border">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            <span className="font-sanskrit">अध्याय-परम्परा</span>
          </CardTitle>
          <p className="text-sm text-muted-foreground">Guru-Śiṣya Lineage</p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="bg-card border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            <span className="font-sanskrit">अध्याय-परम्परा</span>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            गुरुशिष्यपरम्परा — The sacred lineage of knowledge transmission
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              <p className="text-xs text-muted-foreground">Available</p>
            </div>
            <div className="text-center p-3 bg-primary/10 rounded-lg">
              <p className="text-2xl font-bold text-primary">{stats.connected}</p>
              <p className="text-xs text-muted-foreground">Connected</p>
            </div>
            <div className="text-center p-3 bg-amber-500/10 rounded-lg">
              <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
          </div>

          {/* Connected Gurus */}
          {connectedTeachers.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span className="font-sanskrit">आचार्याः</span> — Your Gurus
              </h4>
              <div className="space-y-2">
                {connectedTeachers.slice(0, 2).map((teacher) => (
                  <div key={teacher.user_id} className="flex items-center gap-3 p-2 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    <Avatar className="w-10 h-10">
                      {teacher.profile?.avatar_url && <AvatarImage src={teacher.profile.avatar_url} />}
                      <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-sanskrit">
                        गु
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">
                        {teacher.profile?.full_name || 'Teacher'}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {teacher.profile?.university || teacher.degree || 'Guru'}
                      </p>
                    </div>
                    <Badge variant="outline" className="bg-emerald-100 text-emerald-700 border-emerald-300 text-xs">
                      Connected
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pending Requests */}
          {pendingTeachers.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" />
                <span className="font-sanskrit">प्रतीक्षा</span> — Awaiting Response
              </h4>
              <div className="space-y-2">
                {pendingTeachers.slice(0, 2).map((teacher) => (
                  <div key={teacher.user_id} className="flex items-center gap-3 p-2 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                    <Avatar className="w-10 h-10">
                      {teacher.profile?.avatar_url && <AvatarImage src={teacher.profile.avatar_url} />}
                      <AvatarFallback className="bg-gradient-to-br from-amber-500 to-amber-600 text-white font-sanskrit">
                        गु
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">
                        {teacher.profile?.full_name || 'Teacher'}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {teacher.profile?.university || teacher.degree || 'Awaiting response'}
                      </p>
                    </div>
                    <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-300 text-xs">
                      Pending
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Available Gurus to Connect */}
          {availableTeachers.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="font-sanskrit">उपलब्धाः गुरवः</span> — Available Gurus
              </h4>
              <ScrollArea className="max-h-[280px]">
                <div className="space-y-2 pr-2">
                  {availableTeachers.map((teacher, index) => (
                    <motion.div 
                      key={teacher.user_id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-3 p-3 bg-muted/30 hover:bg-muted/50 rounded-lg border border-border transition-colors"
                    >
                      <Avatar className="w-12 h-12 border-2 border-background shadow">
                        {teacher.profile?.avatar_url && <AvatarImage src={teacher.profile.avatar_url} />}
                        <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-sanskrit text-lg">
                          गु
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground text-sm truncate">
                            {teacher.profile?.full_name || 'Teacher'}
                          </p>
                          <Badge variant={teacher.faculty_type === 'permanent' ? 'default' : 'secondary'} className="text-[10px] px-1.5 py-0">
                            {teacher.faculty_type === 'permanent' ? 'Faculty' : 'Visiting'}
                          </Badge>
                        </div>
                        {teacher.degree && (
                          <p className="text-xs text-primary font-medium truncate">{teacher.degree}</p>
                        )}
                        {teacher.profile?.university && (
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                            <Building2 className="w-3 h-3" />
                            <span className="truncate">{teacher.profile.university}</span>
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                          {teacher.publications_count > 0 && (
                            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                              <BookOpen className="w-3 h-3" />
                              {teacher.publications_count}
                            </span>
                          )}
                          {teacher.profile?.linkedin_url && (
                            <a 
                              href={teacher.profile.linkedin_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Linkedin className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedTeacher(teacher);
                          setShowRequestModal(true);
                        }}
                        className="gap-1 text-xs shrink-0"
                      >
                        <Send className="w-3 h-3" />
                        Connect
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          {/* Empty State */}
          {teachers.length === 0 && (
            <div className="text-center py-6">
              <GraduationCap className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
              <p className="font-sanskrit text-primary text-lg mb-1">गुरुर्ब्रह्मा गुरुर्विष्णुः</p>
              <p className="text-muted-foreground text-sm">No gurus available yet</p>
              <p className="text-xs text-muted-foreground mt-1">The lineage awaits — check back later</p>
            </div>
          )}

          {/* All Connected State */}
          {teachers.length > 0 && availableTeachers.length === 0 && connectedTeachers.length === teachers.length && (
            <div className="text-center py-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <Check className="w-8 h-8 mx-auto text-emerald-500 mb-2" />
              <p className="font-sanskrit text-primary mb-1">परम्परा पूर्णा</p>
              <p className="text-sm font-medium text-foreground">Lineage Complete</p>
              <p className="text-xs text-muted-foreground">You're connected with all available gurus</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Connection Request Modal */}
      <Dialog open={showRequestModal} onOpenChange={setShowRequestModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="font-sanskrit">गुरुसेवा</span>
              — Seek guidance from {selectedTeacher?.profile?.full_name || 'Āchārya'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Teacher Preview */}
            {selectedTeacher && (
              <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                <Avatar className="w-14 h-14 border-2 border-background shadow">
                  {selectedTeacher.profile?.avatar_url && (
                    <AvatarImage src={selectedTeacher.profile.avatar_url} />
                  )}
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-sanskrit text-xl">
                    गु
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-foreground">
                    {selectedTeacher.profile?.full_name || 'Teacher'}
                  </p>
                  {selectedTeacher.degree && (
                    <p className="text-sm text-primary">{selectedTeacher.degree}</p>
                  )}
                  {selectedTeacher.profile?.university && (
                    <p className="text-sm text-muted-foreground">
                      {selectedTeacher.profile.university}
                    </p>
                  )}
                </div>
              </div>
            )}

            <p className="text-sm text-muted-foreground">
              Send a connection request to access their blogs, publications, and receive personalized guidance.
            </p>
            
            <Textarea
              placeholder="Introduce yourself and share why you'd like to connect (optional)..."
              value={requestMessage}
              onChange={(e) => setRequestMessage(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRequestModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendRequest} disabled={sending} className="gap-2">
              <Send className="w-4 h-4" />
              {sending ? 'Sending...' : 'Send Request'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}