import moment from 'moment';
import AppError from '../../errors/appError';
import { Listing } from '../listings/listing.model';
import User from '../user/user.model';
import { Transaction } from '../transactions/transactions.nodel';

export const getTotalProductsAdded = async (identifier: string) => {
  const user = await User.isUserExists(identifier);
  if (!user) {
    throw new AppError(404, 'User not found');
  }

  return Listing.countDocuments({ userID: user._id, isDeleted: false });
};

export const getTotalPurchases = async (identifier: string) => {
  const user = await User.isUserExists(identifier);
  if (!user) {
    throw new AppError(404, 'User not found');
  }

  return Transaction.countDocuments({ buyerID: user._id, status: 'completed' });
};

export const getTotalSales = async (identifier: string) => {
  const user = await User.isUserExists(identifier);
  if (!user) {
    throw new AppError(404, 'User not found');
  }

  // find all transactions where the seller matches the user's ID and the status is 'completed'
  const transactions = await Transaction.find({
    sellerID: user._id,
    status: 'completed',
  });

  // fetch the price of each item in the transactions
  let totalSales = 0;
  for (const transaction of transactions) {
    const item = await Listing.findById(transaction.itemID);
    if (item && item.price) {
      totalSales += item.price;
    }
  }

  return totalSales;
};

const getSalesAnalyticsForCurrentMonth = async (identifier: string) => {
  // get the start and end date of the current month dynamically
  const startOfMonth = moment().startOf('month').toDate();
  const endOfMonth = moment().endOf('month').toDate();

  const user = await User.isUserExists(identifier);

  if (!user) throw new AppError(404, 'User not found');

  const result = await Transaction.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startOfMonth,
          $lt: endOfMonth,
        },
        status: 'completed',
        sellerID: user._id,
      },
    },
    {
      $lookup: {
        from: 'listings',
        localField: 'itemID',
        foreignField: '_id',
        as: 'listingDetails',
      },
    },
    {
      $unwind: '$listingDetails',
    },
    {
      $project: {
        day: { $dayOfMonth: '$createdAt' },
        price: '$listingDetails.price',
      },
    },
    {
      $group: {
        _id: '$day',
        totalSales: { $sum: 1 },
        totalRevenue: { $sum: '$price' },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  // create an array with all days of the current month, even if they have no sales
  const daysInMonth = moment().daysInMonth();
  const allDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // create an object for each day of the month, filling missing days with 0 sales and revenue
  const formattedResult = allDays.map((day) => {
    const dayData = result.find((item) => item._id === day);
    return {
      date: `${moment().format('MMMM')} ${day}`,
      totalSales: dayData ? dayData.totalSales : 0,
      totalRevenue: dayData ? dayData.totalRevenue : 0,
    };
  });

  return formattedResult;
};

export const AnalyticsServices = {
  getTotalProductsAdded,
  getTotalPurchases,
  getTotalSales,
  getSalesAnalyticsForCurrentMonth,
};
