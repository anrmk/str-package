import {
  IBybitCredentials,
  IBybitAccountInfo,
  IBybitApiResponse,
} from "../../types/bybit";
import { signBybitRequest } from "../../utils/bybitHelper";
import { BYBIT_CONSTANTS } from "./constants";

export async function getAccountInfo(
  credentials: IBybitCredentials,
): Promise<IBybitApiResponse<IBybitAccountInfo>> {
  const { apiKey, apiSecret } = credentials;
  const queryString = "accountType=UNIFIED";
  const { signature, timestamp } = await signBybitRequest(
    apiSecret,
    apiKey,
    queryString,
  );

  let bybitRes: Response;
  try {
    bybitRes = await fetch(`${BYBIT_CONSTANTS.baseUrl}/v5/account/info`, {
      headers: {
        "X-BAPI-API-KEY": apiKey,
        "X-BAPI-SIGN": signature,
        "X-BAPI-SIGN-TYPE": "2",
        "X-BAPI-TIMESTAMP": timestamp,
        "X-BAPI-RECV-WINDOW": BYBIT_CONSTANTS.recvWindowTimeoutMs,
      },
      signal: AbortSignal.timeout(BYBIT_CONSTANTS.fetchTimeoutMs),
      cache: "no-store",
    });
  } catch (error) {
    console.error("ByBit Account API network error", error);
    throw new Error("ByBit Account API network error", { cause: error });
  }

  if (!bybitRes.ok) {
    console.error("ByBit Account API request failed", bybitRes);
    throw new Error("ByBit Account API request failed");
  }

  const bybitJson =
    (await bybitRes.json()) as IBybitApiResponse<IBybitAccountInfo>;

  if (bybitJson.retCode !== 0) {
    console.error("ByBit Account API error", bybitJson);
    throw new Error(bybitJson.retMsg ?? "ByBit error");
  }

  const raw = bybitJson.result?.list?.[0];

  if (!raw) {
    console.error("No account info returned", bybitJson);
    throw new Error("No account info returned");
  }

  return bybitJson;
}
