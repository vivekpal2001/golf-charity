import { useState, useEffect, useCallback } from 'react';
import { getUserScores, addScore } from '../utils/scoreLogic';
import { useAuth } from '../context/AuthContext';

export const useScores = () => {
  const { user } = useAuth();
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadScores = useCallback(async () => {
    if (!user) {
      setScores([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data } = await getUserScores(user.id);
    setScores(data || []);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    loadScores();
  }, [loadScores]);

  const submitScore = async (score, date) => {
    if (!user) return { error: { message: 'Not authenticated' } };
    const result = await addScore(user.id, score, date);
    if (!result.error) {
      await loadScores();
    }
    return result;
  };

  return { scores, loading, submitScore, refresh: loadScores };
};

export default useScores;
