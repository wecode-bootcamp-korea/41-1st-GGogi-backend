const productDao = require("../models/productDao");

const productShow = async (req) => {
  return await productDao.productAll(req);
};

const getProductInfo = async (productId) => {
  return await productDao.getProductInfo(productId);
};
module.exports = { productShow, getProductInfo };
