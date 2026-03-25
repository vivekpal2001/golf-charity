// Calculate prize pool from active subscriptions
export const calculatePrizePool = (activeSubscribers, subscriptionAmount, avgCharityPercentage = 10) => {
  const charityDeduction = avgCharityPercentage / 100;
  const prizePool = activeSubscribers * subscriptionAmount * (1 - charityDeduction);

  return {
    total: prizePool,
    charityTotal: activeSubscribers * subscriptionAmount * charityDeduction,
    fiveMatch: prizePool * 0.40,
    fourMatch: prizePool * 0.35,
    threeMatch: prizePool * 0.25
  };
};

// Split prize among multiple winners
export const splitPrize = (prizeAmount, winnerCount) => {
  if (winnerCount === 0) return 0;
  return Math.floor((prizeAmount / winnerCount) * 100) / 100;
};

// Calculate total distribution with rollover
export const calculateDistribution = (prizes, winners, previousRollover = 0) => {
  const fiveMatchWinners = winners.filter(w => w.matchType === '5').length;
  const fourMatchWinners = winners.filter(w => w.matchType === '4').length;
  const threeMatchWinners = winners.filter(w => w.matchType === '3').length;

  const fiveMatchTotal = prizes.fiveMatch + previousRollover;
  
  const distribution = {
    fiveMatch: {
      total: fiveMatchTotal,
      perWinner: splitPrize(fiveMatchTotal, fiveMatchWinners),
      winnerCount: fiveMatchWinners,
    },
    fourMatch: {
      total: prizes.fourMatch,
      perWinner: splitPrize(prizes.fourMatch, fourMatchWinners),
      winnerCount: fourMatchWinners,
    },
    threeMatch: {
      total: prizes.threeMatch,
      perWinner: splitPrize(prizes.threeMatch, threeMatchWinners),
      winnerCount: threeMatchWinners,
    },
    rollover: fiveMatchWinners === 0 ? fiveMatchTotal : 0,
    totalDistributed: 0,
  };

  distribution.totalDistributed =
    (fiveMatchWinners > 0 ? fiveMatchTotal : 0) +
    (fourMatchWinners > 0 ? prizes.fourMatch : 0) +
    (threeMatchWinners > 0 ? prizes.threeMatch : 0);

  return distribution;
};

// Format currency (INR)
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};
