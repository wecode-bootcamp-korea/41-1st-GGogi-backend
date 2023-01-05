const userService = require("../services/userService");

const signUp = async (req, res) => {
  try {
    const { email, name, password, address, phone, birthdate } = req.body;

    if (!name || !password || !address || !phone || !email || !birthdate) {
      const err = new Error("KEY_ERROR");
      err.statusCode = 400;
      throw err;
    }

    await userService.signUp(email, name, password, address, phone, birthdate);
    return res.status(200).json({ message: "SIGNUP_SUCCESS" });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const err = new Error("KEY_ERROR");
      err.statusCode = 400;
      throw err;
    }

    const token = await userService.signIn(email, password);

    return res.status(200).json({ accessToken: token });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const emailCheck = async (req, res) => {
  try {
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
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { signUp, signIn, emailCheck };
