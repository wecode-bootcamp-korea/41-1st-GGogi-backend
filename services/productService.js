const productDao = require("../models/productDao");

const getProducts = async (req) => {
  return await productDao.getProducts(req);
};

const getProductInfo = async (productId) => {
  return await productDao.getProductInfo(productId);
};
module.exports = { getProducts, getProductInfo };
