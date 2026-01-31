import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Send, Check, Clock, BookOpen, Linkedin, Video, GraduationCap, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface TeacherWithProfile {
  user_id: string;
  faculty_type: 'permanent' | 'visiting';
  degree: string | null;
  // Meeting links only visible to approved students (fetched separately)
  zoom_link: string | null;
  gmeet_link: string | null;
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

export function BrowseTeachers() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [teachers, setTeachers] = useState<TeacherWithProfile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
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
      // Fetch teacher profiles using the public view (excludes meeting links for security)
      const { data: teacherProfiles, error } = await supabase
        .from('teacher_profiles_public')
        .select('user_id, faculty_type, degree');

      if (error) throw error;

      // Enrich with profile data and connection status
      const enrichedTeachers = await Promise.all(
        (teacherProfiles || []).map(async (tp) => {
          // Check connection status first
          const { data: connection } = await supabase
            .from('connection_requests')
            .select('status')
            .eq('student_id', user.id)
            .eq('teacher_id', tp.user_id)
            .maybeSingle();
          
          const connectionStatus = (connection?.status as 'none' | 'pending' | 'approved' | 'rejected') || 'none';
          
          // Fetch profile data - for teachers, their profiles should be visible
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name, avatar_url, bio, linkedin_url, university, department')
            .eq('user_id', tp.user_id)
            .maybeSingle();

          // Only fetch meeting links if approved (via full teacher_profiles table)
          let meetingLinks = { zoom_link: null, gmeet_link: null };
          if (connectionStatus === 'approved') {
            const { data: fullProfile } = await supabase
              .from('teacher_profiles')
              .select('zoom_link, gmeet_link')
              .eq('user_id', tp.user_id)
              .maybeSingle();
            if (fullProfile) {
              meetingLinks = fullProfile;
            }
          }

          // Count publications (RLS will handle visibility)
          const { count } = await supabase
            .from('publications')
            .select('*', { count: 'exact', head: true })
            .eq('teacher_id', tp.user_id);

          return {
            user_id: tp.user_id,
            faculty_type: tp.faculty_type as 'permanent' | 'visiting',
            degree: tp.degree,
            zoom_link: meetingLinks.zoom_link,
            gmeet_link: meetingLinks.gmeet_link,
            profile,
            publications_count: count || 0,
            connection_status: connectionStatus,
          };
        })
      );

      setTeachers(enrichedTeachers);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      toast.error('Failed to load teachers');
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

      setShowRequestModal(false);
      setRequestMessage('');
      setSelectedTeacher(null);
      toast.success('Connection request sent!');
    } catch (error) {
      console.error('Error sending request:', error);
      toast.error('Failed to send request');
    } finally {
      setSending(false);
    }
  };

  const filteredTeachers = teachers.filter(t => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      t.profile?.full_name?.toLowerCase().includes(query) ||
      t.profile?.university?.toLowerCase().includes(query) ||
      t.profile?.department?.toLowerCase().includes(query) ||
      t.degree?.toLowerCase().includes(query)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search teachers by name, university, or expertise..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Teachers Grid */}
      {filteredTeachers.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <GraduationCap className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">
              {searchQuery ? 'No teachers found matching your search' : 'No teachers available yet'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTeachers.map((teacher) => (
            <motion.div
              key={teacher.user_id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="h-full">
                <CardContent className="py-4">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <Avatar className="w-16 h-16 border-2 border-background shadow">
                      {teacher.profile?.avatar_url ? (
                        <AvatarImage src={teacher.profile.avatar_url} />
                      ) : null}
                      <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-xl font-bold font-sanskrit">
                        गु
                      </AvatarFallback>
                    </Avatar>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-foreground truncate">
                          {teacher.profile?.full_name || 'Teacher'}
                        </h4>
                        <Badge variant={teacher.faculty_type === 'permanent' ? 'default' : 'secondary'}>
                          {teacher.faculty_type === 'permanent' ? 'Faculty' : 'Visiting'}
                        </Badge>
                      </div>

                      {teacher.degree && (
                        <p className="text-sm text-primary font-medium">{teacher.degree}</p>
                      )}

                      {teacher.profile?.university && (
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <Building2 className="w-4 h-4" />
                          {teacher.profile.university}
                        </p>
                      )}

                      {teacher.profile?.bio && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                          {teacher.profile.bio}
                        </p>
                      )}

                      {/* Stats & Links */}
                      <div className="flex items-center gap-3 mt-3">
                        {teacher.publications_count > 0 && (
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            {teacher.publications_count} publications
                          </span>
                        )}
                        {teacher.profile?.linkedin_url && (
                          <a 
                            href={teacher.profile.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary"
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}
                        {/* Only show meeting link icon for approved connections */}
                        {teacher.connection_status === 'approved' && (teacher.zoom_link || teacher.gmeet_link) && (
                          <Video className="w-4 h-4 text-primary" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-4 pt-3 border-t border-border">
                    {teacher.connection_status === 'none' && (
                      <Button
                        className="w-full gap-2"
                        onClick={() => {
                          setSelectedTeacher(teacher);
                          setShowRequestModal(true);
                        }}
                      >
                        <Send className="w-4 h-4" />
                        Send Connection Request
                      </Button>
                    )}
                    {teacher.connection_status === 'pending' && (
                      <Button className="w-full gap-2" variant="secondary" disabled>
                        <Clock className="w-4 h-4" />
                        Request Pending
                      </Button>
                    )}
                    {teacher.connection_status === 'approved' && (
                      <Button className="w-full gap-2" variant="outline" disabled>
                        <Check className="w-4 h-4 text-emerald-500" />
                        Connected
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Request Modal */}
      <Dialog open={showRequestModal} onOpenChange={setShowRequestModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect with {selectedTeacher?.profile?.full_name || 'Teacher'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              Send a connection request to access their blogs, notes, and publications.
            </p>
            <Textarea
              placeholder="Add a personal message (optional)..."
              value={requestMessage}
              onChange={(e) => setRequestMessage(e.target.value)}
              rows={4}
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
    </div>
  );
}
