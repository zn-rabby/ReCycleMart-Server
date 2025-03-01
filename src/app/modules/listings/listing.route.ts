import express from 'express';

import { listingValidation } from './listing.validation';
import validateRequest from '../../middleware/validateRequest';
import { ListingController } from './listing.controller';

const router = express.Router();

// create listing
router.post(
  '/',
  validateRequest(listingValidation.createListingValidationSchema),
  ListingController.createListing,
);

router.get('/', ListingController.getAllListing);
router.get('/:id', ListingController.getSingleListing);
router.put('/:id', ListingController.updateListing);

export const ListingRoutes = router;
