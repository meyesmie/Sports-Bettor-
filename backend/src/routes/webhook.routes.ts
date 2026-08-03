import { Router } from 'express';
import { handlePayPalWebhook, handlePaystackWebhook } from '../controllers/webhook.controller';

const router = Router();
router.post('/paypal', handlePayPalWebhook);
router.post('/paystack', handlePaystackWebhook);
// skrill webhook similarly
export default router;
