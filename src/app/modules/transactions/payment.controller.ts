import catchAsync from '../../utils/catchAsync';

const paymentSuccessController = catchAsync(async (req, res) => {
  res.redirect(`https://secondhand-client.vercel.app/success`);
});

const paymentFailController = catchAsync(async (req, res) => {
  res.redirect(`https://secondhand-client.vercel.app/failed`);
});
const paymentCancelController = catchAsync(async (req, res) => {
  res.redirect(`https://secondhand-client.vercel.app/cancelled`);
});

export const PaymentControllers = {
  paymentSuccessController,
  paymentFailController,
  paymentCancelController,
};