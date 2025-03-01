import { Request, Response } from 'express';
import { listingServices } from './listing.service';

// create listing
const createListing = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await listingServices.createListing(payload);

    res.json({
      status: true,
      message: 'Listing create successfully',
      data: result,
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    });
  }
};

export const listingController = {
  createListing,
};
