const cartDao = require("../models/cartDao");

const getCartList = async (userId) => {
  return cartDao.getCartList(userId);
};

const createCart = async (userId, productId, quantity) => {
  return cartDao.createCart(userId, productId, quantity);
};

const updateCart = async (cartId, quantity) => {
  return cartDao.updateCart(cartId, quantity);
};

const deleteCart = async (cartId) => {
  return cartDao.deleteCart(cartId);
};

module.exports = {
  getCartList,
  createCart,
  updateCart,
  deleteCart,
};
