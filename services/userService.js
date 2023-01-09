const userDao = require("../models/userDao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pwValidation, emailValidation } = require("../utils/validation-check");

const signUp = async (email, name, password, address, phone, birthdate) => {
  await emailValidation(email);
  await pwValidation(password);
  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(password, saltRounds);
  return userDao.createUser(
    email,
    name,
    hashPassword,
    address,
    phone,
    birthdate
  );
};

const signIn = async (email, password) => {
  const user = await userDao.getUserByEmail(email);
  if (!user) {
    const err = new Error("USER_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const err = new Error("USER_IS_NOT_MATCH");
    err.statusCode = 409;
    throw err;
  }
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);
};

const mailCheck = async (email) => {
  const emailCheck = await userDao.checkMail(email);
  return emailCheck ? true : false;
};

const getUserById = async (userId) => {
  return userDao.getUserById(userId);
};

const getUserInfo = async (userId) => {
  return userDao.getUserInfo(userId);
};

const getUserAddress = async (userId) => {
  return userDao.getUserAddress(userId);
};

const updateUserAddress = async (userId, address) => {
  return userDao.updateUserAddress(address, userId);
};

const getUserProfile = async (userId) => {
  return userDao.getUserProfile(userId);
};

const updateUserPassword = async (oldPassword, newPassword, userId) => {
  const user = await userDao.getUserByInfo(userId);
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    const err = new Error("PASSWORD_NOT_MATCH");
    err.statusCode = 409;
    throw err;
  }
  await pwValidation(newPassword);
  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(newPassword, saltRounds);
  return await userDao.updateUserPassword(hashPassword, userId);
};

module.exports = {
  signUp,
  signIn,
  mailCheck,
  getUserById,
  getUserInfo,
  getUserAddress,
  updateUserAddress,
  getUserProfile,
  updateUserPassword,
};
