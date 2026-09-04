import { createHmac } from "crypto";
import { env } from "node:process";
import { getServerTime } from "../providers/bybit";
import type { IBybitServerTime, IBybitSignRequest } from "../types/bybit";

const BYBIT_RECV_WINDOW_TIMEOUT_MS =
  env.NEXT_PUBLIC_BYBIT_RECV_WINDOW_TIMEOUT_MS ?? "20000";

export function signBybitRequest(request: IBybitSignRequest) {
  const { credentials, queryString, timeOffset } = request;
  const { apiSecret, apiKey } = credentials;

  const timestamp = getBybitTimestamp(timeOffset);
  console.log("Bybit server time timestamp:", timestamp);
  const payload = `${timestamp}${apiKey}${BYBIT_RECV_WINDOW_TIMEOUT_MS}${queryString ?? ""}`;
  const signature = createHmac("sha256", apiSecret)
    .update(payload)
    .digest("hex");

  return { signature, timestamp };
}

export async function syncBybitServerTime(): Promise<number> {
  const requestStart = Date.now();
  const { result } = await getServerTime();
  const requestEnd = Date.now();
  const serverTime = Number(result.timeSecond) * 1000;

  // Estimate the local time at which Bybit generated
  // the response by using the midpoint.
  const localMidpoint = requestStart + (requestEnd - requestStart) / 2;

  const bybitTimeOffset = serverTime - localMidpoint;

  console.log({
    serverTime,
    requestStart,
    requestEnd,
    latency: requestEnd - requestStart,
    bybitTimeOffset,
  });

  return bybitTimeOffset;
}

export function getBybitTimestamp(timeOffset: number = 0): string {
  // Small safety margin: keep request slightly behind server.
  return String(Date.now() + timeOffset - 250);
}