const orderDao = require("../models/orderDao");

const getOrderUser = async (userId) => {
  return orderDao.getOrderUser(userId);
};

module.exports = { getOrderUser };
