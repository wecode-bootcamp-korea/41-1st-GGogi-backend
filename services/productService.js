const productDao = require("../models/productDao");

const getProducts = async (req) => {
  return await productDao.getProducts(req);
};

const getProductInfo = async (productId) => {
  return await productDao.getProductInfo(productId);
};

const getProductTag = async (tagId) => {
  return await productDao.getProductTag(tagId);
};
module.exports = { getProducts, getProductInfo, getProductTag };
