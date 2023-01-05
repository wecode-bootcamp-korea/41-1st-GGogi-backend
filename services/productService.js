const productDao = require("../models/productDao");

const productShow = async (req) => {
  return await productDao.productAll(req);
};

const productInfoShow = async (req) => {
  return await productDao.productInfo(req);
};
module.exports = { productShow, productInfoShow };
