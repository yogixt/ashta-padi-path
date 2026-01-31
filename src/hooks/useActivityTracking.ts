import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface ActivityDay {
  date: Date;
  level: number; // 0-4 based on activity count
}

interface UserActivity {
  activity_date: string;
  total_count: number;
}

export function useActivityTracking() {
  const { user } = useAuth();
  const [activityData, setActivityData] = useState<ActivityDay[]>([]);
  const [totalActiveDays, setTotalActiveDays] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch activity data for the last 12 weeks
  const fetchActivityData = useCallback(async () => {
    if (!user) {
      // Generate empty data for non-logged-in users
      const emptyData = generateEmptyActivityData();
      setActivityData(emptyData);
      setTotalActiveDays(0);
      setLoading(false);
      return;
    }

    try {
      const today = new Date();
      const startDate = new Date(today);
      startDate.setDate(startDate.getDate() - 84); // 12 weeks ago

      const { data, error } = await supabase
        .from('user_activity')
        .select('activity_date, activity_count')
        .eq('user_id', user.id)
        .gte('activity_date', startDate.toISOString().split('T')[0])
        .lte('activity_date', today.toISOString().split('T')[0]);

      if (error) throw error;

      // Aggregate by date
      const activityByDate: Record<string, number> = {};
      data?.forEach((row) => {
        const dateStr = row.activity_date;
        activityByDate[dateStr] = (activityByDate[dateStr] || 0) + row.activity_count;
      });

      // Generate 12 weeks of data
      const weeks = 12;
      const result: ActivityDay[] = [];
      
      for (let w = weeks - 1; w >= 0; w--) {
        for (let d = 0; d < 7; d++) {
          const date = new Date(today);
          date.setDate(date.getDate() - (w * 7 + (6 - d)));
          const dateStr = date.toISOString().split('T')[0];
          const count = activityByDate[dateStr] || 0;
          
          // Convert count to level (0-4)
          let level = 0;
          if (count >= 10) level = 4;
          else if (count >= 6) level = 3;
          else if (count >= 3) level = 2;
          else if (count >= 1) level = 1;
          
          result.push({ date, level });
        }
      }

      setActivityData(result);
      setTotalActiveDays(result.filter(d => d.level > 0).length);
    } catch (error) {
      console.error('Error fetching activity data:', error);
      // Fallback to empty data
      const emptyData = generateEmptyActivityData();
      setActivityData(emptyData);
      setTotalActiveDays(0);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Log activity for today
  const logActivity = useCallback(async (activityType: 'vocabulary' | 'sutra' | 'quiz') => {
    if (!user) return;

    try {
      const { error } = await supabase.rpc('log_user_activity', {
        p_activity_type: activityType
      });

      if (error) throw error;
      
      // Refresh activity data after logging
      fetchActivityData();
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  }, [user, fetchActivityData]);

  useEffect(() => {
    fetchActivityData();
  }, [fetchActivityData]);

  return {
    activityData,
    totalActiveDays,
    loading,
    logActivity,
    refetch: fetchActivityData
  };
}

// Generate empty activity data for 12 weeks
function generateEmptyActivityData(): ActivityDay[] {
  const weeks = 12;
  const data: ActivityDay[] = [];
  const today = new Date();
  
  for (let w = weeks - 1; w >= 0; w--) {
    for (let d = 0; d < 7; d++) {
      const date = new Date(today);
      date.setDate(date.getDate() - (w * 7 + (6 - d)));
      data.push({ date, level: 0 });
    }
  }
  return data;
}
