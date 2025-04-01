import { Router } from 'express';
import { ListingRoutes } from '../modules/listings/listing.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { UserRoutes } from '../modules/user/user.route';
import { TransactionRoutes } from '../modules/transactions/transactions.route';
import BlogRouters from '../modules/blog/blog.route';
const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/listings',
    route: ListingRoutes,
  },
  {
    path: '/transactions',
    route: TransactionRoutes,
  },
  {
    path: '/blogs',
    route: BlogRouters,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
