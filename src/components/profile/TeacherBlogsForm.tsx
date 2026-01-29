import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit2, Save, X, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface Blog {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export function TeacherBlogsForm() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [teacherProfileId, setTeacherProfileId] = useState<string | null>(null);
  
  // New/Edit blog state
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      fetchBlogs();
    }
  }, [user]);

  const fetchBlogs = async () => {
    if (!user) return;
    
    try {
      // Get teacher profile ID
      const { data: tProfile } = await supabase
        .from('teacher_profiles')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (tProfile) {
        setTeacherProfileId(tProfile.id);

        // Fetch blogs
        const { data: blogsData } = await supabase
          .from('teacher_blogs')
          .select('*')
          .eq('teacher_id', tProfile.id)
          .order('created_at', { ascending: false });

        if (blogsData) {
          setBlogs(blogsData);
        }
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!teacherProfileId || !title.trim() || !content.trim()) {
      toast.error('Please fill in both title and content');
      return;
    }

    setSaving(true);

    try {
      if (editingId) {
        // Update existing blog
        const { error } = await supabase
          .from('teacher_blogs')
          .update({ title, content })
          .eq('id', editingId);

        if (error) throw error;

        setBlogs(blogs.map(b => 
          b.id === editingId 
            ? { ...b, title, content, updated_at: new Date().toISOString() }
            : b
        ));
        toast.success('Blog updated');
      } else {
        // Create new blog
        const { data, error } = await supabase
          .from('teacher_blogs')
          .insert({
            teacher_id: teacherProfileId,
            title,
            content,
          })
          .select()
          .single();

        if (error) throw error;
        setBlogs([data, ...blogs]);
        toast.success('Blog created');
      }

      resetForm();
    } catch (error) {
      console.error('Error saving blog:', error);
      toast.error('Failed to save blog');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (blog: Blog) => {
    setIsEditing(true);
    setEditingId(blog.id);
    setTitle(blog.title);
    setContent(blog.content);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('teacher_blogs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setBlogs(blogs.filter(b => b.id !== id));
      toast.success('Blog deleted');
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('Failed to delete blog');
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditingId(null);
    setTitle('');
    setContent('');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!teacherProfileId) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground">
            Please complete your teacher profile first to create blogs.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Create/Edit Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            {editingId ? 'Edit Blog/Note' : 'Create New Blog/Note'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Blog title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Write your blog content here... You can share notes, teachings, insights for your students."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
          />
          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={saving} className="gap-2">
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : editingId ? 'Update' : 'Publish'}
            </Button>
            {isEditing && (
              <Button variant="outline" onClick={resetForm} className="gap-2">
                <X className="w-4 h-4" />
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Blog List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Your Blogs & Notes</h3>
        
        {blogs.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <FileText className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">
                No blogs yet. Create your first blog to share with your students.
              </p>
            </CardContent>
          </Card>
        ) : (
          blogs.map((blog) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardContent className="py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground mb-1">{blog.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {blog.content}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Created: {format(new Date(blog.created_at), 'PPP')}
                        {blog.updated_at !== blog.created_at && (
                          <> • Updated: {format(new Date(blog.updated_at), 'PPP')}</>
                        )}
                      </p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(blog)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(blog.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
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
