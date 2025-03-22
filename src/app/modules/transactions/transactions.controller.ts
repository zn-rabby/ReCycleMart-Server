import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TransactionServices } from './transactions.service';
import { Document } from 'mongoose';

const createTransactionController = catchAsync(async (req, res) => {
  const transactionPayload = req.body;
  const userEmail = req?.user?.email;

  const { createdOrder, paymentUrl } =
    await TransactionServices.createTransaction(transactionPayload, userEmail);

  const orderData =
    createdOrder instanceof Document ? createdOrder.toObject() : createdOrder;

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
  const { email } = req.user; // Assuming the authenticated user's email is stored in req.user
  // console.log(email, "userEmail from authenticated user");

  const result = await TransactionServices.getUserPurchases(email, req.query);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User purchases retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getUserSales = catchAsync(async (req, res) => {
  const { email } = req.user;

  const result = await TransactionServices.getUserSales(email, req.query);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User sales retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const updateTransactionStatus = catchAsync(async (req, res) => {
  const id = req.params.id;
  // console.log(userId, "controller", req.params);

  const updatedData = req.body;

  const result = await TransactionServices.updateTransaction(id, updatedData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Transaction Status updated successfully',
    data: result,
  });
});

// const updateTransactionStatus = catchAsync(async (req, res) => {
//   const id = req.params.id;
//   const updatedData = req.body;
//   // const userEmail = req?.user?.email;

//   const result = await TransactionServices.updateTransaction(id, updatedData);

//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Order updated successfully',
//     data: result,
//   });
// });

export const TransactionController = {
  createTransactionController,
  getUserPurchases,
  getUserSales,
  updateTransactionStatus,
};
