// https://bybit-exchange.github.io/docs/v5/user/apikey-info
// Get the information of the api key. Use the api key pending to be checked to call the endpoint. 
// Both master and sub user's api key are applicable.
export type IBybitApiKeyInfo = {
  id: string;
  note: string;
  apiKey: string;
  readOnly: number;
  permissions: IBybitApiKeyPermissions;
  ips: string[];
  type: number;
  deadlineDay: number;
  expiredAt: string;
  createdAt: string;
  uta: number;
  userID: number;
  inviterID: number;
  vipLevel: string;
  mktMakerLevel: string;
  affiliateID: number;
  rsaPublicKey: string;
  isMaster: boolean;
  parentUid: string;
  kycLevel: string;
  kycRegion: string;
};

// Permission buckets included in /v5/user/query-api response.
export type IBybitApiKeyPermissions = {
  ContractTrade?: string[];
  Spot?: string[];
  Wallet?: string[];
  Options?: string[];
  Derivatives?: string[];
  Exchange?: string[];
  Earn?: string[];
  FiatP2P?: string[];
  FiatBitPay?: string[];
  FiatConvertBroker?: string[];
  BitCard?: string[];
  ByXPost?: string[];
  Affiliate?: string[];
  BlockTrade?: string[];
  FiatBybitPay?: string[];
   NFT?: string[];
  CopyTrading?: string[];
};
