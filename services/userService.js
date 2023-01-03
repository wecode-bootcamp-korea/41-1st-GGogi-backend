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
  const pwd = await userDao.signIn(email, password);
  const isMatch = await bcrypt.compare(password, pwd.password);
  if (!pwd) {
    const err = new Error("USER_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }
  if (!isMatch) {
    const err = new Error("USER_IS_NOT_MATCH");
    err.statusCode = 409;
    throw err;
  }
  const token = jwt.sign({ id: pwd.id }, process.env.secretKey);
  return token;
};

module.exports = {
  signUp,
  signIn,
};
