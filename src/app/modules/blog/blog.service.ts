import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { blogSearchableFields } from './blog.constant';
import { IBlog } from './blog.interface';
import Blog from './blog.model';

const createBlog = async (payload: IBlog) => {
  const blogData = { ...payload };

  const result = await Blog.create(blogData);
  return result;
};

const getAllBlogs = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(Blog.find(), query)
    .search(blogSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await blogQuery.countTotal();
  const result = await blogQuery.modelQuery;

  // check no blogs found
  if (!result.length) {
    throw new AppError(404, 'No blogs found!');
  }

  return {
    meta,
    result,
  };
};

const getSingleBlog = async (id: string) => {
  const user = await Blog.findById(id);

  return user;
};

const updateBlog = async (id: string, payload: Partial<IBlog>) => {
  // check blog is exists
  const blog = await Blog.findById(id);

  if (!blog) {
    throw new AppError(404, 'Blog not found! You cannot update it.');
  }

  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteBlog = async (id: string) => {
  // check blog is exists
  const blog = await Blog.findById(id);

  if (!blog) {
    throw new AppError(404, 'Blog not found!');
  }

  const result = await Blog.findByIdAndDelete(id, { isDeleted: true });

  return result;
};

export const blogService = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
};
