import { Request, Response } from 'express';
import { listingServices } from './listing.service';
import { StatusCodes } from 'http-status-codes';

import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createListing = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await listingServices.createListing(payload);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product created successfully',
    data: result,
  });
});

export const listingController = {
  createListing,
};
