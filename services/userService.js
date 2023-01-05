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
  return await userDao.getUserId(email);
};
//마이페이지 정보전송
const mypage = async (email) => {
  return await userDao.getUser(email);
};
//마이페이지 주소정보 조회//
const myAddressShow = async (email) => {
  return await userDao.getMyAddress(email);
};
//마이페이지 주소수정
const myAddressPatch = async (req) => {
  const email = req.user.email;
  const { address } = req.body;
  return await userDao.patchMyAddress(address, email);
};
//마이페이지 정보수정 정보표현창
const myInfoShow = async (email) => {
  return await userDao.getMyInfo(email);
};
//비밀번호 수정
const myPwd = async (req) => {
  const email = req.user.email;
  const user = await userDao.getUserByEmail(email);
  const { oldPassword, newPassword } = req.body;
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    const err = new Error("PASSWORD_NOT_MATCH");
    err.statusCode = 409;
    throw err;
  }
  await pwValidation(newPassword);
  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(newPassword, saltRounds);
  return await userDao.patchMyPwd(hashPassword, email);
};
module.exports = {
  signUp,
  signIn,
  mailCheck,
  getUserById,
  mypage,
  myAddressShow,
  myAddressPatch,
  myInfoShow,
  myPwd,
};
