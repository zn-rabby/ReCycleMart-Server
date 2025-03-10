import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { IJwtPayload } from './user.interface';
import { UserServices } from './user.service';

const getSingleUser = catchAsync(async (req, res) => {
  const result = await UserServices.getSingleUser(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User Retrieved Successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await UserServices.updateUser(id, updatedData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Listing updated successfully',
    data: result,
  });
});

const deleteListing = catchAsync(async (req, res) => {
  const id = req.params.id;
  await UserServices.deleteUser(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User deleted successfully',
    data: {},
  });
});

const myProfile = catchAsync(async (req, res) => {
  const { email } = req.user; // Ensure `auth` middleware attaches the user's email to `req.user`
  const result = await UserServices.myProfile(email);
  console.log(result)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Profile retrieved successfully',
    data: result,
  });
});

export const UserController = {
  getSingleUser,
  updateUser,
  deleteListing,myProfile
};
