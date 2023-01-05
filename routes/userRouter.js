const express = require("express");
const userController = require("../controllers/userController");
const loginRequired = require("../utils/auth");

const router = express.Router();

router.post("/signup", userController.signUp);
router.post("/login", userController.signIn);
router.post("/emailcheck", userController.emailCheck);
router.get("/mypage", loginRequired, userController.myPageShow);

module.exports = { router };
