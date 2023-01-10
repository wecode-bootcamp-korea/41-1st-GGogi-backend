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

const deleteItem = async (userId, productId) => {
  return cartDao.deleteItem(userId, productId);
};

const deleteCartAll = async (userId) => {
  return cartDao.deleteCartAll(userId);
};

module.exports = {
  getCartList,
  addCartItems,
  updateItemQuantity,
  deleteItem,
  deleteCartAll,
};
