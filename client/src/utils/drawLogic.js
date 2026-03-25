// Generate 5 unique random numbers (1-45)
export const generateDrawNumbers = () => {
  const numbers = [];
  while (numbers.length < 5) {
    const num = Math.floor(Math.random() * 45) + 1;
    if (!numbers.includes(num)) {
      numbers.push(num);
    }
  }
  return numbers.sort((a, b) => a - b);
};

// Find winners from all user scores
export const findWinners = (drawNumbers, allUserScores) => {
  const winners = [];

  allUserScores.forEach(userScoreData => {
    const userScores = userScoreData.scores.map(s => s.score);
    const matches = userScores.filter(score => drawNumbers.includes(score));
    const matchCount = matches.length;

    if (matchCount >= 3) {
      winners.push({
        userId: userScoreData.userId,
        matchType: matchCount.toString(),
        matchedScores: matches
      });
    }
  });

  return winners;
};

// Group winners by match type
export const groupWinnersByMatchType = (winners) => {
  return {
    '5': winners.filter(w => w.matchType === '5'),
    '4': winners.filter(w => w.matchType === '4'),
    '3': winners.filter(w => w.matchType === '3'),
  };
};
