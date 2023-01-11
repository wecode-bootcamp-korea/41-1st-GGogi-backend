const express = require("express");
const cartController = require("../controllers/cartController");
const loginRequired = require("../utils/auth");

const router = express.Router();

router.get("", loginRequired, cartController.getCartList);
router.post("", loginRequired, cartController.createCart);
router.patch("", loginRequired, cartController.updateCart);
router.delete("/deleteItem", loginRequired, cartController.deleteCart);

module.exports = { router };
