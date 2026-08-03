'use client';
import { useAuth } from '@/providers/AuthProvider';
import { PremiumContent } from '@/components/premium/PremiumContent';
import { PremiumLocked } from '@/components/premium/PremiumLocked';

export function PremiumGate() {
  const { user } = useAuth();
  const isSubscribed = user?.subscribed && new Date(user?.subscriptionExp) > new Date();

  if (!isSubscribed) return <PremiumLocked />;
  return <PremiumContent />;
}
