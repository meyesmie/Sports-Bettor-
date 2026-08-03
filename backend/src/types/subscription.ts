export type SubscriptionPlan = 'weekly' | 'monthly';

export interface SubscriptionDetails {
  id: string;
  userId: string;
  plan: SubscriptionPlan;
  startDate: Date;
  endDate: Date;
  active: boolean;
  paymentId?: string;
}

export interface ActivateSubscriptionInput {
  userId: string;
  plan: SubscriptionPlan;
  paymentId?: string;
}
