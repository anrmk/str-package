export type TPaymentProviderId = "free" | "confirmo" | "moonpay" | "nowpayments" | "zen";

export type TPaymentStatus = "created" | "pending" | "completed" | "failed";

export type TCreatePaymentRequest = {
  amount: number;
  currency: string;
  description?: string;
  orderId?: string;
};

export type TCreatePaymentResult = {
  provider: TPaymentProviderId;
  paymentId?: string;
  checkoutUrl: string;
  status: TPaymentStatus;
};

export type TPaymentProvider = {
  readonly id: TPaymentProviderId;
  createPayment(request: TCreatePaymentRequest): Promise<TCreatePaymentResult>;
};
