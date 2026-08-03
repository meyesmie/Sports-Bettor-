export type PaymentMethod = 'paypal' | 'skrill' | 'paystack';

export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export interface PaymentRecord {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  transactionId: string;
  status: PaymentStatus;
  metadata?: Record<string, any>;
  createdAt: Date;
}

export interface InitializePaymentInput {
  amount: number;
  method: PaymentMethod;
  plan: SubscriptionPlan;
}
