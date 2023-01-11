const orderService = require("../services/orderService");
const { catchAsync } = require("../utils/error");

const getOrderUser = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { cartId, productId, quantity } = req.body;
  console.log(
    cartId,
    "--------------------------------------------------------"
  );
  const result = await orderService.getOrderUser(
    userId,
    cartId,
    productId,
    quantity
  );
  return res.status(200).json(result);
});

const postOrder = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { totalPrice, cartInfos } = req.body;
  orderService.postOrder(userId, totalPrice, cartInfos);
  return res.status(201).json({ message: "ORDER_SUCCESS" });
});

module.exports = { getOrderUser, postOrder };
