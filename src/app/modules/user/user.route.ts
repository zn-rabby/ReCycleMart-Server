import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.get('/:id', auth(USER_ROLE.user), UserController.getSingleUser);

router.put('/:id', auth(USER_ROLE.user), UserController.updateUser);

router.delete('/:id', auth(USER_ROLE.user), UserController.deleteListing);

export const UserRoutes = router;
