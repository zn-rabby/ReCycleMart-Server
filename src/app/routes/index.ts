import { Router } from 'express';
import { ListingRoutes } from '../modules/listings/listing.route';
const router = Router();

const moduleRoutes = [
  {
    path: '/listings',
    route: ListingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
