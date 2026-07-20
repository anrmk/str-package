import type {
  TChallengeType,
  TChallengeMode,
  TTradingType,
  TDrawdownType,
  TChallengeProgress,
  TChallengeRule,
  TChallengeWalletBalance,
  TChallengeStatistics,
  TChallengeApiKeyInfo,
} from ".";
//import type { TChallengeStats, TChallengeProgress, TChallengeRule, TChallengeWallet, TTradingType, TDrawdownType } from ".";

export type TChallengeItem = {
  id?: string;
  challengeId: string;
  ctype: TChallengeType;
  capital: number;
  currency: string;
  ttype: TTradingType;
  ddtype: TDrawdownType;
  status: string;
  provider: string;
  startDate: string;
  endDate: string;

  apiKey: string;
  apiSecret: string;

  daysActive: number;
  daysRemaining: number;
  hasCredentials: boolean;
  apiKeyHint?: string;
  
  apiKeyInfo?: TChallengeApiKeyInfo;
  stats?: TChallengeStatistics;
  progress?: TChallengeProgress;
  rule?: TChallengeRule;
  wallet?: TChallengeWalletBalance;
};

export type TChallengeListItem = {
  id: string;
  
  capital: number | null;
  currency: string | null;
  ttype: TTradingType | null;
  ddtype: TDrawdownType | null;
  status: string;
  provider: string;
  //expiresAt: string;
  startDate: string;
  endDate: string | null;

  daysActive: number | null;
  daysRemaining: number | null;
  apiKeyHint?: string;
  hasCredentials: boolean;

  stats?: TChallengeStatistics | null;
  progress?: TChallengeProgress | null;
  rule?: TChallengeRule | null;
  wallet?: TChallengeWalletBalance | null;
};