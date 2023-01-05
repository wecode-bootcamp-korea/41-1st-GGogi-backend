const jwt = require("jsonwebtoken");
const userService = require("../services/userService");

const loginRequired = async (req, res, next) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    const error = new Error("NEED_ACCESS_TOKEN");
    error.statusCode = 401;

    return res.status(error.statusCode).json({ message: error.message });
  }

  const decode = await jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
  const [user] = await userService.getUserById(decode.id);

  if (!user) {
    const error = new Error("USER_DOES_NOT_EXIST");
    error.statusCode = 404;

    return res.status(error.statusCode).json({ message: error.message });
  }

  req.user = user;
  next();
};

module.exports = loginRequired;
