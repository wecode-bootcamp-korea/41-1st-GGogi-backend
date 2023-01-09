const cartService = require("../services/cartService");
const { catchAsync } = require("../utils/error");

const getCartList = catchAsync(async (req, res) => {
  const result = await cartService.getCartList(req.user.id);
  return res.status(200).json(result);
});

const addCartItems = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const productId = req.body.productId;
  await cartService.addCartItems(userId, productId);
  return res.status(201).json({ message: "ADD_ITEMS_SUCCESS" });
});

const updateItemQuantity = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const productId = req.body.productId;
  const quantity = req.body.quantity;
  await cartService.updateItemQuantity(userId, productId, quantity);
  return res.status(201).json({ message: "UPDATE_ITEM_QUANTITY_SUCCESS" });
});

const deleteItem = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const productId = req.body.productId;
  await cartService.deleteItem(userId, productId);
  return res.status(200).json({ message: "DELETE_ITEM_SUCCESS" });
});

module.exports = { getCartList, addCartItems, updateItemQuantity, deleteItem };
