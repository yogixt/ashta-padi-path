import { motion } from 'framer-motion';
import { 
  Briefcase, 
  BookOpen, 
  GraduationCap, 
  ScrollText, 
  Languages, 
  Users, 
  Award, 
  Building2 
} from 'lucide-react';

const steps = [
  {
    step: 1,
    sanskrit: 'वृत्ति चयनम्',
    title: 'Profession Selection',
    description: 'Choose your profession (e.g., Yoga Practitioner, Economist, Lawyer). This determines your personalized vocabulary set.',
    icon: Briefcase,
    color: 'from-amber-500 to-orange-600',
    position: 'top'
  },
  {
    step: 2,
    sanskrit: 'शब्दकोश',
    title: 'Profession-Specific Vocabulary & Testing',
    description: 'Learn Sanskrit vocabulary curated for your profession through flashcards, audio, and interactive exercises.',
    icon: BookOpen,
    color: 'from-emerald-500 to-teal-600',
    position: 'right'
  },
  {
    step: 3,
    sanskrit: 'व्याकरण प्रमाणपत्रम्',
    title: 'Grammar & Certification',
    description: 'Master foundational grammar (sandhi, vibhakti, dhātu) and earn your first certificate at Exit Point 1.',
    icon: GraduationCap,
    color: 'from-blue-500 to-indigo-600',
    badge: 'EXIT POINT 1',
    position: 'right'
  },
  {
    step: 4,
    sanskrit: 'शास्त्र चयनम्',
    title: 'Scripture Selection & Mentor Assignment',
    description: 'Select your scripture (Yoga Sūtras, Bhagavad Gītā, Arthaśāstra, etc.) and get assigned an academic mentor.',
    icon: ScrollText,
    color: 'from-violet-500 to-purple-600',
    position: 'bottom'
  },
  {
    step: 5,
    sanskrit: 'मूल पाठ',
    title: 'Scripture Structure & Translation',
    description: 'Study the structure, word-by-word meaning, and translations at the Master\'s Level with expert guidance.',
    icon: Languages,
    color: 'from-rose-500 to-pink-600',
    badge: "MASTER'S LEVEL",
    position: 'bottom'
  },
  {
    step: 6,
    sanskrit: 'गुरु शिक्षण',
    title: 'Teacher Guided Learning Path',
    description: 'Follow PhD-level research methodology with personalized mentorship from Sanskrit scholars.',
    icon: Users,
    color: 'from-cyan-500 to-sky-600',
    badge: 'PhD TRACK',
    position: 'left'
  },
  {
    step: 7,
    sanskrit: 'विश्वविद्यालय प्रमाणपत्रम्',
    title: 'University-Integrated Certification',
    description: 'Earn recognized certifications through progressive academic partnerships.',
    icon: Award,
    color: 'from-yellow-500 to-amber-600',
    position: 'left'
  },
  {
    step: 8,
    sanskrit: 'कार्यक्षेत्र पथ',
    title: 'Career & Research Pathways',
    description: 'Graduate with advanced research opportunities and career pathways in Sanskrit scholarship.',
    icon: Building2,
    color: 'from-slate-500 to-gray-600',
    badge: 'EXIT STEP',
    position: 'top'
  }
];

export function AshtaPadiSteps() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            अष्टपदी — 8-Step Framework
          </span>
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            University-Integrated Learning Framework
          </h3>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            A structured progression from profession selection to advanced Sanskrit scholarship, 
            applicable to any scripture tradition
          </p>
        </motion.div>
      </div>

      {/* Steps Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="group relative bg-card border border-border rounded-2xl p-5 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
          >
            {/* Step number badge */}
            <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-lg">
              {step.step}
            </div>

            {/* Exit Point Badge */}
            {step.badge && (
              <div className="absolute -top-2 right-3 px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full">
                {step.badge}
              </div>
            )}

            {/* Icon */}
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-lg`}>
              <step.icon className="w-6 h-6 text-white" />
            </div>

            {/* Content */}
            <h4 className="font-sanskrit text-primary text-sm mb-1">{step.sanskrit}</h4>
            <h5 className="font-semibold text-foreground text-sm mb-2">{step.title}</h5>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Demo Note */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center p-4 bg-primary/5 rounded-xl border border-primary/20"
      >
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Current Demo:</span> Implements Steps 1–3 using the Yoga Sūtras, Samādhi Pāda. 
          The framework is designed to be <span className="text-primary font-medium">scripture-agnostic</span> — 
          supporting Bhagavad Gītā, Arthaśāstra, Nāṭyaśāstra, and other texts.
        </p>
      </motion.div>
    </div>
  );
}
