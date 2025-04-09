import catchAsync from '../../utils/catchAsync';

const paymentSuccessController = catchAsync(async (req, res) => {
  res.redirect(`https://re-cycle-mart-client.vercel.app/success`);
});

const paymentFailController = catchAsync(async (req, res) => {
  res.redirect(`https://re-cycle-mart-client.vercel.app/failed`);
});
const paymentCancelController = catchAsync(async (req, res) => {
  res.redirect(`https://re-cycle-mart-client.vercel.app/cancelled`);
});

export const PaymentControllers = {
  paymentSuccessController,
  paymentFailController,
  paymentCancelController,
};
