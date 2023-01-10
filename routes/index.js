const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const cartRouter = require("./cartRouter");

router.use("/users", userRouter.router);
router.use("/carts", cartRouter.router);

module.exports = router;
