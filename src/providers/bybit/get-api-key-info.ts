import { BYBIT_CONSTANTS } from "./constants";
import { IBybitCredentials, IBybitApiKeyInfo, IBybitApiResponse} from "../../types/bybit";
import { signBybitRequest } from "../../utils/bybitHelper";

export async function getApiKeyInfo(
  credentials: IBybitCredentials,
): Promise<IBybitApiResponse<IBybitApiKeyInfo>> {
  const { apiKey, apiSecret } = credentials;

  if (!apiKey || !apiSecret) {
    throw new Error("ByBit API key and API secret are required");
  }

  const { signature, timestamp } = signBybitRequest(apiSecret, apiKey);

  let bybitRes: Response;
  try {
    bybitRes = await fetch(`${BYBIT_CONSTANTS.baseUrl}/v5/user/query-api`, {
      headers: {
        "X-BAPI-API-KEY": apiKey,
        "X-BAPI-SIGN": signature,
        "X-BAPI-SIGN-TYPE": "2",
        "X-BAPI-TIMESTAMP": timestamp,
        "X-BAPI-RECV-WINDOW": BYBIT_CONSTANTS.recvWindowTimeoutMs,
      },
      //signal: AbortSignal.timeout(BYBIT_CONSTANTS.fetchTimeoutMs),
      cache: "no-store",
    });
  } catch (error) {
    throw new Error("ByBit API Key Info network error", { cause: error });
  }

  if (!bybitRes.ok) {
    throw new Error("ByBit API Key Info request failed");
  }

  const bybitJson =
    (await bybitRes.json()) as IBybitApiResponse<IBybitApiKeyInfo>;

  if (bybitJson.retCode !== 0) {
    throw new Error(bybitJson.retMsg ?? "ByBit error");
  }

  if (!bybitJson) {
    throw new Error("Invalid ByBit API Key Info response");
  }

  return bybitJson;
}
