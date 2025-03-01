import { IListing } from './listing.interface';
import { Listing } from './listing.model';

// create listing
const createListing = async (payload: IListing): Promise<IListing> => {
  const result = await Listing.create(payload);
  return result;
};

export const listingServices = {
  createListing,
};
