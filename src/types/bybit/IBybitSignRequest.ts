import type { IBybitCredentials } from "./IBybitCredentials";

export type IBybitSignRequest = {
  credentials: IBybitCredentials;
  recvWindow?: string;
  queryString?: string;
  timeOffset?: number;
};
