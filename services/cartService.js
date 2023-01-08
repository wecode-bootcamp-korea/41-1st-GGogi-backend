const cartDao = require("../models/cartDao");

const getCartList = async (userId) => {
  return cartDao.getCartList(userId);
};

const getCartItems = async (userId, producId, quantity) => {
  return cartDao.getCartItems(userId, producId, quantity);
};
module.exports = { getCartList, getCartItems };
