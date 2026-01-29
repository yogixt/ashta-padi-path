// Topic-based learning modules for each profession

export interface LearningModule {
  id: string;
  title: string;
  titleSanskrit: string;
  description: string;
  duration: string;
  lessons: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  icon: string;
  topics: string[];
  available: boolean;
}

export interface ProfessionModules {
  professionId: string;
  modules: LearningModule[];
}

// Yoga Practitioner Modules
export const yogaModules: LearningModule[] = [
  {
    id: 'meditation-basics',
    title: 'Meditation & Mind Control',
    titleSanskrit: 'ध्यान एवं चित्त नियन्त्रणम्',
    description: 'Learn the foundational concepts of meditation and mental stillness through Yoga Sūtras',
    duration: '45 min',
    lessons: 6,
    level: 'beginner',
    icon: '🧘',
    topics: ['Yoga definition (1.2)', 'Citta-vṛtti-nirodha', 'The Seer (Draṣṭṛ)', 'Mental fluctuations'],
    available: true
  },
  {
    id: 'practice-detachment',
    title: 'Practice & Detachment',
    titleSanskrit: 'अभ्यास एवं वैराग्यम्',
    description: 'Master the twin pillars of yogic discipline: persistent practice and non-attachment',
    duration: '40 min',
    lessons: 5,
    level: 'beginner',
    icon: '⚖️',
    topics: ['Abhyāsa (Practice)', 'Vairāgya (Detachment)', 'Steadiness in practice', 'Letting go'],
    available: false
  },
  {
    id: 'samadhi-states',
    title: 'States of Samādhi',
    titleSanskrit: 'समाधि अवस्थाः',
    description: 'Explore the various levels of meditative absorption described in Samādhi Pāda',
    duration: '60 min',
    lessons: 8,
    level: 'intermediate',
    icon: '✨',
    topics: ['Samprajñāta samādhi', 'Asamprajñāta samādhi', 'Sabīja & Nirbīja', 'Stages of absorption'],
    available: false
  },
  {
    id: 'obstacles-solutions',
    title: 'Obstacles & Solutions',
    titleSanskrit: 'विघ्न एवं उपायाः',
    description: 'Understand the nine obstacles (antarāya) and their remedies according to Patañjali',
    duration: '50 min',
    lessons: 6,
    level: 'intermediate',
    icon: '🛡️',
    topics: ['Nine obstacles', 'Single-pointed focus', 'Counteracting distractions', 'Stability of mind'],
    available: false
  },
  {
    id: 'liberation-path',
    title: 'Path to Liberation',
    titleSanskrit: 'कैवल्य मार्गः',
    description: 'The ultimate goal of yoga: understanding kaivalya and the journey towards liberation',
    duration: '55 min',
    lessons: 7,
    level: 'advanced',
    icon: '🕉️',
    topics: ['Puruṣa & Prakṛti', 'Kaivalya (Liberation)', 'Viveka-khyāti', 'Final realization'],
    available: false
  }
];

// Get modules for a profession
export function getModulesForProfession(professionId: string): LearningModule[] {
  switch (professionId) {
    case 'yoga':
      return yogaModules;
    default:
      return [];
  }
}
