import { createHmac } from "crypto";
import { env } from "node:process";
import { getServerTime } from "../providers/bybit";
import type { IBybitServerTime } from "../types/bybit";

const BYBIT_RECV_WINDOW_TIMEOUT_MS =
  env.NEXT_PUBLIC_BYBIT_RECV_WINDOW_TIMEOUT_MS ?? "20000";

export async function signBybitRequest(
  apiSecret: string,
  apiKey: string,
  queryString?: string,
) {
  const { result } = await getServerTime();
  console.log("Bybit server time result:", result);
  const timestamp = result?.timeSecond ?? Date.now().toString();
  console.log("Bybit server time timestamp:", timestamp);
  const payload = `${timestamp}${apiKey}${BYBIT_RECV_WINDOW_TIMEOUT_MS}${queryString ?? ""}`;
  const signature = createHmac("sha256", apiSecret)
    .update(payload)
    .digest("hex");

  return { signature, timestamp };
}
