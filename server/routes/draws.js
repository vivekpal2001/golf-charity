const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Generate 5 unique random numbers (1-45)
const generateDrawNumbers = () => {
  const numbers = [];
  while (numbers.length < 5) {
    const num = Math.floor(Math.random() * 45) + 1;
    if (!numbers.includes(num)) numbers.push(num);
  }
  return numbers.sort((a, b) => a - b);
};

// Execute a new draw
router.post('/execute', async (req, res) => {
  try {
    const numbers = generateDrawNumbers();

    // Get all active subscribers count
    const { count } = await supabase
      .from('subscriptions')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');

    const activeSubscribers = count || 0;
    const prizePool = activeSubscribers * 500 * 0.9; // 10% to charity

    // Get last draw rollover
    const { data: lastDraw } = await supabase
      .from('draws')
      .select('jackpot_rollover')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    const rollover = lastDraw?.jackpot_rollover || 0;

    const now = new Date();
    const month = now.toLocaleString('en-IN', { month: 'long', year: 'numeric' });

    // Save draw
    const { data: drawData, error } = await supabase
      .from('draws')
      .insert([{
        month,
        numbers,
        prize_pool_total: prizePool,
        prize_5_match: prizePool * 0.40 + rollover,
        prize_4_match: prizePool * 0.35,
        prize_3_match: prizePool * 0.25,
        status: 'pending',
      }])
      .select()
      .single();

    if (error) throw error;

    // Get all scores grouped by user
    const { data: scores } = await supabase.from('scores').select('user_id, score');
    const userScores = {};
    (scores || []).forEach(s => {
      if (!userScores[s.user_id]) userScores[s.user_id] = [];
      userScores[s.user_id].push(s.score);
    });

    // Find winners
    const winners = [];
    for (const [userId, userNums] of Object.entries(userScores)) {
      const matches = userNums.filter(n => numbers.includes(n));
      if (matches.length >= 3) {
        winners.push({ userId, matchType: String(matches.length), matches });
      }
    }

    // Group by match type and calculate prizes
    const fiveMatchWinners = winners.filter(w => w.matchType === '5');
    const fourMatchWinners = winners.filter(w => w.matchType === '4');
    const threeMatchWinners = winners.filter(w => w.matchType === '3');

    const winnerRecords = winners.map(w => {
      let prizeAmount = 0;
      if (w.matchType === '5') prizeAmount = (prizePool * 0.40 + rollover) / fiveMatchWinners.length;
      if (w.matchType === '4') prizeAmount = (prizePool * 0.35) / fourMatchWinners.length;
      if (w.matchType === '3') prizeAmount = (prizePool * 0.25) / threeMatchWinners.length;

      return {
        draw_id: drawData.id,
        user_id: w.userId,
        match_type: w.matchType,
        prize_amount: Math.floor(prizeAmount * 100) / 100,
      };
    });

    if (winnerRecords.length > 0) {
      await supabase.from('winners').insert(winnerRecords);
    }

    // Update rollover if no 5-match winner
    if (fiveMatchWinners.length === 0) {
      await supabase
        .from('draws')
        .update({ jackpot_rollover: prizePool * 0.40 + rollover })
        .eq('id', drawData.id);
    }

    res.json({
      draw: drawData,
      numbers,
      winners: winners.length,
      prizePool,
      rollover: fiveMatchWinners.length === 0 ? prizePool * 0.40 + rollover : 0,
    });
  } catch (err) {
    console.error('Draw execution error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get draw history
router.get('/history', async (req, res) => {
  const { data, error } = await supabase
    .from('draws')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

module.exports = router;
