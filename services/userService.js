const userDao = require("../models/userDao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (email, name, password, address, phone, birthdate) => {
  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(password, saltRounds);
  const createUser = await userDao.createUser(
    email,
    name,
    hashPassword,
    address,
    phone,
    birthdate
  );

  return createUser;
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
  return jwt.sign({ id: user.id }, process.env.secretKey);
};

const mailCheck = async (email) => {
  const emailCount = await userDao.checkMail(email);
  if (emailCount == undefined) {
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
