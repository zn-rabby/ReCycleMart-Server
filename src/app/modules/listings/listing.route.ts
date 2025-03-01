import express from 'express';
import { listingController } from './listing.controller';
import { listingValidation } from './listing.validation';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();

// create listing
router.post(
  '/',
  validateRequest(listingValidation.createListingValidationSchema),
  listingController.createListing,
);

export const ListingRoutes = router;
