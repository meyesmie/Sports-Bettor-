import axios from 'axios';
import { config } from '../config/env';

// ----- PayPal -----
export async function createPayPalOrder(amount: number) {
  const auth = Buffer.from(`${config.paypal.clientId}:${config.paypal.secret}`).toString('base64');
  const { data: tokenRes } = await axios.post(
    'https://api-m.sandbox.paypal.com/v1/oauth2/token',
    'grant_type=client_credentials',
    { headers: { Authorization: `Basic ${auth}` } }
  );
  const { data: order } = await axios.post(
    'https://api-m.sandbox.paypal.com/v2/checkout/orders',
    {
      intent: 'CAPTURE',
      purchase_units: [{ amount: { currency_code: 'USD', value: amount.toString() } }],
    },
    { headers: { Authorization: `Bearer ${tokenRes.access_token}` } }
  );
  return order;
}

export async function capturePayPalOrder(orderId: string) {
  const auth = Buffer.from(`${config.paypal.clientId}:${config.paypal.secret}`).toString('base64');
  const { data: tokenRes } = await axios.post(
    'https://api-m.sandbox.paypal.com/v1/oauth2/token',
    'grant_type=client_credentials',
    { headers: { Authorization: `Basic ${auth}` } }
  );
  const { data } = await axios.post(
    `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`,
    {},
    { headers: { Authorization: `Bearer ${tokenRes.access_token}` } }
  );
  return data;
}

// ----- Paystack -----
export async function initializePaystackPayment(email: string, amount: number, reference: string) {
  const { data } = await axios.post(
    'https://api.paystack.co/transaction/initialize',
    { email, amount: amount * 100, reference },
    { headers: { Authorization: `Bearer ${config.paystack.secretKey}` } }
  );
  return data;
}

export async function verifyPaystackPayment(reference: string) {
  const { data } = await axios.get(
    `https://api.paystack.co/transaction/verify/${reference}`,
    { headers: { Authorization: `Bearer ${config.paystack.secretKey}` } }
  );
  return data;
}

// ----- Skrill (simplified, using mock) -----
export async function createSkrillSession(amount: number, email: string) {
  // In production integrate Skrill Quick Checkout API
  return {
    sid: 'mock-skrill-session-id',
    redirectUrl: `${config.frontendUrl}/payment/skrill/success?sid=mock`,
  };
}
