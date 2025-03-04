import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/appError';
import User from '../user/user.model';
import { ListingSearchableFields } from './listing.constant';
import { IListing } from './listing.interface';
import { Listing } from './listing.model';

// create listing
const createListing = async (payload: IListing, userEmail: string) => {
  const user = await User.isUserExists(userEmail);  // Use User model to check user existence

  if (!user) {
    throw new AppError(404, 'User not found!');
  }

  const userID = user._id;

  const listingData = { ...payload, userID };

  const result = await Listing.create(listingData);
  return result;
};


const getAllListing = async (query: Record<string, unknown>) => {
  const listingQuery = new QueryBuilder(Listing.find().populate('userID'), query)
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


const getOwnListings = async (userEmail: string) => {
 const user = await User.findOne({email: userEmail})
 console.log(user)
 if(!user){
 throw new  AppError(404,"User Not FOund")
 }

 const listing = await Listing.find({userID: user._id})
 console.log(listing)

 if(listing.length === 0){
  throw new  AppError(404,"listing Not FOund")
 }


 return listing
 
};

const getSingleListing = async (id: string) => {
  const res = await Listing.findById(id);

  return res;
};

const updateListing = async (id: string, payload: Partial<IListing>) => {
  // check blog is exists
  const product = await Listing.findById({ _id: id });

  if (!product) {
    throw new AppError(404, 'Listing not found!');
  }

  const result = await Listing.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteListing = async (id: string) => {
  // check deleteListing is exists
  const listing = await Listing.findById(id);

  if (!listing) {
    throw new AppError(404, 'Listing not found!');
  }

  const result = await Listing.findByIdAndDelete(id, { isDeleted: true });

  return result;
};

export const ListingServices = {
  createListing,
  getAllListing,
  getSingleListing,
  updateListing,
  deleteListing,
  getOwnListings
};
