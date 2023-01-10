const productDao = require("../models/productDao");

const getProducts = async () => {
  return productDao.getProducts();
};

const getProductInfo = async (productId) => {
  return productDao.getProductInfo(productId);
};

const getProductsByTagId = async (tagId) => {
  return productDao.getProductsByTagId(tagId);
};
module.exports = { getProducts, getProductInfo, getProductsByTagId };
