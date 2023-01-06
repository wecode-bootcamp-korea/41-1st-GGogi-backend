const productService = require("../services/productService");
const { catchAsync } = require("../utils/error");

const getProducts = catchAsync(async (req, res) => {
  const result = await productService.getProducts(req);
  return res.status(200).json({ data: result });
});

const getProductInfo = catchAsync(async (req, res) => {
  const result = await productService.getProductInfo(req.params.productId);
  return res.status(200).json({ data: result });
});

module.exports = { getProducts, getProductInfo };
