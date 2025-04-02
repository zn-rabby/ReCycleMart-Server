import express from 'express';
import { NewsLetterControllers } from './newsLetter.controller';
import { validateRequestSchema } from '../../middleware/validateRequestSchema';
import { NewsLetterValidationSchema } from './newsLetter.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  validateRequestSchema(
    NewsLetterValidationSchema.createNewsLetterValidationSchema,
  ),
  NewsLetterControllers.createNewsLetterController,
);

router.get(
  '/',
  auth(USER_ROLE.admin),
  NewsLetterControllers.getAllNewsLettersController,
);

export const NewsLetterRoutes = router;
