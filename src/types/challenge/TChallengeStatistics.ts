export type TChallengeStatistics = {
  readonly id: string | null;
  readonly challengeId: string;
  totalClosedTradesCount: number;
  totalClosedTrades: number;
  totalLongTradesCount: number;
  totalShortTradesCount: number;
  totalWins: number;
  totalLosses: number;
  winRate: number;
  totalLongTrades: number;
  totalLongWins: number;
  totalShortTrades: number;
  totalShortWins: number;
  readonly updatedAt: string;

  loosesRate?: number;
  totalCumEntryValue?: number;
  totalCumExitValue?: number;
};
