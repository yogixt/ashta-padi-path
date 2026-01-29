import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, X, GraduationCap, Heart, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ImageUpload } from './ImageUpload';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const INTEREST_SUGGESTIONS = [
  'Yoga Philosophy',
  'Vedanta',
  'Sanskrit Grammar',
  'Meditation',
  'Bhagavad Gita',
  'Upanishads',
  'Ayurveda',
  'Patanjali',
  'Tantra',
  'Jyotish',
];

export function StudentProfileForm() {
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
  
  // Student-specific
  const [academicLevel, setAcademicLevel] = useState('');
  const [qualifications, setQualifications] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [newInterest, setNewInterest] = useState('');
  const [studentProfileExists, setStudentProfileExists] = useState(false);

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

      // Fetch student profile
      const { data: sProfile } = await supabase
        .from('student_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (sProfile) {
        setStudentProfileExists(true);
        setAcademicLevel(sProfile.academic_level || '');
        setQualifications(sProfile.qualifications || '');
        setInterests(sProfile.interests || []);
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

      // Upsert student profile
      if (studentProfileExists) {
        const { error: updateError } = await supabase
          .from('student_profiles')
          .update({
            academic_level: academicLevel,
            qualifications,
            interests,
          })
          .eq('user_id', user.id);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('student_profiles')
          .insert({
            user_id: user.id,
            academic_level: academicLevel,
            qualifications,
            interests,
          });

        if (insertError) throw insertError;
        setStudentProfileExists(true);
      }

      toast.success('Profile saved successfully');
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  const addInterest = (interest: string) => {
    const trimmed = interest.trim();
    if (trimmed && !interests.includes(trimmed)) {
      setInterests([...interests, trimmed]);
    }
    setNewInterest('');
  };

  const removeInterest = (interest: string) => {
    setInterests(interests.filter(i => i !== interest));
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
            fallbackText="शि"
          />
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
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
                placeholder="Your full name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="academicLevel">Academic Level</Label>
              <Input
                id="academicLevel"
                value={academicLevel}
                onChange={(e) => setAcademicLevel(e.target.value)}
                placeholder="e.g., Graduate, Post-Graduate, PhD"
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
                placeholder="Your university or institution"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="department">Department / Field</Label>
              <Input
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g., Sanskrit Studies, Philosophy"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">About Me</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell teachers about yourself, your goals, and why you want to learn Sanskrit..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn Profile (optional)</Label>
            <Input
              id="linkedin"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>
        </CardContent>
      </Card>

      {/* Qualifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Qualifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={qualifications}
            onChange={(e) => setQualifications(e.target.value)}
            placeholder="List your relevant qualifications, degrees, certifications..."
            rows={3}
          />
        </CardContent>
      </Card>

      {/* Interests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            Areas of Interest
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current interests */}
          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <motion.div
                key={interest}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Badge variant="secondary" className="gap-1 px-3 py-1">
                  {interest}
                  <button
                    type="button"
                    onClick={() => removeInterest(interest)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              </motion.div>
            ))}
          </div>

          {/* Add new interest */}
          <div className="flex gap-2">
            <Input
              placeholder="Add an interest..."
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addInterest(newInterest);
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => addInterest(newInterest)}
              disabled={!newInterest.trim()}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* Suggestions */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">Suggestions:</p>
            <div className="flex flex-wrap gap-2">
              {INTEREST_SUGGESTIONS.filter(s => !interests.includes(s)).map((suggestion) => (
                <Badge
                  key={suggestion}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary/10 transition-colors"
                  onClick={() => addInterest(suggestion)}
                >
                  <Plus className="w-3 h-3 mr-1" />
                  {suggestion}
                </Badge>
              ))}
            </div>
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
