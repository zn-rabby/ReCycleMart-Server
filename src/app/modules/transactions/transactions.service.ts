/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import AppError from '../../errors/appError';
import { Listing } from '../listings/listing.model';
import User from '../user/user.model';
import { ITransaction } from './transactions.interface';
import { Transaction } from './transactions.nodel';
import { generateTransactionId } from './transaction.utils';
import { SSLCommerzService } from './sslcommerz.service';
import QueryBuilder from '../../builder/QueryBuilder';

const createTransaction = async (payload: ITransaction, userEmail: string) => {
  try {
    // Check if buyer exists
    const buyer = await User.isUserExists(userEmail);
    if (!buyer) {
      throw new AppError(404, 'Buyer not found with this email');
    }
    payload.buyerID = new mongoose.Types.ObjectId(buyer._id);

    // Check if listing exists
    const listing = await Listing.findOne({ _id: payload.itemID });
    if (!listing) {
      throw new AppError(404, 'Item not found with this ID');
    }

    // Check if seller exists
    const seller = await User.findOne({ _id: listing.userID });
    if (!seller) {
      throw new AppError(404, 'Seller not found with this ID');
    }

    payload.sellerID = new mongoose.Types.ObjectId(seller._id);

    const transactionId = generateTransactionId();
    payload.transactionId = transactionId;

    // console.log('Initiating payment with transaction ID:', transactionId);

    const paymentResponse = await SSLCommerzService.initiatePayment({
      total_amount: listing.price,
      currency: 'BDT',
      tran_id: transactionId,
      success_url: `https://re-cycle-mart-server.vercel.app/api/v1/transactions/success/${transactionId}`,
      fail_url: `https://re-cycle-mart-server.vercel.app/api/v1/transactions/failed/${transactionId}`,
      cancel_url: `https://re-cycle-mart-server.vercel.app/api/v1/transactions/cancelled/${transactionId}`,
      shipping_method: 'Courier',
      product_name: 'N/A.',
      product_category: 'N/A',
      product_profile: 'general',
      cus_name: 'N/A',
      cus_email: 'N/A',
      cus_add1: 'Dhaka',
      cus_add2: 'Dhaka',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: '01711111111',
      cus_fax: '01711111111',
      ship_name: 'N/A',
      ship_add1: 'Dhaka',
      ship_add2: 'Dhaka',
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: 1000,
      ship_country: 'Bangladesh',
    });

    // console.log('Payment initiated successfully:', paymentResponse);

    const createdOrder = await Transaction.create(payload);

    return {
      createdOrder,
      paymentUrl: paymentResponse,
    };
  } catch (err: any) {
    console.error('Error in createTransaction:', err);
    throw new AppError(500, 'Failed to initiate payment.');
  }
};

// const getUserPurses = async (userId: string) => {
//   console.log('userID:', userId);
//   const user = await User.findById(userId);

//   if (!user) {
//     throw new AppError(404, 'User not found');
//   }
//   const transactions = await Transaction.find({ buyerID: user._id })
//     .populate('itemID')
//     .populate('sellerID');

//   if (transactions.length === 0) {
//     throw new AppError(404, 'No purchases found for this user');
//   }
//   return transactions;
// };

// const getUserSales = async (userId: string) => {
//   console.log('userID:', userId);
//   const user = await User.findById(userId);

//   if (!user) {
//     throw new AppError(404, 'User not found');
//   }
//   const transactions = await Transaction.find({ sellerID: user._id })
//     .populate('itemID')
//     .populate('buyerID');

//   if (transactions.length === 0) {
//     throw new AppError(404, 'No purchases found for this user');
//   }
//   return transactions;
// };

const getUserPurchases = async (
  email: string,
  query: Record<string, unknown>,
) => {
  const user = await User.isUserExists(email);
  if (!user) {
    throw new AppError(404, 'User not found');
  }
  // const activeListing = await Listing.find({ isDeleted: false }).distinct("_id");
  const purchasesHistoryQuery = new QueryBuilder(
    // Transaction.find({ buyerID: user._id, itemID: { $in: activeListing } })
    Transaction.find({ buyerID: user._id })
      .populate('buyerID', '_id name identifier role')
      .populate('sellerID', '_id name identifier role')
      .populate('itemID'),
    query,
  )
    .sort()
    .paginate();
  const meta = await purchasesHistoryQuery.countTotal();
  const result = await purchasesHistoryQuery.modelQuery;

  return { meta, result };
};

const getUserSales = async (email: string, query: Record<string, unknown>) => {
  const user = await User.isUserExists(email);
  if (!user) {
    throw new AppError(404, 'User not found');
  }

  const selsHistoryQuery = new QueryBuilder(
    // Transaction.find({ buyerID: user._id, itemID: { $in: activeListing } })
    Transaction.find({ sellerID: user._id })
      .populate('buyerID', '_id name identifier role')
      .populate('sellerID', '_id name identifier role')
      .populate('itemID'),
    query,
  )
    .sort()
    .paginate();
  const meta = await selsHistoryQuery.countTotal();
  const result = await selsHistoryQuery.modelQuery;

  return { meta, result };
};

const updateTransaction = async (
  id: string,
  payload: Partial<ITransaction>,
) => {
  const order = await Transaction.findById({ _id: id });

  if (!order) {
    throw new AppError(404, 'Blog not found! You cannot update it.');
  }
  const result = await Transaction.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const TransactionServices = {
  createTransaction,
  getUserPurchases,
  getUserSales,
  updateTransaction,
};
