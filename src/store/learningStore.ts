import { create } from 'zustand';

export type Screen = 'home' | 'vocabulary' | 'learning' | 'quiz' | 'results' | 'analytics' | 'guru-dashboard' | 'shishya-dashboard';

interface LearningState {
  // Navigation
  currentScreen: Screen;
  setScreen: (screen: Screen) => void;
  
  // Profession
  selectedProfession: string | null;
  setSelectedProfession: (profession: string) => void;
  
  // Vocabulary progress
  currentVocabIndex: number;
  vocabCompleted: boolean;
  nextVocab: () => void;
  prevVocab: () => void;
  completeVocab: () => void;
  resetVocab: () => void;
  
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
  
  // Grammar sidebar
  expandedGrammar: string | null;
  setExpandedGrammar: (id: string | null) => void;
  
  // Reset all
  resetProgress: () => void;
}

export const useLearningStore = create<LearningState>((set, get) => ({
  // Navigation
  currentScreen: 'home',
  setScreen: (screen) => set({ currentScreen: screen }),
  
  // Profession
  selectedProfession: null,
  setSelectedProfession: (profession) => set({ selectedProfession: profession }),
  
  // Vocabulary
  currentVocabIndex: 0,
  vocabCompleted: false,
  nextVocab: () => set((state) => ({ 
    currentVocabIndex: Math.min(state.currentVocabIndex + 1, 5) 
  })),
  prevVocab: () => set((state) => ({ 
    currentVocabIndex: Math.max(state.currentVocabIndex - 1, 0) 
  })),
  completeVocab: () => set({ vocabCompleted: true }),
  resetVocab: () => set({ currentVocabIndex: 0, vocabCompleted: false }),
  
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
  
  // Grammar
  expandedGrammar: null,
  setExpandedGrammar: (id) => set((state) => ({
    expandedGrammar: state.expandedGrammar === id ? null : id
  })),
  
  // Reset
  resetProgress: () => set({
    currentScreen: 'home',
    selectedProfession: null,
    currentVocabIndex: 0,
    vocabCompleted: false,
    currentSutraIndex: 0,
    sutrasCompleted: 0,
    quizAnswers: {},
    quizScore: null,
    expandedGrammar: null
  })
}));
