import { Router } from 'express';
import { ListingRoutes } from '../modules/listings/listing.route';
import { AuthRoutes } from '../modules/auth/auth.route';
const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/listings',
    route: ListingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
