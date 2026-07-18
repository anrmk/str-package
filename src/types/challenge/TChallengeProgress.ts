export type TChallengeProgress = {
  id: string | null;
  challengeId: string;
  currentEquity: number;
  currentTotalLoss: number;
  currentTradingDays: number;
  currentDailyDrawdown: number;
  currentProfitTarget: number;
  dailyStartingEquity: number;
  dailyStartingUpdatedAt: string;
  maxDailyEquity: number;
  minDailyEquity: number;
  maxUpdatedAt: string;
  minUpdatedAt: string;
};
