import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ListingServices } from './listing.service';

const createListing = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await ListingServices.createListing(payload);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product created successfully',
    data: result,
  });
});

const getAllListing = catchAsync(async (req, res) => {
  const result = await ListingServices.getAllListing(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Listing are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleListing = catchAsync(async (req, res) => {
  const result = await ListingServices.getSingleListing(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Listing Retrieved Successfully',
    data: result,
  });
});

const updateListing = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await ListingServices.updateListing(id, updatedData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Listing updated successfully',
    data: result,
  });
});

export const ListingController = {
  createListing,
  getAllListing,
  getSingleListing,
  updateListing,
};
