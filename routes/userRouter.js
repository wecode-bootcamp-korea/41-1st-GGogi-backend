const express = require("express");
const userController = require("../controllers/userController");
const loginRequired = require("../utils/auth");

const router = express.Router();

router.post("/signup", userController.signUp);
router.post("/login", userController.signIn);
router.post("/emailcheck", userController.emailCheck);
router.get("/mypage", loginRequired, userController.myPageShow);
router.get("/addressshow", loginRequired, userController.myAddress);
router.patch("/address", loginRequired, userController.addressPatch);

module.exports = { router };
