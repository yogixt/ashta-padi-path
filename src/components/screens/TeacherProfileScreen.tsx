import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, FileText, Users } from 'lucide-react';
import { TeacherProfileForm } from '@/components/profile/TeacherProfileForm';
import { TeacherBlogsForm } from '@/components/profile/TeacherBlogsForm';
import { ConnectionRequests } from '@/components/profile/ConnectionRequests';
import mandalaElegant from '@/assets/mandala-elegant.png';

export function TeacherProfileScreen() {
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

      <Header showBack backTo="guru-dashboard" />

      <main className="py-8 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl font-sanskrit">गुरु</span>
              <h1 className="text-3xl font-serif font-bold text-foreground">Guru Profile</h1>
            </div>
            <p className="text-muted-foreground">
              Manage your profile, publications, and student connections
            </p>
          </motion.div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="profile" className="gap-2">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="blogs" className="gap-2">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Blogs</span>
              </TabsTrigger>
              <TabsTrigger value="students" className="gap-2">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Students</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <TeacherProfileForm />
              </motion.div>
            </TabsContent>

            <TabsContent value="blogs">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <TeacherBlogsForm />
              </motion.div>
            </TabsContent>

            <TabsContent value="students">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <ConnectionRequests />
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
