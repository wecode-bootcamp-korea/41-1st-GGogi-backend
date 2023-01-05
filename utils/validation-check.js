const pwValidation = async (password) => {
  let regex = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})/;
  if (!regex.test(password)) {
    const err = new Error("비밀번호 양식이 맞지않습니다.");
    err.statusCode = 409;
    throw err;
  }
  return true;
};
const emailValidation = async (email) => {
  let regex = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;

  if (!regex.test(email)) {
    const err = new Error("이메일 양식이 맞지않습니다.");
    err.statusCode = 409;
    throw err;
  }
  return true;
};

module.exports = {
  pwValidation,
  emailValidation,
};
