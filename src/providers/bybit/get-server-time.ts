import { BYBIT_CONSTANTS } from "./constants";
import { IBybitServerTime, IBybitApiResponse } from "../../types/bybit";

export async function getServerTime(): Promise<IBybitApiResponse<IBybitServerTime>> {
  let bybitRes: Response;
  try {
    bybitRes = await fetch(`${BYBIT_CONSTANTS.baseUrl}/v5/market/time`,
      {
        cache: "no-store",
      }
    );
  } catch (error) {
    console.error("ByBit Server Time network error", error);
    throw new Error("ByBit Server Time network error", { cause: error });
  }

  if (!bybitRes.ok) {
    console.error("ByBit Server Time request failed", bybitRes.status, bybitRes.statusText);
    throw new Error(`ByBit Server Time request failed: ${bybitRes.status}`);
  }

  let bybitJson: IBybitApiResponse<IBybitServerTime>;

  try {
    bybitJson = (await bybitRes.json()) as IBybitApiResponse<IBybitServerTime>;
  } catch (error) {
    console.error("Invalid ByBit Server Time response", error);
    throw new Error("Invalid ByBit Server Time response", { cause: error });
  }

  if (!bybitJson) {
    throw new Error("Invalid ByBit Server Time response");
  }

  if (bybitJson.retCode !== 0) {
    console.error("ByBit Server Time API error", bybitJson);
    throw new Error(bybitJson.retMsg ?? "ByBit server time error");
  }

  return bybitJson;
}