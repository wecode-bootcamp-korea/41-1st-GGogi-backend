const productService = require("../services/productService");
const { catchAsync } = require("../utils/error");

const getProducts = catchAsync(async (req, res) => {
  const queryParams = req.query;
  const getProducts = await productService.getProducts(queryParams);
  return res.status(200).json(getProducts);
});

const getProductInfo = catchAsync(async (req, res) => {
  const productId = req.params.productId;
  const result = await productService.getProductInfo(productId);
  return res.status(200).json(result);
});

const getProductsByTagId = catchAsync(async (req, res) => {
  const tagId = req.params.tagId;
  const result = await productService.getProductsByTagId(tagId);
  return res.status(200).json({ data: result });
});

module.exports = { getProducts, getProductInfo, getProductsByTagId };
