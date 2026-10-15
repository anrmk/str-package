import type {
  TChallengeProgress,
  TChallengeRule,
  TChallengeWalletBalance,
  TChallengeStatistics,
  TChallengeApiKeyInfo,
  TChallengeStatus,
  TChallengeClosedPnl,
  TChallengePositionInfo,
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
  cpnl?: TChallengeClosedPnl[];
  pinfo?: TChallengePositionInfo[];

  daysActive?: number | null;
  daysRemaining?: number | null;
  apiKeyHint?: string;
  hasCredentials: boolean;
};

// deprecated: TChallengeListItem is a simplified version of TChallengeItem for list views
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
