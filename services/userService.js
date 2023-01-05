const userDao = require("../models/userDao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pwValidation, emailValidation } = require("../utils/validation-check");
//회원가입
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
//로그인
const signIn = async (email, password) => {
  const user = await userDao.getUserByEmail(email);
  console.log(user);

  if (user == undefined) {
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
  return jwt.sign({ id: user.email }, process.env.JWT_SECRET_KEY);
};
//이메일 중복체크
const mailCheck = async (email) => {
  const emailCount = await userDao.checkMail(email);
  if (emailCount == 0) {
    return false;
  } else {
    return true;
  }
};
//토큰관련
const getUserById = async (email) => {
  const getUser = await userDao.getUserId(email);
  return getUser;
};
//마이페이지 정보전송
const mypage = async (email) => {
  const userPage = await userDao.getUser(email);
  return userPage;
};
//마이페이지 주소정보 조회//
const myAddressShow = async (email) => {
  const result = await userDao.getMyAddress(email);
  return result;
};
//마이페이지 주소수정
const myAddressPatch = async (req) => {
  const email = req.user.email;
  const { address } = req.body;
  const result = await userDao.patchMyAddress(address, email);
  return result;
};
module.exports = {
  signUp,
  signIn,
  mailCheck,
  getUserById,
  mypage,
  myAddressShow,
  myAddressPatch,
};
