import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AuthService } from './auth.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body);
  // const { _id, name, email } = result;

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

export const AuthController = {
  register,
};
