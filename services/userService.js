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
  console.log(user);

  if (user.length == 0) {
    const err = new Error("USER_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }
  const isMatch = await bcrypt.compare(password, user[0].password);
  if (!isMatch) {
    const err = new Error("USER_IS_NOT_MATCH");
    err.statusCode = 409;
    throw err;
  }
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);
};

const mailCheck = async (email) => {
  const emailCount = await userDao.checkMail(email);
  if (emailCount == 0) {
    return false;
  } else {
    return true;
  }
};
module.exports = {
  signUp,
  signIn,
  mailCheck,
};
