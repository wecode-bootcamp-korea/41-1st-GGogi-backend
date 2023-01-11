const cartDao = require("../models/cartDao");

const getCartList = async (userId) => {
  return cartDao.getCartList(userId);
};

const createCart = async (userId, productId, quantity) => {
  return cartDao.createCart(userId, productId, quantity);
};

const updateCart = async (cartId, productId, quantity) => {
  return cartDao.updateCart(cartId, productId, quantity);
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
