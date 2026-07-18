import { createHmac } from "crypto";
import { env } from "node:process";

const BYBIT_RECV_WINDOW_TIMEOUT_MS =
  env.NEXT_PUBLIC_BYBIT_RECV_WINDOW_TIMEOUT_MS ?? "20000";

export function signBybitRequest(
  apiSecret: string,
  apiKey: string,
  queryString?: string,
) {
  const timestamp = Date.now().toString();
  const payload = `${timestamp}${apiKey}${BYBIT_RECV_WINDOW_TIMEOUT_MS}${queryString ?? ""}`;
  const signature = createHmac("sha256", apiSecret)
    .update(payload)
    .digest("hex");

  return { signature, timestamp };
}
