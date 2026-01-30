import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  FileText, 
  Users, 
  Trash2, 
  Save, 
  CheckCircle,
  ArrowLeft,
  Edit2
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useLearningStore } from '@/store/learningStore';
import { useToast } from '@/hooks/use-toast';
import mandalaElegant from '@/assets/mandala-elegant.png';

interface Question {
  id?: string;
  question_text: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  order_index: number;
}

interface Assessment {
  id: string;
  title: string;
  description: string;
  assessment_type: string;
  is_published: boolean;
  created_at: string;
}

interface ConnectedStudent {
  student_id: string;
  student_name: string | null;
}

export function AssessmentScreen() {
  const { user } = useAuth();
  const { setScreen } = useLearningStore();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState('create');
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [connectedStudents, setConnectedStudents] = useState<ConnectedStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // New assessment form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([
    { question_text: '', options: ['', '', '', ''], correct_answer: '', explanation: '', order_index: 0 }
  ]);
  
  // Assignment state
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    if (!user) return;
    setLoading(true);
    
    try {
      // Fetch assessments
      const { data: assessmentsData } = await supabase
        .from('assessments')
        .select('*')
        .eq('teacher_id', user.id)
        .order('created_at', { ascending: false });
      
      if (assessmentsData) {
        setAssessments(assessmentsData);
      }

      // Fetch connected students
      const { data: connections } = await supabase
        .from('connection_requests')
        .select('student_id')
        .eq('teacher_id', user.id)
        .eq('status', 'approved');

      if (connections && connections.length > 0) {
        const studentIds = connections.map(c => c.student_id);
        const { data: profiles } = await supabase
          .from('profiles')
          .select('user_id, full_name')
          .in('user_id', studentIds);

        const students = connections.map(conn => ({
          student_id: conn.student_id,
          student_name: profiles?.find(p => p.user_id === conn.student_id)?.full_name || 'Student'
        }));
        setConnectedStudents(students);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question_text: '', options: ['', '', '', ''], correct_answer: '', explanation: '', order_index: questions.length }
    ]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const updateQuestion = (index: number, field: keyof Question, value: string | string[]) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuestions(updated);
  };

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const updated = [...questions];
    const newOptions = [...updated[questionIndex].options];
    newOptions[optionIndex] = value;
    updated[questionIndex] = { ...updated[questionIndex], options: newOptions };
    setQuestions(updated);
  };

  const saveAssessment = async (publish: boolean = false) => {
    if (!user || !title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title for the assessment",
        variant: "destructive"
      });
      return;
    }

    // Validate questions
    const validQuestions = questions.filter(q => 
      q.question_text.trim() && 
      q.options.some(o => o.trim()) && 
      q.correct_answer.trim()
    );

    if (validQuestions.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one complete question",
        variant: "destructive"
      });
      return;
    }

    setSaving(true);
    
    try {
      // Create assessment
      const { data: assessment, error: assessmentError } = await supabase
        .from('assessments')
        .insert({
          teacher_id: user.id,
          title: title.trim(),
          description: description.trim(),
          assessment_type: 'custom',
          is_published: publish
        })
        .select()
        .single();

      if (assessmentError) throw assessmentError;

      // Create questions
      const questionsToInsert = validQuestions.map((q, idx) => ({
        assessment_id: assessment.id,
        question_text: q.question_text.trim(),
        options: q.options.filter(o => o.trim()),
        correct_answer: q.correct_answer.trim(),
        explanation: q.explanation.trim(),
        order_index: idx
      }));

      const { error: questionsError } = await supabase
        .from('assessment_questions')
        .insert(questionsToInsert);

      if (questionsError) throw questionsError;

      toast({
        title: "Success",
        description: `Assessment ${publish ? 'published' : 'saved'} successfully!`
      });

      // Reset form and refresh
      setTitle('');
      setDescription('');
      setQuestions([{ question_text: '', options: ['', '', '', ''], correct_answer: '', explanation: '', order_index: 0 }]);
      fetchData();
      setActiveTab('manage');
    } catch (error) {
      console.error('Error saving assessment:', error);
      toast({
        title: "Error",
        description: "Failed to save assessment",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const assignAssessment = async () => {
    if (!selectedAssessment || selectedStudents.length === 0) {
      toast({
        title: "Error",
        description: "Please select an assessment and at least one student",
        variant: "destructive"
      });
      return;
    }

    setSaving(true);
    
    try {
      const assignments = selectedStudents.map(studentId => ({
        assessment_id: selectedAssessment,
        student_id: studentId
      }));

      const { error } = await supabase
        .from('assessment_assignments')
        .upsert(assignments, { onConflict: 'assessment_id,student_id' });

      if (error) throw error;

      toast({
        title: "Success",
        description: `Assessment assigned to ${selectedStudents.length} student(s)!`
      });

      setSelectedAssessment(null);
      setSelectedStudents([]);
    } catch (error) {
      console.error('Error assigning assessment:', error);
      toast({
        title: "Error",
        description: "Failed to assign assessment",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const deleteAssessment = async (id: string) => {
    try {
      const { error } = await supabase
        .from('assessments')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Deleted",
        description: "Assessment deleted successfully"
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting:', error);
      toast({
        title: "Error",
        description: "Failed to delete assessment",
        variant: "destructive"
      });
    }
  };

  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background decorations with rotating mandalas */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 0.05, rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -right-24 w-80 h-80"
        >
          <img src={mandalaElegant} alt="" className="w-full h-full object-contain" />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 0.04, rotate: -360 }}
          transition={{ duration: 130, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-24 -left-24 w-80 h-80"
        >
          <img src={mandalaElegant} alt="" className="w-full h-full object-contain" />
        </motion.div>
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 section-pattern opacity-20" />
      </div>

      <Header showBack backTo="guru-dashboard" />

      <main className="py-8 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl font-sanskrit">परीक्षा</span>
              <h1 className="text-3xl font-serif font-bold text-foreground">Assessments</h1>
            </div>
            <p className="text-muted-foreground">
              Create custom quizzes or assign assessments to your students
            </p>
          </motion.div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="create" className="gap-2">
                <Plus className="w-4 h-4" />
                Create New
              </TabsTrigger>
              <TabsTrigger value="manage" className="gap-2">
                <FileText className="w-4 h-4" />
                My Assessments
              </TabsTrigger>
              <TabsTrigger value="assign" className="gap-2">
                <Users className="w-4 h-4" />
                Assign
              </TabsTrigger>
            </TabsList>

            {/* Create New Assessment */}
            <TabsContent value="create">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Edit2 className="w-5 h-5 text-primary" />
                      Create Custom Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <Input
                        placeholder="Assessment Title (e.g., Samādhi Pāda Quiz)"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-lg"
                      />
                      <Textarea
                        placeholder="Description (optional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={2}
                      />
                    </div>

                    <div className="space-y-6">
                      <h3 className="font-semibold text-foreground">Questions</h3>
                      
                      {questions.map((question, qIndex) => (
                        <Card key={qIndex} className="border-border bg-muted/20">
                          <CardContent className="pt-4 space-y-4">
                            <div className="flex items-center justify-between">
                              <Badge variant="secondary">Question {qIndex + 1}</Badge>
                              {questions.length > 1 && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeQuestion(qIndex)}
                                  className="text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                            
                            <Textarea
                              placeholder="Enter your question..."
                              value={question.question_text}
                              onChange={(e) => updateQuestion(qIndex, 'question_text', e.target.value)}
                              rows={2}
                            />

                            <div className="grid grid-cols-2 gap-3">
                              {question.options.map((option, oIndex) => (
                                <div key={oIndex} className="flex items-center gap-2">
                                  <span className="text-sm font-medium text-muted-foreground w-6">
                                    {String.fromCharCode(65 + oIndex)}.
                                  </span>
                                  <Input
                                    placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
                                    value={option}
                                    onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                                  />
                                </div>
                              ))}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm text-muted-foreground mb-1 block">
                                  Correct Answer (A, B, C, or D)
                                </label>
                                <Input
                                  placeholder="e.g., B"
                                  value={question.correct_answer}
                                  onChange={(e) => updateQuestion(qIndex, 'correct_answer', e.target.value.toUpperCase())}
                                  maxLength={1}
                                />
                              </div>
                              <div>
                                <label className="text-sm text-muted-foreground mb-1 block">
                                  Explanation (optional)
                                </label>
                                <Input
                                  placeholder="Why is this correct?"
                                  value={question.explanation}
                                  onChange={(e) => updateQuestion(qIndex, 'explanation', e.target.value)}
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                      <Button
                        variant="outline"
                        onClick={addQuestion}
                        className="w-full gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Question
                      </Button>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-border">
                      <Button
                        onClick={() => saveAssessment(false)}
                        variant="outline"
                        disabled={saving}
                        className="gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Save Draft
                      </Button>
                      <Button
                        onClick={() => saveAssessment(true)}
                        disabled={saving}
                        className="gap-2 bg-primary"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Publish
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Manage Assessments */}
            <TabsContent value="manage">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                  </div>
                ) : assessments.length === 0 ? (
                  <Card className="border-border">
                    <CardContent className="py-12 text-center">
                      <FileText className="w-12 h-12 mx-auto mb-3 text-muted-foreground/30" />
                      <p className="text-muted-foreground">No assessments created yet</p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => setActiveTab('create')}
                      >
                        Create your first assessment
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  assessments.map((assessment) => (
                    <Card key={assessment.id} className="border-border">
                      <CardContent className="py-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-foreground">{assessment.title}</h3>
                              <Badge variant={assessment.is_published ? "default" : "secondary"}>
                                {assessment.is_published ? 'Published' : 'Draft'}
                              </Badge>
                            </div>
                            {assessment.description && (
                              <p className="text-sm text-muted-foreground">{assessment.description}</p>
                            )}
                            <p className="text-xs text-muted-foreground mt-1">
                              Created {new Date(assessment.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedAssessment(assessment.id);
                                setActiveTab('assign');
                              }}
                            >
                              <Users className="w-4 h-4 mr-1" />
                              Assign
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteAssessment(assessment.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </motion.div>
            </TabsContent>

            {/* Assign to Students */}
            <TabsContent value="assign">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      Assign Assessment to Students
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Select Assessment */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Select Assessment
                      </label>
                      <div className="grid gap-2">
                        {assessments.filter(a => a.is_published).length === 0 ? (
                          <p className="text-sm text-muted-foreground py-4">
                            No published assessments. Create and publish an assessment first.
                          </p>
                        ) : (
                          assessments.filter(a => a.is_published).map(assessment => (
                            <button
                              key={assessment.id}
                              onClick={() => setSelectedAssessment(assessment.id)}
                              className={`p-3 text-left rounded-lg border transition-colors ${
                                selectedAssessment === assessment.id 
                                  ? 'border-primary bg-primary/10' 
                                  : 'border-border hover:border-primary/50'
                              }`}
                            >
                              <span className="font-medium">{assessment.title}</span>
                            </button>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Select Students */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Select Students
                      </label>
                      {connectedStudents.length === 0 ? (
                        <p className="text-sm text-muted-foreground py-4">
                          No connected students. Students need to connect with you first.
                        </p>
                      ) : (
                        <div className="grid gap-2">
                          {connectedStudents.map(student => (
                            <button
                              key={student.student_id}
                              onClick={() => toggleStudentSelection(student.student_id)}
                              className={`p-3 text-left rounded-lg border transition-colors flex items-center gap-3 ${
                                selectedStudents.includes(student.student_id) 
                                  ? 'border-primary bg-primary/10' 
                                  : 'border-border hover:border-primary/50'
                              }`}
                            >
                              <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                                selectedStudents.includes(student.student_id) 
                                  ? 'bg-primary border-primary' 
                                  : 'border-muted-foreground/30'
                              }`}>
                                {selectedStudents.includes(student.student_id) && (
                                  <CheckCircle className="w-3 h-3 text-primary-foreground" />
                                )}
                              </div>
                              <span className="font-medium">{student.student_name}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <Button
                      onClick={assignAssessment}
                      disabled={saving || !selectedAssessment || selectedStudents.length === 0}
                      className="w-full gap-2"
                    >
                      <Users className="w-4 h-4" />
                      Assign to {selectedStudents.length} Student{selectedStudents.length !== 1 ? 's' : ''}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}