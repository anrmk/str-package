import type { IBybitCoinType } from "../bybit";
import type { TChallengeCapital } from "./TChallengesRule";

export type TChallengeTier = {
  readonly id: string;
  readonly ruleId: string;
  capital: TChallengeCapital;
  currency: IBybitCoinType;
  priceUsd: number;
  isActive: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
};
