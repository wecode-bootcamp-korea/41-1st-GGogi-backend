const userService = require("../services/userService");
const { catchAsync } = require("../utils/error");

const signUp = catchAsync(async (req, res) => {
  const { email, name, password, address, phone, birthdate } = req.body;

  if (!name || !password || !address || !phone || !email || !birthdate) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }

  await userService.signUp(email, name, password, address, phone, birthdate);
  return res.status(200).json({ message: "SIGNUP_SUCCESS" });
});

const signIn = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }

  const token = await userService.signIn(email, password);

  return res.status(200).json({ accessToken: token });
});

const emailCheck = catchAsync(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }

  const mailCheck = await userService.mailCheck(email);
  if (mailCheck === false) {
    return res.status(200).json({ message: "사용가능한 이메일입니다." });
  }
  return res.status(409).json({ message: "사용 불가능한 이메일입니다." });
});

const getUserInfo = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const result = await userService.userInfoGet(userId);
  return res.status(200).json({ data: result });
});

const getUserAddress = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const result = await userService.getAddress(userId);
  return res.status(200).json({ data: result });
});

const addressUpdate = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { address } = req.body;
  await userService.userAddressUpdate(userId, address);
  return res.status(201).json({ message: "UPDATE_USER_ADDRESS_SUCCESS" });
});

const getProfile = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const result = await userService.userProfileGet(userId);
  return res.status(200).json({ data: result });
});

const passwordUpdate = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { oldPassword, newPassword } = req.body;
  await userService.userPasswordUpdate(oldPassword, newPassword, userId);
  return res.status(201).json({ message: "UPDATE_USER_PASSWORD_SUCCESS" });
});

module.exports = {
  signUp,
  signIn,
  emailCheck,
  getUserInfo,
  getUserAddress,
  addressUpdate,
  getProfile,
  passwordUpdate,
};
