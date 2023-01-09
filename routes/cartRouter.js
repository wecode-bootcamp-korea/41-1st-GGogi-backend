const express = require("express");
const cartController = require("../controllers/cartController");
const loginRequired = require("../utils/auth");

const router = express.Router();

router.get("", loginRequired, cartController.getCartList);
router.post("/addcartitem", loginRequired, cartController.addCartItems);
router.patch(
  "/updateItemQuantity",
  loginRequired,
  cartController.updateItemQuantity
);
router.delete("/deleteItem", loginRequired, cartController.deleteItem);

module.exports = { router };
