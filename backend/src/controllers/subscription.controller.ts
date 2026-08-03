export const activateSubscription = async (userId: string, plan: 'weekly' | 'monthly', paymentId?: string) => {
  const duration = plan === 'weekly' ? 7 : 30;
  const endDate = new Date(Date.now() + duration * 24 * 60 * 60 * 1000);

  // deactivate any previous active sub
  await prisma.subscription.updateMany({
    where: { userId, active: true },
    data: { active: false },
  });

  const sub = await prisma.subscription.create({
    data: {
      userId,
      plan,
      startDate: new Date(),
      endDate,
      active: true,
      paymentId,
    },
  });

  await prisma.user.update({
    where: { id: userId },
    data: { subscribed: true, subscriptionExp: endDate },
  });

  return sub;
};
