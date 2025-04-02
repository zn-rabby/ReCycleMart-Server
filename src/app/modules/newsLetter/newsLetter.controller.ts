import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { NewsLetterServices } from './newsLetter.service';

const createNewsLetter = catchAsync(async (req, res) => {
  const newsLetterPayload = req.body;
  const createdNewsLetter =
    await NewsLetterServices.createNewsLetter(newsLetterPayload);
  sendResponse(res, {
    success: true,
    message: 'NewsLetter is created successfully',
    statusCode: 201,
    data: createdNewsLetter,
  });
});

const getAllNewsLetters = catchAsync(async (req, res) => {
  const newsLetters = await NewsLetterServices.getAllNewsLetters();
  sendResponse(res, {
    success: true,
    message: 'NewsLetters are retrieved successfully',
    statusCode: 200,
    data: newsLetters,
  });
});

export const newsLetterController = {
  createNewsLetter,
  getAllNewsLetters,
};
