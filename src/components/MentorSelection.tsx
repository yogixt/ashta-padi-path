import { motion } from 'framer-motion';
import { Video, GraduationCap, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

interface Mentor {
  id: string;
  name: string;
  title: string;
  institution: string;
  expertise: string[];
  avatar: string;
}

const mentors: Mentor[] = [
  {
    id: '1',
    name: 'Prof. Srinivas Varkhedi',
    title: 'Vice Chancellor',
    institution: 'CSU',
    expertise: ['Nyaya', 'Vyakarana'],
    avatar: 'SV'
  },
  {
    id: '2',
    name: 'Prof. Gauri Mahulikar',
    title: 'Academic Director',
    institution: 'CIF',
    expertise: ['Vedic Literature'],
    avatar: 'GM'
  },
  {
    id: '3',
    name: 'Prof. Anuradha Chaudhary',
    title: 'Coordinator, IKS Division',
    institution: 'UGC',
    expertise: ['Indian Psychology'],
    avatar: 'AC'
  },
  {
    id: '4',
    name: 'Prof. Amba Kulkarni',
    title: 'Head, Dept of Sanskrit Studies',
    institution: 'University of Hyderabad',
    expertise: ['Computational Linguistics'],
    avatar: 'AK'
  },
  {
    id: '5',
    name: 'Prof. Malhar Kulkarni',
    title: 'Professor',
    institution: 'IIT Bombay',
    expertise: ['Paninian Grammar'],
    avatar: 'MK'
  }
];

interface MentorSelectionProps {
  onMentorSelect?: (mentorId: string) => void;
  selectedMentorId?: string | null;
}

export function MentorSelection({ onMentorSelect, selectedMentorId }: MentorSelectionProps) {
  const [selected, setSelected] = useState<string | null>(selectedMentorId || null);

  const handleSelect = (mentorId: string) => {
    setSelected(mentorId);
    onMentorSelect?.(mentorId);
    const mentor = mentors.find(m => m.id === mentorId);
    toast({
      title: "Mentor Selected",
      description: `You've selected ${mentor?.name} for live Q&A sessions.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-bold text-sm">3</span>
          </div>
          <h2 className="text-xl font-semibold text-foreground">
            <span className="font-sanskrit">गुरु चयनम्</span> — Mentor Selection
          </h2>
        </div>
        <p className="text-muted-foreground text-sm">
          Choose an academic mentor for live weekly/monthly Q&A sessions
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mentors.map((mentor, index) => (
          <motion.div
            key={mentor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`relative overflow-hidden transition-all hover:shadow-lg ${
              selected === mentor.id 
                ? 'ring-2 ring-primary border-primary bg-primary/5' 
                : 'hover:border-primary/50'
            }`}>
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-bold text-lg shrink-0">
                    {mentor.avatar}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-sm leading-tight">
                      {mentor.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {mentor.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {mentor.institution}
                    </p>
                    
                    {/* Expertise Tags */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {mentor.expertise.map((exp) => (
                        <Badge 
                          key={exp} 
                          variant="secondary" 
                          className="text-[10px] px-1.5 py-0 h-5"
                        >
                          {exp}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant={selected === mentor.id ? "default" : "outline"}
                  className="w-full mt-4 gap-2"
                  onClick={() => handleSelect(mentor.id)}
                >
                  <Video className="w-3.5 h-3.5" />
                  {selected === mentor.id ? 'Selected' : 'Select for Live Q&A'}
                </Button>

                {selected === mentor.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 pt-3 border-t border-border"
                  >
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Next session: Weekly schedule available</span>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-4 bg-primary/5 rounded-xl border border-primary/20"
        >
          <GraduationCap className="w-6 h-6 mx-auto mb-2 text-primary" />
          <p className="text-sm text-foreground">
            <span className="font-medium">गुरुर्ब्रह्मा गुरुर्विष्णुः</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Your mentor will guide you through the scriptures
          </p>
        </motion.div>
      )}
    </div>
  );
}
