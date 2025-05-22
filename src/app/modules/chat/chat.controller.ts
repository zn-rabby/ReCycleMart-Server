import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ChatService } from './chat.service';

const accessChat = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.body;
  const reqUserId = req.user?._id; // Make sure you're adding `user` in request via middleware

  const result = await ChatService.accessChat(reqUserId, userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Chat accessed successfully',
    data: result,
  });
});

const fetchChats = catchAsync(async (req: Request, res: Response) => {
  const reqUserId = req.user?._id;

  const result = await ChatService.fetchChats(reqUserId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Chats fetched successfully',
    data: result,
  });
});
export const ChatController = {
  accessChat,
  fetchChats
};
