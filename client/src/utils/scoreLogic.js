import { supabase } from '../api/supabase';

// Add new score (auto-delete oldest if user has 5 scores)
export const addScore = async (userId, score, date) => {
  try {
    // Get current score count
    const { data: scores, error: countError } = await supabase
      .from('scores')
      .select('id, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    if (countError) throw countError;

    // If user has 5 scores, delete the oldest one
    if (scores.length >= 5) {
      const oldestScore = scores[0];
      const { error: deleteError } = await supabase
        .from('scores')
        .delete()
        .eq('id', oldestScore.id);

      if (deleteError) throw deleteError;
    }

    // Insert new score
    const { data, error } = await supabase
      .from('scores')
      .insert([{ user_id: userId, score, date }])
      .select();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

// Get user's scores (newest first)
export const getUserScores = async (userId) => {
  const { data, error } = await supabase
    .from('scores')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(5);

  return { data, error };
};

// Get all active user scores (for draw comparison)
export const getAllActiveUserScores = async () => {
  const { data, error } = await supabase
    .from('scores')
    .select('user_id, score')
    .order('user_id');

  if (error) return { data: null, error };

  // Group scores by user
  const userScoresMap = {};
  data.forEach(row => {
    if (!userScoresMap[row.user_id]) {
      userScoresMap[row.user_id] = { userId: row.user_id, scores: [] };
    }
    userScoresMap[row.user_id].scores.push(row);
  });

  return { data: Object.values(userScoresMap), error: null };
};
