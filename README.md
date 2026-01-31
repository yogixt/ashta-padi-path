# Ashta Padi — संस्कृतं च शास्त्राणि

<p align="center">
  <img src="src/assets/logo.png" alt="Ashta Padi Logo" width="120" />
</p>

<p align="center">
  <strong>A Scripture-Agnostic Framework for Sanskrit Learning</strong><br/>
  Learn Sanskrit & Scriptures Through Your Profession
</p>

---

## 📖 About

**Ashta Padi** (अष्टपदी) is an innovative, profession-based Sanskrit learning platform that makes ancient wisdom accessible to modern learners. The framework covers major scriptures including:

- **Yoga Sūtras** of Patañjali
- **Bhagavad Gītā**
- **Arthaśāstra**
- And more...

The platform follows a structured **8-step pedagogical roadmap** (Ashta Padi = Eight Steps) designed to guide learners from foundational concepts to advanced understanding.

## 🎯 Key Features

### For Students (Śiṣya)
- **Profession-Based Learning**: Content personalized for Philosophers, Psychologists, Economists, Yoga Practitioners, and Wellness Experts
- **Interactive Sūtra Panel**: Study verses with word-by-word analysis, grammar breakdowns, and contextual meanings
- **AI-Powered Chatbot**: Get instant answers to Sanskrit and scripture-related questions
- **Progress Tracking**: Monitor your learning journey with detailed analytics
- **Vocabulary Cards**: Build your Sanskrit vocabulary with spaced repetition
- **Quizzes & Assessments**: Test your understanding with interactive quizzes

### For Teachers (Guru)
- **Student Management**: Connect with and guide your śiṣyas
- **Assessment Creation**: Create custom assessments for your students
- **Publication Management**: Share your research, blogs, and teaching materials
- **Connection Requests**: Accept or manage student connection requests

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: Zustand
- **Backend**: Lovable Cloud (Supabase)
- **Authentication**: Email-based auth with role management
- **Animations**: Framer Motion
- **Charts**: Recharts

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm (or use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── assets/              # Images, mandalas, and static assets
├── components/
│   ├── screens/         # Main screen components
│   ├── profile/         # Profile-related components
│   ├── analytics/       # Learning analytics components
│   └── ui/              # Reusable UI components (shadcn)
├── contexts/            # React contexts (Auth, etc.)
├── data/                # Static data (modules, grammar, sutras)
├── hooks/               # Custom React hooks
├── integrations/        # Backend integration
├── pages/               # Route pages
├── store/               # Zustand state management
└── lib/                 # Utility functions
supabase/
└── functions/           # Edge functions (AI chat, etc.)
```

## 🏗️ System Architecture

The Ashta-Padi system architecture employs a modular, layered approach comprising four distinct layers:

### 1. Content Layer — TypeScript Data Modules
The content layer is powered by **strongly-typed TypeScript modules** (not JSON) that provide structured Sanskrit educational content:

- **`yogaSutrasData.ts`**: Maps Sanskrit sūtras to word-by-word breakdowns with morphological markers (vibhakti, sandhi splits, dhātu roots)
- **`grammarModules.ts`**: Comprehensive 22-lesson Vyākaraṇa curriculum covering foundational grammar and scripture-specific analysis
- **`modulesData.ts`**: Profession-specific learning modules with topic mappings and progression metadata

This approach enables compile-time type safety and IntelliSense support for content authoring.

### 2. Pedagogy Layer — State-Driven Learning Engine
The pedagogy layer implements a **gated progression engine** using Zustand for state management:

```
Profession Selection → Authentication → Module Selection → 
Vocabulary (6 terms, all required) → Sūtra Study → Quiz (70% pass) → Mentor Selection
```

Key mechanisms:
- **Progression gating**: Each stage must be completed before advancing
- **Profession-based filtering**: Content dynamically filtered by selected profession (Philosopher, Psychologist, Economist, Yoga Practitioner, Wellness Expert)
- **Completion tracking**: Granular tracking of vocabulary terms, sūtra progress, and quiz scores
- **Pass/fail logic**: 70% threshold enforced before mentor access

### 3. Presentation Layer — Dual-Panel Learning Interface
The interface layer provides a **synchronized, interactive learning environment**:

- **Left Panel (Sūtra Panel)**: Word-by-word verse analysis with expandable morphological details
- **Right Panel (Grammar Sidebar)**: Contextual Vyākaraṇa reference (22 lessons across 2 modules)
- **Responsive Design**: Mobile-first approach with Tailwind CSS and Framer Motion animations
- **Role-Based Dashboards**: Distinct interfaces for Guru (teacher) and Śiṣya (student)

### 4. Backend Layer — Lovable Cloud Services
The backend layer leverages **Lovable Cloud** for persistence and AI capabilities:

- **Authentication**: Role-based auth (student/teacher) with profile management
- **Database**: PostgreSQL with RLS policies for secure data access
- **AI Integration**: Edge functions connecting to Google Gemini for the Sanskrit chatbot
- **Connection System**: Teacher-student relationship management with request/approval workflow

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                           │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────────┐  │
│  │   Sūtra Panel   │  │ Grammar Sidebar │  │   Dashboards   │  │
│  │  (Word Analysis)│  │  (Vyākaraṇa)    │  │ (Guru/Śiṣya)   │  │
│  └────────┬────────┘  └────────┬────────┘  └───────┬────────┘  │
└───────────┼────────────────────┼───────────────────┼────────────┘
            │                    │                   │
┌───────────┴────────────────────┴───────────────────┴────────────┐
│                     PEDAGOGY LAYER                              │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Zustand Learning Store                       │  │
│  │  • Gated Progression Engine (Auth → Vocab → Quiz → ...)  │  │
│  │  • Profession-Based Content Filtering                     │  │
│  │  • Score Calculation & Pass/Fail Logic                    │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
            │                    │                   │
┌───────────┴────────────────────┴───────────────────┴────────────┐
│                      CONTENT LAYER                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────────┐  │
│  │ yogaSutrasData  │  │ grammarModules  │  │  modulesData   │  │
│  │ (Sūtra + Padāni)│  │ (Vyākaraṇa 22L) │  │ (Profession)   │  │
│  └─────────────────┘  └─────────────────┘  └────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
            │                    │                   │
┌───────────┴────────────────────┴───────────────────┴────────────┐
│                      BACKEND LAYER                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────────┐  │
│  │  Authentication │  │    Database     │  │ Edge Functions │  │
│  │  (Role-based)   │  │ (PostgreSQL+RLS)│  │  (AI Chatbot)  │  │
│  └─────────────────┘  └─────────────────┘  └────────────────┘  │
│                      Lovable Cloud                              │
└─────────────────────────────────────────────────────────────────┘
```

## 🎨 Design System

The UI follows a professional editorial aesthetic with:
- Sanskrit-inspired typography using custom Devanagari fonts
- Elegant mandala decorative elements
- Warm, scholarly color palette
- Light/dark mode support

## 📚 The Ashta Padi Framework

The 8-step learning methodology:
1. **Introduction** — Overview of the scripture
2. **Context** — Historical and philosophical background
3. **Vocabulary** — Key Sanskrit terms
4. **Grammar** — Sandhi, Samasa, and linguistic analysis
5. **Translation** — Word-by-word and contextual meaning
6. **Commentary** — Traditional and modern interpretations
7. **Application** — Practical relevance to your profession
8. **Assessment** — Test your understanding

## 🔬 Research Credits

This project is a submission for **ISCLS 2026** by:

- Bhagyashree Joshi Vyasa
- Bijoy Laxmi Biswas
- Divyangana Kothari
- Aarti Panwar

**Affiliated Institutions:**
- Satyam Sadhana Kutir Ashram
- Uttarakhand Sanskrit University

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues and pull requests.

## 📄 License

This project is part of academic research. Please contact the authors for usage permissions.

---

<p align="center">
  <em>गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः</em><br/>
  <small>The Guru is Brahma, Vishnu, and Maheswara</small>
</p>
