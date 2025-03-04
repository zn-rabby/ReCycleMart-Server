import mongoose from "mongoose";
import AppError from "../../errors/appError";
import { Listing } from "../listings/listing.model";
import User from "../user/user.model";
import { ITransaction } from "./transactions.interface";
import { Transaction } from "./transactions.nodel";
import { generateTransactionId } from "./transaction.utils";
import { SSLCommerzService } from "./sslcommerz.service";

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

    console.log('Initiating payment with transaction ID:', transactionId);

    const paymentResponse = await SSLCommerzService.initiatePayment({
      total_amount: listing.price,
      currency: 'BDT',
      tran_id: transactionId,
      success_url: `https://book-shop-server-3trk.vercel.app/api/v1/payments/payment-success/${transactionId}`,
      fail_url: `https://book-shop-server-3trk.vercel.app/api/v1/payments/payment-fail/${transactionId}`,
      cancel_url: `https://book-shop-server-3trk.vercel.app/api/v1/payments/payment-cancel/${transactionId}`,
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

    console.log('Payment initiated successfully:', paymentResponse);

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

const getSinglePurses = async (userId: string) => {
  const purchases = await Listing.find({ userId }); 
  return purchases;
};

const getSingleSales = async (userId: string) => {
  const sales = await Listing.find({ userId }); 
  return sales;
};


export const TransactionServices = {
  createTransaction,
  getSinglePurses,
  getSingleSales
};
