import catchAsync from '../../utils/catchAsync';

const paymentSuccessController = catchAsync(async (req, res) => {
  res.redirect(`http://localhost:3000/success`);
});

const paymentFailController = catchAsync(async (req, res) => {
  res.redirect(`http://localhost:3000/failed`);
});
const paymentCancelController = catchAsync(async (req, res) => {
  res.redirect(`http://localhost:3000/cancelled`);
});

export const PaymentControllers = {
  paymentSuccessController,
  paymentFailController,
  paymentCancelController,
};