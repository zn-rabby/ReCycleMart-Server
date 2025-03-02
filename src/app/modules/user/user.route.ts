import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.get('/:id', UserController.getSingleUser);

router.put('/:id', UserController.updateUser);

// router.get('/:id', ListingController.getSingleListing);

export const UserRoutes = router;

// GET /users/:id – Retrieve user details.
// PUT /users/:id – Update user profile.
// DELETE /users/:id – Delete user account.
