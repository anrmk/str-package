export type TChallengeProgress = {
  id: string | null;
  challengeId: string;
  totalLoss: number;
  tradingDays: number;
  dailyDrawdown: number;
  profitTarget: number;
  dailyStartingEquity: number;
  dailyStartingUpdatedAt: string;
  dailyMaxEquity: number;
  dailyMinEquity: number;
  dailyMaxUpdatedAt: string;
  dailyMinUpdatedAt: string;
};
