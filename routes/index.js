const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const cartRouter = require("./cartRouter");
const productRouter = require("./productRouter");
const orderRouter = require("./orderRouter");

router.use("/users", userRouter.router);
router.use("/carts", cartRouter.router);
router.use("/products", productRouter.router);
router.use("/orders", orderRouter.router);

module.exports = router;
