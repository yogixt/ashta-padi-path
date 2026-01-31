import { useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useLearningStore } from '@/store/learningStore';

interface UserProgress {
  selected_profession: string | null;
  selected_module: string | null;
  current_vocab_index: number;
  vocab_completed: boolean;
  completed_vocab_terms: number[];
  current_sutra_index: number;
  sutras_completed: number;
  quiz_answers: Record<number, number>;
  quiz_score: number | null;
}

export function useProgressSync() {
  const { user } = useAuth();
  const store = useLearningStore();

  // Load progress from database on login
  const loadProgress = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        // PGRST116 = no rows returned, which is OK for new users
        console.error('Error loading progress:', error);
        return;
      }

      if (data) {
        // Update store with loaded progress
        if (data.selected_profession) store.setSelectedProfession(data.selected_profession);
        if (data.selected_module) store.setSelectedModule(data.selected_module);

        // Set vocab progress
        useLearningStore.setState({
          currentVocabIndex: data.current_vocab_index || 0,
          vocabCompleted: data.vocab_completed || false,
          completedVocabTerms: data.completed_vocab_terms || [],
          currentSutraIndex: data.current_sutra_index || 0,
          sutrasCompleted: data.sutras_completed || 0,
          quizAnswers: data.quiz_answers || {},
          quizScore: data.quiz_score,
        });
      }
    } catch (err) {
      console.error('Error in loadProgress:', err);
    }
  }, [user]);

  // Save progress to database
  const saveProgress = useCallback(async () => {
    if (!user) return;

    const state = useLearningStore.getState();

    const progressData: UserProgress = {
      selected_profession: state.selectedProfession,
      selected_module: state.selectedModule,
      current_vocab_index: state.currentVocabIndex,
      vocab_completed: state.vocabCompleted,
      completed_vocab_terms: state.completedVocabTerms,
      current_sutra_index: state.currentSutraIndex,
      sutras_completed: state.sutrasCompleted,
      quiz_answers: state.quizAnswers,
      quiz_score: state.quizScore,
    };

    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          ...progressData,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id'
        });

      if (error) {
        console.error('Error saving progress:', error);
      }
    } catch (err) {
      console.error('Error in saveProgress:', err);
    }
  }, [user]);

  // Load progress when user logs in
  useEffect(() => {
    if (user) {
      loadProgress();
    }
  }, [user, loadProgress]);

  // Auto-save progress when it changes (debounced)
  useEffect(() => {
    if (!user) return;

    const unsubscribe = useLearningStore.subscribe((state, prevState) => {
      // Check if progress-related fields changed
      const progressChanged =
        state.selectedProfession !== prevState.selectedProfession ||
        state.selectedModule !== prevState.selectedModule ||
        state.vocabCompleted !== prevState.vocabCompleted ||
        state.completedVocabTerms.length !== prevState.completedVocabTerms.length ||
        state.sutrasCompleted !== prevState.sutrasCompleted ||
        state.quizScore !== prevState.quizScore ||
        Object.keys(state.quizAnswers).length !== Object.keys(prevState.quizAnswers).length;

      if (progressChanged) {
        // Debounce save
        const timeoutId = setTimeout(() => {
          saveProgress();
        }, 1000);
        return () => clearTimeout(timeoutId);
      }
    });

    return () => unsubscribe();
  }, [user, saveProgress]);

  return { loadProgress, saveProgress };
}
