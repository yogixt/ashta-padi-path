import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { StudentProfileForm } from '@/components/profile/StudentProfileForm';
import mandalaElegant from '@/assets/mandala-elegant.png';

export function StudentProfileScreen() {
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
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl font-sanskrit">शिष्य</span>
              <h1 className="text-3xl font-serif font-bold text-foreground">Śiṣya Profile</h1>
            </div>
            <p className="text-muted-foreground">
              Manage your learning profile
            </p>
          </motion.div>

          {/* Profile Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <StudentProfileForm />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
