import { motion } from 'framer-motion';
import { ArrowLeft, Home, BarChart3, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLearningStore, Screen } from '@/store/learningStore';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import logoImage from '@/assets/logo.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  showBack?: boolean;
  backTo?: Screen;
}

export function Header({ showBack = false, backTo = 'home' }: HeaderProps) {
  const { setScreen, resetProgress } = useLearningStore();
  const { user, role, signOut } = useAuth();
  const navigate = useNavigate();

  const handleBack = () => {
    setScreen(backTo);
  };

  const handleHome = () => {
    // Navigate to role-specific dashboard instead of landing page
    if (role === 'teacher') {
      setScreen('guru-dashboard');
    } else if (role === 'student') {
      setScreen('shishya-dashboard');
    } else {
      setScreen('home');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full py-3 px-4 md:px-6 border-b border-border bg-card/90 backdrop-blur-xl sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-4">
          {showBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="gap-2 text-muted-foreground hover:text-primary hover:bg-primary/10"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>
          )}
          
          {/* Logo */}
          <button
            onClick={handleHome}
            className="flex items-center gap-3 group"
          >
            <img 
              src={logoImage} 
              alt="Ashta Padi Logo" 
              className="w-10 h-10 rounded-xl shadow-md group-hover:shadow-lg transition-shadow object-cover"
            />
            <div className="hidden sm:block">
              <h1 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                Ashta Padi
              </h1>
              <p className="text-xs text-muted-foreground font-sanskrit -mt-0.5">
                अष्टपदी
              </p>
            </div>
          </button>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setScreen('analytics')}
            className="gap-2 text-muted-foreground hover:text-primary hover:bg-primary/10"
          >
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">Analytics</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleHome}
            className="gap-2 text-muted-foreground hover:text-primary hover:bg-primary/10"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 ml-2"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground text-xs font-bold font-sanskrit">
                    {role === 'teacher' ? 'गु' : 'शि'}
                  </div>
                  <span className="hidden md:inline text-sm font-medium">
                    {role === 'teacher' ? 'Guru' : 'Śiṣya'}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-card border-border">
                <DropdownMenuItem className="gap-2 text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span className="truncate">{user.email}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="gap-2 text-destructive focus:text-destructive"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={() => navigate('/auth')}
              className="ml-2 bg-primary hover:bg-primary/90"
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </motion.header>
  );
}
