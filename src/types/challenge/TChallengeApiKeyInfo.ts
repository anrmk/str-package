import { IBybitApiKeyVipLevel } from "../bybit/enums";

export type TChallengeApiKeyInfo = {
    challengeId: string;
    bybitApiKeyId: string;
    note: string;
    apiKey: string;
    readOnly: boolean;
    permissions: string[];
    ips: string[];
    type: number;
    deadlineDay: number;
    expiredAt: string;
    createdAt: string;
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

    readonly updatedAt: string;
}