const jwt = require("jsonwebtoken");

// Middleware to verify JWT token and attach user information to request object
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("🚀 ~ authHeader:", authHeader);
  try {
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      console.log("🚀 ~ token:", token);
      const decoded = jwt.verify(token, process.env.secret_key);
      console.log("🚀 ~ decoded:", decoded);
      req.user = decoded;
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    next(error);
  }
};
