import { IBybitApiKeyVipLevel } from "../bybit/enums";

export type TChallengeApiKeyInfo = {
  readonly challengeId: string;
  
  bybitApiKeyId: string;
  note: string;
  apiKey: string;
  secret: string;
  readOnly: boolean;
  permissions: string[];
  ips: string[];
  type: number;
  deadlineDay: number;
  uta: string;
  userId: string;
  inviterId: string;
  vipLevel: IBybitApiKeyVipLevel;
  marketMakerLevel: number;
  affiliateId: string;
  rsaPublicKey: string;
  isMaster: boolean;
  parentUid: string;
  kycLevel: number;
  kycRegion: string;
  hasCredentials: boolean;

  readonly expiredAt: string;
  readonly createdAt: string;
  readonly updatedAt: string;
};
