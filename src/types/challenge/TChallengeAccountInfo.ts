export type TChallengeAccountInfo = {
    readonly challengeId: string;

    unifiedMarginStatus: number;
    marginMode: string;
    isMasterTrader: boolean;
    spotHedgingStatus: "ON" | "OFF";

    readonly updatedAt: string;
}