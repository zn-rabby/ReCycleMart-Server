import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
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

export const UserController = {
  getSingleUser,
};
