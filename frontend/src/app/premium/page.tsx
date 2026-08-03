import { PremiumLocked } from '@/components/premium/PremiumLocked';
import { PremiumContent } from '@/components/premium/PremiumContent';
import { getServerSession } from '@/lib/auth-server';

export default async function PremiumPage() {
  const session = await getServerSession();
  const isSubscribed = session?.user?.subscribed;

  if (!isSubscribed) return <PremiumLocked />;
  return <PremiumContent />;
}
