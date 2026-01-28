import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpen, GraduationCap, ArrowLeft, Mail, Lock, User, Loader2 } from 'lucide-react';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import mandalaDecorative from '@/assets/mandala-decorative.png';
import mandalaCorner from '@/assets/mandala-corner.png';

const signUpSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['student', 'teacher'])
});

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});

type UserRole = 'student' | 'teacher';

export default function AuthPage() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      if (mode === 'signup') {
        const result = signUpSchema.safeParse({ fullName, email, password, role: selectedRole });
        
        if (!result.success) {
          const fieldErrors: Record<string, string> = {};
          result.error.errors.forEach(err => {
            if (err.path[0]) {
              fieldErrors[err.path[0] as string] = err.message;
            }
          });
          setErrors(fieldErrors);
          setIsLoading(false);
          return;
        }

        const { error } = await signUp(email, password, fullName, selectedRole!);
        
        if (error) {
          if (error.message.includes('already registered')) {
            toast({
              title: 'Account exists',
              description: 'This email is already registered. Please sign in instead.',
              variant: 'destructive'
            });
          } else {
            toast({
              title: 'Sign up failed',
              description: error.message,
              variant: 'destructive'
            });
          }
        } else {
          toast({
            title: 'Check your email',
            description: 'We sent you a verification link. Please check your inbox.',
          });
        }
      } else {
        const result = signInSchema.safeParse({ email, password });
        
        if (!result.success) {
          const fieldErrors: Record<string, string> = {};
          result.error.errors.forEach(err => {
            if (err.path[0]) {
              fieldErrors[err.path[0] as string] = err.message;
            }
          });
          setErrors(fieldErrors);
          setIsLoading(false);
          return;
        }

        const { error } = await signIn(email, password);
        
        if (error) {
          if (error.message.includes('Invalid login')) {
            toast({
              title: 'Invalid credentials',
              description: 'Please check your email and password.',
              variant: 'destructive'
            });
          } else if (error.message.includes('Email not confirmed')) {
            toast({
              title: 'Email not verified',
              description: 'Please verify your email before signing in.',
              variant: 'destructive'
            });
          } else {
            toast({
              title: 'Sign in failed',
              description: error.message,
              variant: 'destructive'
            });
          }
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const showRoleSelection = mode === 'signup' && !selectedRole;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50/30 to-amber-100/50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Mandala background decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Large center mandala - very subtle */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
          animate={{ opacity: 0.06, scale: 1, rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
        >
          <img src={mandalaDecorative} alt="" className="w-full h-full object-contain" />
        </motion.div>
        
        {/* Top-right corner mandala */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 0.15, x: 0 }}
          transition={{ duration: 1 }}
          className="absolute -top-20 -right-20 w-64 h-64"
        >
          <img src={mandalaCorner} alt="" className="w-full h-full object-contain" />
        </motion.div>
        
        {/* Bottom-left corner mandala */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 0.15, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute -bottom-20 -left-20 w-64 h-64 rotate-180"
        >
          <img src={mandalaCorner} alt="" className="w-full h-full object-contain" />
        </motion.div>
        
        {/* Decorative gradient overlays */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-amber-200/20 via-orange-100/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-amber-200/20 via-orange-100/10 to-transparent rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white text-3xl font-sanskrit mb-4 shadow-lg shadow-amber-500/25">
            ॐ
          </div>
          <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">Ashta Padi</h1>
          <p className="text-slate-500 mt-1">Learn Sanskrit through Yoga Sutras</p>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/60 overflow-hidden">
          <AnimatePresence mode="wait">
            {showRoleSelection ? (
              <motion.div
                key="role-selection"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8"
              >
                <h2 className="text-xl font-semibold text-slate-900 text-center mb-2">
                  अहं अस्मि...
                </h2>
                <p className="text-slate-500 text-center text-sm mb-8">
                  Choose your path to personalize your learning journey
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setSelectedRole('student')}
                    className="group p-6 rounded-xl border-2 border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 transition-all duration-200 text-center"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform shadow-lg shadow-blue-500/25">
                      <BookOpen className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-semibold text-slate-900 font-sanskrit text-lg">शिष्य</h3>
                    <p className="text-xs text-slate-600 mt-0.5">Śiṣya</p>
                    <p className="text-xs text-slate-500 mt-1">Learn & practice</p>
                  </button>

                  <button
                    onClick={() => setSelectedRole('teacher')}
                    className="group p-6 rounded-xl border-2 border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 transition-all duration-200 text-center"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform shadow-lg shadow-amber-500/25">
                      <GraduationCap className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-semibold text-slate-900 font-sanskrit text-lg">गुरु</h3>
                    <p className="text-xs text-slate-600 mt-0.5">Guru</p>
                    <p className="text-xs text-slate-500 mt-1">Guide & instruct</p>
                  </button>
                </div>

                <button
                  onClick={() => setMode('signin')}
                  className="w-full mt-6 text-sm text-slate-500 hover:text-slate-700 transition-colors"
                >
                  Already have an account? <span className="text-amber-600 font-medium">Sign in</span>
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8"
              >
                {mode === 'signup' && selectedRole && (
                  <button
                    onClick={() => setSelectedRole(null)}
                    className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-4 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Change role
                  </button>
                )}

                <h2 className="text-xl font-semibold text-slate-900 mb-1">
                  {mode === 'signin' ? 'स्वागतम्' : `Sign up as ${selectedRole === 'student' ? 'Śiṣya (शिष्य)' : 'Guru (गुरु)'}`}
                </h2>
                <p className="text-slate-500 text-sm mb-6">
                  {mode === 'signin' 
                    ? 'Enter your credentials to continue' 
                    : 'Create your account to get started'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === 'signup' && (
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-slate-700">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="fullName"
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Your name"
                          className="pl-10 h-11 border-slate-200 focus:border-amber-400 focus:ring-amber-400/20"
                        />
                      </div>
                      {errors.fullName && (
                        <p className="text-xs text-red-500">{errors.fullName}</p>
                      )}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-700">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="pl-10 h-11 border-slate-200 focus:border-amber-400 focus:ring-amber-400/20"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs text-red-500">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-slate-700">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={mode === 'signup' ? 'Min. 6 characters' : '••••••••'}
                        className="pl-10 h-11 border-slate-200 focus:border-amber-400 focus:ring-amber-400/20"
                      />
                    </div>
                    {errors.password && (
                      <p className="text-xs text-red-500">{errors.password}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-11 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-medium shadow-lg shadow-amber-500/25"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : mode === 'signin' ? (
                      'Sign In'
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  {mode === 'signin' ? (
                    <button
                      onClick={() => {
                        setMode('signup');
                        setSelectedRole(null);
                      }}
                      className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
                    >
                      Don't have an account? <span className="text-amber-600 font-medium">Sign up</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setMode('signin')}
                      className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
                    >
                      Already have an account? <span className="text-amber-600 font-medium">Sign in</span>
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
