import express from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import { ChatController } from './chat.controller';

const router = express.Router();

router.post(
  '/', auth(USER_ROLE.user, USER_ROLE.admin),
  ChatController.accessChat,
);
router.get(
  '/', auth(USER_ROLE.user, USER_ROLE.admin),
  ChatController.fetchChats,
);
router.post(
  '/group', auth(USER_ROLE.user, USER_ROLE.admin),
//   ChatController.createGroupChat,
);
router.post(
  '/rename', auth(USER_ROLE.user, USER_ROLE.admin),
//   ChatController.renameGroup,
);
router.post(
  '/groupremove', auth(USER_ROLE.user, USER_ROLE.admin),
//   ChatController.removeFromGroup,
);
router.post(
  '/groupadd', auth(USER_ROLE.user, USER_ROLE.admin),
//   ChatController.addToGroup,
);


export const ChatRoutes = router;
