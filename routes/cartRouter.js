const express = require("express");
const cartController = require("../controllers/cartController");
const loginRequired = require("../utils/auth");

const router = express.Router();

router.get("", loginRequired, cartController.getCartList);
router.post("/addCartItem", loginRequired, cartController.addCartItems);
router.patch(
  "/updateItemQuantity",
  loginRequired,
  cartController.updateItemQuantity
);
router.delete("/deleteItem", loginRequired, cartController.deleteCart);

module.exports = { router };
