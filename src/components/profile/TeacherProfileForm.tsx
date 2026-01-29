import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2, BookOpen, FileText, Video, Linkedin, Building2, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImageUpload } from './ImageUpload';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface Publication {
  id?: string;
  title: string;
  description: string;
  publication_type: 'book' | 'paper' | 'conference';
  url: string;
  published_year: number | null;
}

interface TeacherProfile {
  faculty_type: 'permanent' | 'visiting';
  degree: string;
  zoom_link: string;
  gmeet_link: string;
}

export function TeacherProfileForm() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Basic profile
  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [bio, setBio] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [university, setUniversity] = useState('');
  const [department, setDepartment] = useState('');
  
  // Teacher-specific
  const [teacherProfile, setTeacherProfile] = useState<TeacherProfile>({
    faculty_type: 'permanent',
    degree: '',
    zoom_link: '',
    gmeet_link: '',
  });
  const [teacherProfileId, setTeacherProfileId] = useState<string | null>(null);
  
  // Publications
  const [publications, setPublications] = useState<Publication[]>([]);
  const [newPublication, setNewPublication] = useState<Publication>({
    title: '',
    description: '',
    publication_type: 'paper',
    url: '',
    published_year: null,
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      // Fetch basic profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (profile) {
        setFullName(profile.full_name || '');
        setAvatarUrl(profile.avatar_url || '');
        setBio(profile.bio || '');
        setLinkedinUrl(profile.linkedin_url || '');
        setUniversity(profile.university || '');
        setDepartment(profile.department || '');
      }

      // Fetch teacher profile
      const { data: tProfile } = await supabase
        .from('teacher_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (tProfile) {
        setTeacherProfileId(tProfile.id);
        setTeacherProfile({
          faculty_type: tProfile.faculty_type as 'permanent' | 'visiting',
          degree: tProfile.degree || '',
          zoom_link: tProfile.zoom_link || '',
          gmeet_link: tProfile.gmeet_link || '',
        });

        // Fetch publications
        const { data: pubs } = await supabase
          .from('publications')
          .select('*')
          .eq('teacher_id', tProfile.id)
          .order('published_year', { ascending: false });

        if (pubs) {
          setPublications(pubs.map(p => ({
            id: p.id,
            title: p.title,
            description: p.description || '',
            publication_type: p.publication_type as 'book' | 'paper' | 'conference',
            url: p.url || '',
            published_year: p.published_year,
          })));
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);

    try {
      // Update basic profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          avatar_url: avatarUrl,
          bio,
          linkedin_url: linkedinUrl,
          university,
          department,
        })
        .eq('user_id', user.id);

      if (profileError) throw profileError;

      // Upsert teacher profile
      let tProfileId = teacherProfileId;
      if (!tProfileId) {
        const { data: newTProfile, error: insertError } = await supabase
          .from('teacher_profiles')
          .insert({
            user_id: user.id,
            ...teacherProfile,
          })
          .select('id')
          .single();

        if (insertError) throw insertError;
        tProfileId = newTProfile.id;
        setTeacherProfileId(tProfileId);
      } else {
        const { error: updateError } = await supabase
          .from('teacher_profiles')
          .update(teacherProfile)
          .eq('id', tProfileId);

        if (updateError) throw updateError;
      }

      toast.success('Profile saved successfully');
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  const handleAddPublication = async () => {
    if (!teacherProfileId || !newPublication.title.trim()) {
      toast.error('Please enter a publication title');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('publications')
        .insert({
          teacher_id: teacherProfileId,
          ...newPublication,
        })
        .select()
        .single();

      if (error) throw error;

      setPublications([...publications, {
        id: data.id,
        ...newPublication,
      }]);
      
      setNewPublication({
        title: '',
        description: '',
        publication_type: 'paper',
        url: '',
        published_year: null,
      });
      
      toast.success('Publication added');
    } catch (error) {
      console.error('Error adding publication:', error);
      toast.error('Failed to add publication');
    }
  };

  const handleDeletePublication = async (id: string) => {
    try {
      const { error } = await supabase
        .from('publications')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setPublications(publications.filter(p => p.id !== id));
      toast.success('Publication removed');
    } catch (error) {
      console.error('Error deleting publication:', error);
      toast.error('Failed to delete publication');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Picture */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="font-sanskrit">चित्रम्</span>
            Profile Picture
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ImageUpload
            currentImageUrl={avatarUrl}
            onImageChange={setAvatarUrl}
            fallbackText="गु"
          />
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Dr. Example Name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="degree">Degree / Qualification</Label>
              <Input
                id="degree"
                value={teacherProfile.degree}
                onChange={(e) => setTeacherProfile({ ...teacherProfile, degree: e.target.value })}
                placeholder="Ph.D. Sanskrit, M.A. Philosophy"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="university">University / Institution</Label>
              <Input
                id="university"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                placeholder="Sanskrit University, Varanasi"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Department of Yoga & Philosophy"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="facultyType">Faculty Type</Label>
            <Select
              value={teacherProfile.faculty_type}
              onValueChange={(value: 'permanent' | 'visiting') => 
                setTeacherProfile({ ...teacherProfile, faculty_type: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="permanent">Permanent Faculty</SelectItem>
                <SelectItem value="visiting">Visiting Faculty</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Brief description of your background and expertise..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Links */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="w-5 h-5 text-primary" />
            Contact & Meeting Links
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="zoom">Zoom Meeting Link</Label>
              <Input
                id="zoom"
                value={teacherProfile.zoom_link}
                onChange={(e) => setTeacherProfile({ ...teacherProfile, zoom_link: e.target.value })}
                placeholder="https://zoom.us/j/..."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="gmeet">Google Meet Link</Label>
              <Input
                id="gmeet"
                value={teacherProfile.gmeet_link}
                onChange={(e) => setTeacherProfile({ ...teacherProfile, gmeet_link: e.target.value })}
                placeholder="https://meet.google.com/..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin">
              <Linkedin className="w-4 h-4 inline mr-2" />
              LinkedIn Profile
            </Label>
            <Input
              id="linkedin"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>
        </CardContent>
      </Card>

      {/* Publications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Publications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Existing publications */}
          {publications.map((pub) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg border border-border"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                {pub.publication_type === 'book' ? (
                  <BookOpen className="w-5 h-5 text-primary" />
                ) : pub.publication_type === 'conference' ? (
                  <GraduationCap className="w-5 h-5 text-primary" />
                ) : (
                  <FileText className="w-5 h-5 text-primary" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{pub.title}</p>
                <p className="text-sm text-muted-foreground">
                  {pub.publication_type.charAt(0).toUpperCase() + pub.publication_type.slice(1)}
                  {pub.published_year && ` • ${pub.published_year}`}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive hover:text-destructive flex-shrink-0"
                onClick={() => pub.id && handleDeletePublication(pub.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </motion.div>
          ))}

          {/* Add new publication */}
          <div className="p-4 border-2 border-dashed border-border rounded-lg space-y-3">
            <p className="text-sm font-medium text-muted-foreground">Add Publication</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                placeholder="Publication title"
                value={newPublication.title}
                onChange={(e) => setNewPublication({ ...newPublication, title: e.target.value })}
              />
              <Select
                value={newPublication.publication_type}
                onValueChange={(value: 'book' | 'paper' | 'conference') => 
                  setNewPublication({ ...newPublication, publication_type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="book">Book</SelectItem>
                  <SelectItem value="paper">Research Paper</SelectItem>
                  <SelectItem value="conference">Conference Paper</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                placeholder="URL (optional)"
                value={newPublication.url}
                onChange={(e) => setNewPublication({ ...newPublication, url: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Year published"
                value={newPublication.published_year || ''}
                onChange={(e) => setNewPublication({ 
                  ...newPublication, 
                  published_year: e.target.value ? parseInt(e.target.value) : null 
                })}
              />
            </div>
            <Textarea
              placeholder="Brief description (optional)"
              value={newPublication.description}
              onChange={(e) => setNewPublication({ ...newPublication, description: e.target.value })}
              rows={2}
            />
            <Button onClick={handleAddPublication} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Publication
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} className="gap-2" size="lg">
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save Profile'}
        </Button>
      </div>
    </div>
  );
}
