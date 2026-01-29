import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X, User, GraduationCap, Heart, Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface ConnectionRequest {
  id: string;
  student_id: string;
  status: 'pending' | 'approved' | 'rejected';
  message: string | null;
  created_at: string;
  student: {
    full_name: string | null;
    avatar_url: string | null;
    bio: string | null;
    university: string | null;
    department: string | null;
  } | null;
  student_profile: {
    academic_level: string | null;
    qualifications: string | null;
    interests: string[] | null;
  } | null;
}

export function ConnectionRequests() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState<ConnectionRequest[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('pending');

  useEffect(() => {
    if (user) {
      fetchRequests();
    }
  }, [user]);

  const fetchRequests = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('connection_requests')
        .select(`
          id,
          student_id,
          status,
          message,
          created_at
        `)
        .eq('teacher_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch student profiles
      const enrichedRequests = await Promise.all(
        (data || []).map(async (req) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name, avatar_url, bio, university, department')
            .eq('user_id', req.student_id)
            .maybeSingle();

          const { data: studentProfile } = await supabase
            .from('student_profiles')
            .select('academic_level, qualifications, interests')
            .eq('user_id', req.student_id)
            .maybeSingle();

          return {
            ...req,
            status: req.status as 'pending' | 'approved' | 'rejected',
            student: profile,
            student_profile: studentProfile,
          };
        })
      );

      setRequests(enrichedRequests);
    } catch (error) {
      console.error('Error fetching requests:', error);
      toast.error('Failed to load connection requests');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (requestId: string, status: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('connection_requests')
        .update({ status })
        .eq('id', requestId);

      if (error) throw error;

      setRequests(requests.map(r => 
        r.id === requestId ? { ...r, status } : r
      ));

      toast.success(status === 'approved' ? 'Student approved!' : 'Request rejected');
    } catch (error) {
      console.error('Error updating request:', error);
      toast.error('Failed to update request');
    }
  };

  const filteredRequests = requests.filter(r => {
    if (filter === 'all') return true;
    return r.status === filter;
  });

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const approvedCount = requests.filter(r => r.status === 'approved').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card 
          className={`cursor-pointer transition-all ${filter === 'pending' ? 'ring-2 ring-primary' : ''}`}
          onClick={() => setFilter('pending')}
        >
          <CardContent className="py-4 text-center">
            <Clock className="w-6 h-6 mx-auto mb-2 text-amber-500" />
            <p className="text-2xl font-bold">{pendingCount}</p>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card 
          className={`cursor-pointer transition-all ${filter === 'approved' ? 'ring-2 ring-primary' : ''}`}
          onClick={() => setFilter('approved')}
        >
          <CardContent className="py-4 text-center">
            <Check className="w-6 h-6 mx-auto mb-2 text-emerald-500" />
            <p className="text-2xl font-bold">{approvedCount}</p>
            <p className="text-sm text-muted-foreground">Approved</p>
          </CardContent>
        </Card>
        <Card 
          className={`cursor-pointer transition-all ${filter === 'all' ? 'ring-2 ring-primary' : ''}`}
          onClick={() => setFilter('all')}
        >
          <CardContent className="py-4 text-center">
            <User className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">{requests.length}</p>
            <p className="text-sm text-muted-foreground">Total</p>
          </CardContent>
        </Card>
      </div>

      {/* Request List */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <User className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">
                {filter === 'pending' 
                  ? 'No pending requests'
                  : filter === 'approved'
                  ? 'No approved students yet'
                  : 'No connection requests yet'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredRequests.map((request) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardContent className="py-4">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <Avatar className="w-14 h-14 border-2 border-background shadow">
                      {request.student?.avatar_url ? (
                        <AvatarImage src={request.student.avatar_url} />
                      ) : null}
                      <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-bold">
                        {request.student?.full_name?.charAt(0) || 'S'}
                      </AvatarFallback>
                    </Avatar>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-foreground">
                          {request.student?.full_name || 'Unknown Student'}
                        </h4>
                        <Badge 
                          variant={
                            request.status === 'approved' ? 'default' : 
                            request.status === 'pending' ? 'secondary' : 'destructive'
                          }
                        >
                          {request.status}
                        </Badge>
                      </div>

                      {request.student?.university && (
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <GraduationCap className="w-4 h-4" />
                          {request.student.university}
                          {request.student.department && ` • ${request.student.department}`}
                        </p>
                      )}

                      {request.student_profile?.academic_level && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Level: {request.student_profile.academic_level}
                        </p>
                      )}

                      {request.student_profile?.interests && request.student_profile.interests.length > 0 && (
                        <div className="flex items-center gap-2 mt-2">
                          <Heart className="w-4 h-4 text-muted-foreground" />
                          <div className="flex flex-wrap gap-1">
                            {request.student_profile.interests.slice(0, 3).map((interest) => (
                              <Badge key={interest} variant="outline" className="text-xs">
                                {interest}
                              </Badge>
                            ))}
                            {request.student_profile.interests.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{request.student_profile.interests.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      {request.message && (
                        <p className="text-sm text-muted-foreground mt-2 italic">
                          "{request.message}"
                        </p>
                      )}

                      <p className="text-xs text-muted-foreground mt-2">
                        Requested: {format(new Date(request.created_at), 'PPP')}
                      </p>
                    </div>

                    {/* Actions */}
                    {request.status === 'pending' && (
                      <div className="flex gap-2 flex-shrink-0">
                        <Button
                          size="sm"
                          onClick={() => handleUpdateStatus(request.id, 'approved')}
                          className="gap-1"
                        >
                          <Check className="w-4 h-4" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdateStatus(request.id, 'rejected')}
                          className="gap-1"
                        >
                          <X className="w-4 h-4" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
