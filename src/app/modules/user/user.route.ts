import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.get('/:id', UserController.getSingleUser);

router.put('/:id', UserController.updateUser);

router.delete('/:id', UserController.deleteListing);

export const UserRoutes = router;
