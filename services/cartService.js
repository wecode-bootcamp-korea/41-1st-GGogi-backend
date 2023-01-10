const cartDao = require("../models/cartDao");

const getCartList = async (userId) => {
  return cartDao.getCartList(userId);
};

const addCartItems = async (userId, productId) => {
  return cartDao.addCartItems(userId, productId);
};

const updateItemQuantity = async (userId, productId, quantity) => {
  return cartDao.updateItemQuantity(userId, productId, quantity);
};

const deleteCart = async (userId, cartId) => {
  return cartDao.deleteCart(userId, cartId);
};

module.exports = {
  getCartList,
  addCartItems,
  updateItemQuantity,
  deleteCart,
};
