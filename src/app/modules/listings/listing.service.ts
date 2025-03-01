import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/appError';
import { ListingSearchableFields } from './listing.constant';
import { IListing } from './listing.interface';
import { Listing } from './listing.model';

// create listing
const createListing = async (payload: IListing): Promise<IListing> => {
  const result = await Listing.create(payload);
  return result;
};

const getAllListing = async (query: Record<string, unknown>) => {
  const listingQuery = new QueryBuilder(Listing.find(), query)
    .search(ListingSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await listingQuery.countTotal();
  const result = await listingQuery.modelQuery;

  if (!result.length) {
    throw new AppError(404, 'No listing found!');
  }
  return {
    meta,
    result,
  };
};

export const ListingServices = {
  createListing,
  getAllListing,
};
