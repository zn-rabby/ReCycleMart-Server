/* eslint-disable @typescript-eslint/no-explicit-any */

import AppError from '../../errors/appError';
import User from '../user/user.model';
import { Chat } from './chat.model';

const accessChat = async (reqUserId: string, userId: string) => {
  if (!userId) {
    throw new AppError(400, 'User ID is required');
  }

  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: reqUserId } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate('users', '-password')
    .populate('latestMessage');

  isChat = await User.populate(isChat, {
    path: 'latestMessage.sender',
    select: 'name pic email',
  });

  if (isChat.length > 0) {
    return isChat[0];
  }

  const chatData = {
    chatName: 'sender',
    isGroupChat: false,
    users: [reqUserId, userId],
  };

  const createdChat = await Chat.create(chatData);
  const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
    'users',
    '-password'
  );

  return fullChat;
};

 const fetchChats  = async (userId: string) => {
  try {
    const results = await Chat.find({ users: { $elemMatch: { $eq: userId } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    const populatedResults = await User.populate(results, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    return populatedResults;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const ChatService = {
  accessChat,fetchChats 
};
