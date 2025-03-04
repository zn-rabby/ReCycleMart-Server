import express from 'express';

import { listingValidation } from './listing.validation';
import validateRequest from '../../middleware/validateRequest';
import { ListingController } from './listing.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',auth(USER_ROLE.user),
  validateRequest(listingValidation.createListingValidationSchema),
  ListingController.createListing,
);

router.get('/my-listings', auth(USER_ROLE.user), ListingController.getOwnListings);
router.delete('/:id',auth(USER_ROLE.user), ListingController.deleteListing);

router.patch('/:id',auth(USER_ROLE.user), ListingController.updateListing);

router.get('/:id', ListingController.getSingleListing);

router.get('/', ListingController.getAllListing);


export const ListingRoutes = router;
