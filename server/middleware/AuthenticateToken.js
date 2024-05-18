// const User = require("../modals/User"); // Assuming you have a Users model
const jwt = require("jsonwebtoken");

exports.authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.sendState(401);
    }

    const token = authHeader.split(" ")[1];
    const decodedData = jwt.verify(token, process.env.secret_key);

    req.user = decodedData;

    next();
  } catch (error) {
    next(error);
  }
};
