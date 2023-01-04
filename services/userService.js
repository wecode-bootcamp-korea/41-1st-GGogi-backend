const userDao = require("../models/userDao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (email, name, password, address, phone, birthdate) => {
  const pwValidation = new RegExp(
    "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
  );
  if (!pwValidation.test(password)) {
    const err = new Error("비밀번호 양식이 맞지않습니다.");
    err.statusCode = 409;
    throw err;
  }
  const emailValidation = new RegExp(
    "^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
  );
  if (!emailValidation.test(email)) {
    const err = new Error("이메일 양식이 맞지않습니다.");
    err.statusCode = 409;
    throw err;
  }
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
