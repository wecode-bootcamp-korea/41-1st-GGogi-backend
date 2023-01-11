const productDao = require("../models/productDao");

const getProducts = async ({
  category,
  sort = "old",
  offset = 0,
  limit = 4,
}) => {
  return productDao.getProducts(category, sort, offset, limit);
};

const getProductInfo = async (productId) => {
  return productDao.getProductInfo(productId);
};

const getProductsByTagId = async (tagId) => {
  return productDao.getProductsByTagId(tagId);
};
module.exports = { getProducts, getProductInfo, getProductsByTagId };
