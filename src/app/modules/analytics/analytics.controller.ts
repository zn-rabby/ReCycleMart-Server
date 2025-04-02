import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AnalyticsServices } from './analytics.service';

const getTotalProductsAddedController = catchAsync(async (req, res) => {
  const { identifier } = req.user;
  const totalProductsAdded =
    await AnalyticsServices.getTotalProductsAdded(identifier);
  sendResponse(res, {
    success: true,
    message: 'Total products added retrieved successfully',
    statusCode: 200,
    data: totalProductsAdded,
  });
});
const getTotalPurchasesController = catchAsync(async (req, res) => {
  const { identifier } = req.user;
  const totalPurchases = await AnalyticsServices.getTotalPurchases(identifier);
  sendResponse(res, {
    success: true,
    message: 'Total purchases retrieved successfully',
    statusCode: 200,
    data: totalPurchases,
  });
});

const getTotalSalesController = catchAsync(async (req, res) => {
  const { identifier } = req.user;
  const totalSales = await AnalyticsServices.getTotalSales(identifier);
  sendResponse(res, {
    success: true,
    message: 'Total sales retrieved successfully',
    statusCode: 200,
    data: totalSales,
  });
});

const getSalesAnalyticsForCurrentMonthController = catchAsync(
  async (req, res) => {
    const { identifier } = req.user;
    const result =
      await AnalyticsServices.getSalesAnalyticsForCurrentMonth(identifier);
    sendResponse(res, {
      success: true,
      message: 'Total sales in current month data retrieved successfully',
      statusCode: 200,
      data: result,
    });
  },
);

export const AnalyticsControllers = {
  getTotalProductsAddedController,
  getTotalPurchasesController,
  getTotalSalesController,
  getSalesAnalyticsForCurrentMonthController,
};
