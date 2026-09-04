import { BYBIT_CONSTANTS } from "./constants";
import { IBybitCredentials, IBybitApiKeyInfo, IBybitApiResponse} from "../../types/bybit";
import { signBybitRequest } from "../../utils/bybitHelper";

export async function getApiKeyInfo(
  credentials: IBybitCredentials,
  timeOffset?: number,
): Promise<IBybitApiResponse<IBybitApiKeyInfo>> {
  const { signature, timestamp } = signBybitRequest({
    credentials,
    timeOffset,
  });

  let bybitRes: Response;
  try {
    bybitRes = await fetch(`${BYBIT_CONSTANTS.baseUrl}/v5/user/query-api`, {
      headers: {
        "X-BAPI-API-KEY": credentials.apiKey,
        "X-BAPI-SIGN": signature,
        "X-BAPI-SIGN-TYPE": "2",
        "X-BAPI-TIMESTAMP": timestamp,
        "X-BAPI-RECV-WINDOW": BYBIT_CONSTANTS.recvWindowTimeoutMs,
      },
      //signal: AbortSignal.timeout(BYBIT_CONSTANTS.fetchTimeoutMs),
      cache: "no-store",
    });
  } catch (error) {
    console.error("ByBit API Key Info network error", error);
    throw new Error("ByBit API Key Info network error", { cause: error });
  }

  if (!bybitRes.ok) {
    console.error("ByBit API Key Info request failed", bybitRes);
    throw new Error("ByBit API Key Info request failed");
  }

  const bybitJson =
    (await bybitRes.json()) as IBybitApiResponse<IBybitApiKeyInfo>;

  if (bybitJson.retCode !== 0) {
    console.error("ByBit API Key Info API error", bybitJson);
    throw new Error(bybitJson.retMsg ?? "ByBit error");
  }

  if (!bybitJson) {
    console.error("Invalid ByBit API Key Info response", bybitJson);
    throw new Error("Invalid ByBit API Key Info response");
  }

  return bybitJson;
}
