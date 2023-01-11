const orderService = require("../services/orderService");
const { catchAsync } = require("../utils/error");

const getOrderUser = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const result = await orderService.getOrderUser(userId);
  return res.status(200).json(result);
});

const postOrder = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const cartId = req.query;
  const { totalPrice, productId, quantity } = req.body;
  orderService.postOrder(userId, cartId, totalPrice, productId, quantity);
  return res.status(201).json({ message: "ORDER_SUCCESS" });
});

module.exports = { getOrderUser, postOrder };
