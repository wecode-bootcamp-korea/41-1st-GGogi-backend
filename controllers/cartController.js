const cartService = require("../services/cartService");
const { catchAsync } = require("../utils/error");

const getCartList = catchAsync(async (req, res) => {
  const result = await cartService.getCartList(req.user.id);
  return res.status(200).json(result);
});

const createCart = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;
  await cartService.createCart(userId, productId, quantity);
  return res.status(201).json({ message: "ADD_ITEMS_SUCCESS" });
});

const updateCart = catchAsync(async (req, res) => {
  const { cartId, quantity } = req.body;
  await cartService.updateCart(cartId, quantity);
  return res.status(201).json({ message: "UPDATE_ITEM_QUANTITY_SUCCESS" });
});

const deleteCart = catchAsync(async (req, res) => {
  const { cartId } = req.query;
  await cartService.deleteCart(cartId);
  return res.status(200).json({ message: "DELETE_ITEM_SUCCESS" });
});

module.exports = {
  getCartList,
  createCart,
  updateCart,
  deleteCart,
};
