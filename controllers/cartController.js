const cartService = require("../services/cartService");

const getCartList = async (req, res) => {
  const result = await cartService.getCartList(req.user.id);
  return res.status(200).json({ data: result });
};

const getCartItems = async (req, res) => {
  const userId = req.user.id;
  const productId = req.body.productId;
  const quantity = req.body.quantity;
  await cartService.getCartItems(userId, productId, quantity);
  return res.status(201).json({ message: GET_ITEMS_SUCCESS });
};
module.exports = { getCartList, getCartItems };
