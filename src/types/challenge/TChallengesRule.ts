import { TChallengeTier } from "../..";

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
  readonly nextRuleId: string | null;

  name: string;
  type: TChallengeType;
  mode: TChallengeMode;
  tradingPeriod: string;
  minTradingDays: number;
  positionDrawdownPct: number;
  maxLossPct: number;
  minLossPct: number;
  dailyDrawdownPct: number;
  profitTargetPct: number;
  feePolicy: string;
  prohibitedActions: string[];
  tiers?: TChallengeTier[];

  readonly isActive: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
};

export interface TChallengeRuleGroup {
  label: string;
  mode: TChallengeMode;
  rules: TChallengeRule[];
}
