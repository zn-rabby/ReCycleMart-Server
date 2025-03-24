import express from 'express';

import { listingValidation } from './listing.validation';
import validateRequest from '../../middleware/validateRequest';
import { ListingController } from './listing.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(listingValidation.createListingValidationSchema),
  ListingController.createListing,
);
router.get('/', ListingController.getAllListing);

router.get(
  '/user',
  auth(USER_ROLE.user, USER_ROLE.admin),
  ListingController.getListingByUser,
);

router.get('/:id', ListingController.getSingleListing);

router.get(
  '/my-listings',
  auth(USER_ROLE.user, USER_ROLE.admin),
  ListingController.getOwnListings,
);

router.patch(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  ListingController.updateListing,
);

router.delete(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  ListingController.deleteListing,
);

export const ListingRoutes = router;
