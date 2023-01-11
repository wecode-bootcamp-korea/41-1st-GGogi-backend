const orderDao = require("../models/orderDao");
const userDao = require("../models/userDao");

const getOrderUser = async (userId) => {
  return orderDao.getOrderUser(userId);
};

const postOrder = async (userId, totalPrice, cartInfos) => {
  const userInfo = await userDao.getUserById(userId);

  if (userInfo.point - totalPrice < 0) {
    const error = new Error("NOT_ENOUGH_POINT");
    error.statuscode = 400;
    throw error;
  }

  return await orderDao.postOrder(userId, totalPrice, cartInfos);
};
module.exports = { getOrderUser, postOrder };
