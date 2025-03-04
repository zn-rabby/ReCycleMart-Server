
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TransactionServices } from "./transactions.service";
import { Document } from "mongoose";


const createTransactionController = catchAsync(async (req, res) => {
  const transactionPayload = req.body;
  const userEmail = req?.user?.email;

  const { createdOrder, paymentUrl } = await TransactionServices.createTransaction(transactionPayload, userEmail);

  const orderData = createdOrder instanceof Document ? createdOrder.toObject() : createdOrder;

  sendResponse(res, {
    success: true,
    message: 'Transaction is created successfully',
    statusCode: 201,
    data: {
      ...orderData,
      paymentUrl,
    },
  });
});


const getUserPurchases = catchAsync(async (req, res) => {
  const { id: userId } = req.params;

  const result = await TransactionServices.getSinglePurses(userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User purchases retrieved successfully',
    data: result,
  });
});



  export const TransactionController = {
    createTransactionController,
    getUserPurchases
  };
  