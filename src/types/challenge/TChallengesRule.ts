export type TChallengeType = "ONE_STEP" | "TWO_STEPS" | "THREE_STEPS";
export type TChallengeMode = "VERIFICATION" | "CHALLENGE" | "FUNDED";

//depricated
export type TTradingType = "Futures" | "Spot" | "Margin" | "Options";
export type TDrawdownType = "Trailing" | "Fixed";

export type TChallengeCapital = 5000 | 10000 | 25000 | 50000 | 100000 | 200000;
export type TChallengeProvider = "BYBIT" | "CLEO" | "TEALSTREET" | "TIGER";
export type TChallengeStatus = "ACTIVE" | "EXPIRED" | "COMPLETED" | "FAILED";

export type TChallengeRule = {
  readonly id: string;
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
  prohibitedActions: string[];
  readonly createdAt: string;
  readonly updatedAt: string;
  isActive: boolean;
};