import { BYBIT_CONSTANTS } from "./constants";

import type {
  IBybitCredentials,
  IBybitOrderCreateBatchRequest,
  IBybitOrderCreateBatchResponse,
} from "../../types/bybit/";
import { signBybitRequest } from "../../utils/bybitHelper";

// POST /api/bybit/order/create-batch
export async function orderCreateBatch(
  credentials: IBybitCredentials,
  payload: IBybitOrderCreateBatchRequest,
  timeOffset?: number,
): Promise<IBybitOrderCreateBatchResponse> {
  const { apiKey } = credentials;

  const requestBody = JSON.stringify(payload);
  const { signature, timestamp } = signBybitRequest({
    credentials,
    queryString: requestBody,
    timeOffset,
  });

  let bybitRes: Response;
  try {
    bybitRes = await fetch(`${BYBIT_CONSTANTS.baseUrl}/v5/order/create-batch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-BAPI-API-KEY": apiKey,
        "X-BAPI-SIGN": signature,
        "X-BAPI-SIGN-TYPE": "2",
        "X-BAPI-TIMESTAMP": timestamp,
        "X-BAPI-RECV-WINDOW": BYBIT_CONSTANTS.recvWindowTimeoutMs,
      },
      body: requestBody,
      signal: AbortSignal.timeout(BYBIT_CONSTANTS.fetchTimeoutMs),
      cache: "no-store",
    });
  } catch (error) {
    throw new Error("ByBit Order Create Batch API network error", {
      cause: error,
    });
  }

  if (!bybitRes.ok) {
    throw new Error("ByBit Order Create Batch API request failed");
  }

  const bybitJson =
    (await bybitRes.json()) as IBybitOrderCreateBatchResponse;

  if (bybitJson.retCode !== 0) {
    throw new Error(bybitJson.retMsg ?? "ByBit error");
  }

  return bybitJson;
}
