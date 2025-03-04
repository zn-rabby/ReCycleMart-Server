import express from 'express';


import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import { TransactionController } from './transactions.controller';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  TransactionController.createTransactionController
);



export const TransactionRoutes = router;
