import express from 'express';
import { AnalyticsControllers } from './analytics.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get(
  '/total-products',
  auth(USER_ROLE.user, USER_ROLE.admin),
  AnalyticsControllers.getTotalProductsAddedController,
);
router.get(
  '/total-purchases',
  auth(USER_ROLE.user, USER_ROLE.admin),
  AnalyticsControllers.getTotalPurchasesController,
);
router.get(
  '/total-sales',
  auth(USER_ROLE.user, USER_ROLE.admin),
  AnalyticsControllers.getTotalSalesController,
);

router.get(
  '/monthly-sales',
  auth(USER_ROLE.user, USER_ROLE.admin),
  AnalyticsControllers.getSalesAnalyticsForCurrentMonthController,
);

export const AnalyticsRoutes = router;
