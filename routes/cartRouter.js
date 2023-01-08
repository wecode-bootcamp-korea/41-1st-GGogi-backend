const express = require("express");
const cartController = require("../controllers/cartController");
const loginRequired = require("../utils/auth");

const router = express.Router();

router.get("/getList", loginRequired, cartController.getCartList);
router.post("/getCartItem", loginRequired, cartController.getCartItems);
module.exports = { router };
