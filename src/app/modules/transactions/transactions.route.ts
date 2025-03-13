import express from 'express';


import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import { TransactionController } from './transactions.controller';
import { PaymentControllers } from './payment.controller';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  TransactionController.createTransactionController
);


router.get(
  '/purchases',
  auth(USER_ROLE.user),
  TransactionController.getUserPurchases
);

router.get(
  '/sales',
  auth(USER_ROLE.user),
  TransactionController.getUserSales
);

router.patch(
  '/:id',
  auth(USER_ROLE.user),
  TransactionController.updateTransactionStatus
);


router.post(
  '/success/:transactionId',
  PaymentControllers.paymentSuccessController,
);

router.post(
  '/failed/:transactionId',
  PaymentControllers.paymentFailController,
);

router.post(
  '/cancelled/:transactionId',
  PaymentControllers.paymentCancelController,
);



export const TransactionRoutes = router;
