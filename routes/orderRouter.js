const express = require("express");
const orderController = require("../controllers/orderController");
const loginRequired = require("../utils/auth");

const router = express.Router();

router.get("", loginRequired, orderController.getOrderUser);
router.post("", loginRequired, orderController.createOrder);
module.exports = { router };
