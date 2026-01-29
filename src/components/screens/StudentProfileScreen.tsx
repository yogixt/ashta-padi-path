import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, GraduationCap } from 'lucide-react';
import { StudentProfileForm } from '@/components/profile/StudentProfileForm';
import { BrowseTeachers } from '@/components/profile/BrowseTeachers';
import mandalaElegant from '@/assets/mandala-elegant.png';

export function StudentProfileScreen() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background mandala */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.04 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
        >
          <img src={mandalaElegant} alt="" className="w-full h-full object-contain" />
        </motion.div>
      </div>

      <Header showBack backTo="shishya-dashboard" />

      <main className="py-8 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <span className="tag-gold mb-4 inline-block">Student Portal</span>
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-3xl font-sanskrit">शिष्य</span>
              <h1 className="text-3xl font-serif font-bold text-foreground">Śiṣya Profile</h1>
            </div>
            <p className="text-muted-foreground">
              Manage your profile and connect with teachers
            </p>
            {/* Decorative line */}
            <div className="flex items-center justify-center gap-3 mt-5">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-primary/50" />
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-primary/50" />
            </div>
          </motion.div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-2 w-full max-w-md">
              <TabsTrigger value="profile" className="gap-2">
                <User className="w-4 h-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="teachers" className="gap-2">
                <GraduationCap className="w-4 h-4" />
                Find Teachers
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <StudentProfileForm />
              </motion.div>
            </TabsContent>

            <TabsContent value="teachers">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <BrowseTeachers />
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
