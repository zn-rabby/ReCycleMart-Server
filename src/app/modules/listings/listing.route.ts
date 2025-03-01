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

router.delete('/:id', ListingController.deleteListing);

router.put('/:id', ListingController.updateListing);

router.get('/:id', ListingController.getSingleListing);

router.get('/', ListingController.getAllListing);

export const ListingRoutes = router;
