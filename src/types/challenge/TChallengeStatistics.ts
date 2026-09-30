export type TChallengeStatistics = {
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

  loosesRate?: number;
  totalCumEntryValue?: number;
  totalCumExitValue?: number;

  readonly createdAt: string;
  readonly updatedAt: string;
};
