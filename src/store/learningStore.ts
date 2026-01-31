import { create } from 'zustand';

export type Screen = 'home' | 'gurukul' | 'modules' | 'vocabulary' | 'learning' | 'quiz' | 'results' | 'analytics' | 'guru-dashboard' | 'shishya-dashboard' | 'teacher-profile' | 'student-profile' | 'browse-teachers' | 'mentor-selection' | 'assessments';

interface LearningState {
  // Navigation
  currentScreen: Screen;
  setScreen: (screen: Screen) => void;
  
  // Profession
  selectedProfession: string | null;
  setSelectedProfession: (profession: string) => void;
  
  // Module
  selectedModule: string | null;
  setSelectedModule: (module: string) => void;
  
  // Vocabulary progress - track each term completion
  currentVocabIndex: number;
  vocabCompleted: boolean;
  completedVocabTerms: Set<number>; // Track which terms have been explicitly completed
  nextVocab: () => void;
  prevVocab: () => void;
  completeVocab: () => void;
  completeCurrentVocabTerm: () => void; // Mark current term as completed
  resetVocab: () => void;
  isAllVocabCompleted: () => boolean; // Check if all terms are completed
  
  // Sutra progress
  currentSutraIndex: number;
  sutrasCompleted: number;
  nextSutra: () => void;
  prevSutra: () => void;
  completeSutra: () => void;
  
  // Quiz
  quizAnswers: Record<number, number>;
  quizScore: number | null;
  setQuizAnswer: (questionId: number, answer: number) => void;
  calculateScore: (correctAnswers: Record<number, number>) => void;
  resetQuiz: () => void;
  hasPassedQuiz: () => boolean; // Check if score >= 70%
  
  // Grammar sidebar
  expandedGrammar: string | null;
  setExpandedGrammar: (id: string | null) => void;
  
  // Reset all
  resetProgress: () => void;
}

const TOTAL_VOCAB_TERMS = 6; // Number of vocabulary terms

export const useLearningStore = create<LearningState>((set, get) => ({
  // Navigation
  currentScreen: 'home',
  setScreen: (screen) => set({ currentScreen: screen }),
  
  // Profession
  selectedProfession: null,
  setSelectedProfession: (profession) => set({ selectedProfession: profession }),
  
  // Module
  selectedModule: null,
  setSelectedModule: (module) => set({ selectedModule: module }),
  
  // Vocabulary
  currentVocabIndex: 0,
  vocabCompleted: false,
  completedVocabTerms: new Set<number>(),
  nextVocab: () => set((state) => ({
    currentVocabIndex: Math.min(state.currentVocabIndex + 1, TOTAL_VOCAB_TERMS - 1) 
  })),
  prevVocab: () => set((state) => ({ 
    currentVocabIndex: Math.max(state.currentVocabIndex - 1, 0) 
  })),
  completeCurrentVocabTerm: () => set((state) => {
    const newSet = new Set(state.completedVocabTerms);
    newSet.add(state.currentVocabIndex);
    const allCompleted = newSet.size >= TOTAL_VOCAB_TERMS;
    return { 
      completedVocabTerms: newSet,
      vocabCompleted: allCompleted
    };
  }),
  completeVocab: () => set({ vocabCompleted: true }),
  resetVocab: () => set({ currentVocabIndex: 0, vocabCompleted: false, completedVocabTerms: new Set() }),
  isAllVocabCompleted: () => {
    const state = get();
    return state.completedVocabTerms.size >= TOTAL_VOCAB_TERMS;
  },
  
  // Sutras
  currentSutraIndex: 0,
  sutrasCompleted: 0,
  nextSutra: () => set((state) => {
    const newIndex = Math.min(state.currentSutraIndex + 1, 4);
    return { 
      currentSutraIndex: newIndex,
      sutrasCompleted: Math.max(state.sutrasCompleted, newIndex)
    };
  }),
  prevSutra: () => set((state) => ({ 
    currentSutraIndex: Math.max(state.currentSutraIndex - 1, 0) 
  })),
  completeSutra: () => set((state) => ({
    sutrasCompleted: Math.max(state.sutrasCompleted, state.currentSutraIndex + 1)
  })),
  
  // Quiz
  quizAnswers: {},
  quizScore: null,
  setQuizAnswer: (questionId, answer) => set((state) => ({
    quizAnswers: { ...state.quizAnswers, [questionId]: answer }
  })),
  calculateScore: (correctAnswers) => {
    const answers = get().quizAnswers;
    let score = 0;
    Object.entries(correctAnswers).forEach(([id, correct]) => {
      if (answers[parseInt(id)] === correct) {
        score++;
      }
    });
    set({ quizScore: score });
  },
  resetQuiz: () => set({ quizAnswers: {}, quizScore: null }),
  hasPassedQuiz: () => {
    const state = get();
    if (state.quizScore === null) return false;
    const totalQuestions = Object.keys(state.quizAnswers).length || 5; // Default to 5 questions
    const percentage = (state.quizScore / totalQuestions) * 100;
    return percentage === 100; // Must score 100% to select a mentor
  },
  
  // Grammar
  expandedGrammar: null,
  setExpandedGrammar: (id) => set((state) => ({
    expandedGrammar: state.expandedGrammar === id ? null : id
  })),
  
  // Reset
  resetProgress: () => set({
    currentScreen: 'home',
    selectedProfession: null,
    selectedModule: null,
    currentVocabIndex: 0,
    vocabCompleted: false,
    completedVocabTerms: new Set(),
    currentSutraIndex: 0,
    sutrasCompleted: 0,
    quizAnswers: {},
    quizScore: null,
    expandedGrammar: null
  })
}));
