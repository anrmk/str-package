export type TChallengeType = "ONE_STEP" | "TWO_STEPS";
export type TChallengeMode = "VERIFICATION" | "CHALLENGE" | "FUNDED";
export type TTradingType = "Futures" | "Spot" | "Margin" | "Options";
export type TDrawdownType = "Trailing" | "Fixed";
export type TChallengeCapital = 5000 | 10000 | 25000 | 50000 | 100000 | 200000;
export type TChallengeProvider = "BYBIT" | "CLEO";

export type TChallengeRule = {
  name: string;
  type: TChallengeType;
  mode: TChallengeMode;
  tradingPeriod: string;
  minTradingDays: number;
  stopLossRequired: boolean;
  dailyDrawdownPct: number;
  maxLossPct: number;
  minLossPct: number;
  profitTargetPct: number;
  feePolicy: string;
  prohibitedActions: string[] | null;

  // createdAt: string;
  // updatedAt: string;
};