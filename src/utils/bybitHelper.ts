import { createHmac } from "crypto";
import { env } from "node:process";
import { getServerTime } from "../providers/bybit";
import { BYBIT_CONSTANTS } from "../providers/bybit/constants";
import type { IBybitSignRequest } from "../types/bybit";

export function signBybitRequest(request: IBybitSignRequest) {
  const { credentials, queryString, timeOffset } = request;
  const { apiSecret, apiKey } = credentials;

  const timestamp = getBybitTimestamp(timeOffset);

  const payload = `${timestamp}${apiKey}${BYBIT_CONSTANTS.recvWindowTimeoutMs}${queryString ?? ""}`;
  const signature = createHmac("sha256", apiSecret)
    .update(payload)
    .digest("hex");

  return { signature, timestamp };
}

export async function syncBybitServerTime(): Promise<number> {
  const localTimeBefore = Date.now();
  const { result } = await getServerTime();

  const serverTime = parseInt(result.timeNano, 10) / 1000000;
  const localTimeAfter = Date.now();

  // Estimate the local time at which Bybit generated
  // the response by using the midpoint.
  const estimatedLatency = (localTimeAfter - localTimeBefore) / 2;
  const timeOffset = Math.round(serverTime - (localTimeBefore + estimatedLatency));

  return timeOffset;
}

export function getBybitTimestamp(timeOffset: number = 0): string {
  return String(Date.now() + timeOffset);
}