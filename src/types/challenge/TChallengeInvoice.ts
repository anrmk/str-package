import { TCreatePaymentResult } from "../payments";

export type TChallengeInvoice = TCreatePaymentResult & {
  readonly createdAt: string;
  readonly updatedAt: string;
};
