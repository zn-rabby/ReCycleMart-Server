import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { BlogValidation } from './blog.validation';
import { blogController } from './blog.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const BlogRouters = Router();

BlogRouters.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(BlogValidation.createBlogValidationSchema),
  blogController.createBlog,
);

BlogRouters.get('/', blogController.getAllBlogs);

BlogRouters.get('/:id', blogController.getSingleBlog);

BlogRouters.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(BlogValidation.updateBlogValidationSchema),
  blogController.updateBlog,
);

BlogRouters.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  blogController.deleteBlog,
);

export default BlogRouters;
