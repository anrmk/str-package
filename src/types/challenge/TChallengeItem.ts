import type {
  TChallengeProgress,
  TChallengeRule,
  TChallengeWalletBalance,
  TChallengeStatistics,
  TChallengeApiKeyInfo,
  TChallengeStatus,
} from ".";

type TChallengeBase = {
  readonly id: string;
  readonly status: TChallengeStatus;
  readonly statusDescription: string;

  provider: string;
  capital: number;
  currency: string;
  startDate: string;
  endDate: string;

  readonly createdAt: string;
  readonly updatedAt: string;
};

export type TChallengeItem = TChallengeBase & {
  apiKeyInfo?: TChallengeApiKeyInfo;
  statistics?: TChallengeStatistics;
  progress?: TChallengeProgress;
  rule?: TChallengeRule;
  wallet?: TChallengeWalletBalance;
};

export type TChallengeListItem = TChallengeBase & {
  statistics?: TChallengeStatistics;
  progress?: TChallengeProgress;
  rule?: TChallengeRule;
  wallet?: TChallengeWalletBalance;

  daysActive: number | null;
  daysRemaining: number | null;
  apiKeyHint?: string;
  hasCredentials: boolean;
};
