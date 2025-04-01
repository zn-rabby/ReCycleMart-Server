import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { blogService } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  // const userEmail = req?.user?.email;

  const result = await blogService.createBlog(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await blogService.getAllBlogs(query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blogs fetched successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleBlog = catchAsync(async (req, res) => {
  const user = await blogService.getSingleBlog(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Blog Retrieved Successfully',
    data: user,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await blogService.updateBlog(id, updatedData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog updated successfully',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const id = req.params.id;
  await blogService.deleteBlog(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog deleted successfully',
    data: {},
  });
});

export const blogController = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
};
