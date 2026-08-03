export const handlePaystackWebhook = async (req: Request, res: Response) => {
  const signature = req.headers['x-paystack-signature'];
  // verify signature with secret
  const event = req.body;
  if (event.event === 'charge.success') {
    const { reference, metadata } = event.data;
    const payment = await prisma.payment.findUnique({ where: { transactionId: reference } });
    if (payment && payment.status !== 'completed') {
      await prisma.payment.update({ where: { id: payment.id }, data: { status: 'completed' } });
      await activateSubscription(payment.userId, metadata.plan, payment.id);
      // create notification
    }
  }
  res.sendStatus(200);
};
