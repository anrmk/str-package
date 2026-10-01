import type { IBybitMarginMode, IBybitUnifiedMarginStatus } from "./enums";

// Raw account configuration and risk/margin mode data from /v5/account/info.
// Query the account information, like margin mode, account mode, etc.
export type IBybitAccountInfo = {
  unifiedMarginStatus: IBybitUnifiedMarginStatus | number; // 1=Regular, 2=Semi-Unified, 3=Unified, 4=UTA Pro
  marginMode: IBybitMarginMode; 
  isMasterTrader: boolean;
  spotHedgingStatus: "ON" | "OFF";
  updatedTime: string;
};
