import express from 'express';

import { PaymentControllers } from '../payment/payment.controller';

const router = express.Router();

router.post(
  '/success/:transactionId',
  PaymentControllers.paymentSuccessController,
);

router.post('/failed/:transactionId', PaymentControllers.paymentFailController);

router.post(
  '/cancelled/:transactionId',
  PaymentControllers.paymentCancelController,
);

export const PaymentRoutes = router;
