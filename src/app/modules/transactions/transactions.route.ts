import express from 'express';

import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import { TransactionController } from './transactions.controller';
import { PaymentControllers } from '../payment/payment.controller';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user, USER_ROLE.admin),
  TransactionController.createTransactionController,
);

router.get(
  '/purchases',
  auth(USER_ROLE.user, USER_ROLE.admin),
  TransactionController.getUserPurchases,
);

router.get(
  '/sales',
  auth(USER_ROLE.user, USER_ROLE.admin),
  TransactionController.getUserSales,
);

router.patch(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  TransactionController.updateTransactionStatus,
);

router.post(
  '/success/:transactionId',
  PaymentControllers.paymentSuccessController,
);

router.post('/failed/:transactionId', PaymentControllers.paymentFailController);

router.post(
  '/cancelled/:transactionId',
  PaymentControllers.paymentCancelController,
);

export const TransactionRoutes = router;
