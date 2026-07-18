export type TChallengeAccountInfo = {
    challengeId: string;

    unifiedMarginStatus: number;
    marginMode: string;
    isMasterTrader: boolean;
    spotHedgingStatus: "ON" | "OFF";
    updatedAt: string;
}