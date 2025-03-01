import express from 'express';
import { listingController } from './listing.controller';

const router = express.Router();

// create listing
router.post('/listing', listingController.createListing);

export const ListingRoutes = router;
