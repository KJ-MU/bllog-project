const jwt = require("jsonwebtoken");

// Middleware to verify JWT token and attach user information to request object
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  try {
    if (authHeader) {
      const tokenWithQuotes = authHeader.split(" ")[1];
      const token = tokenWithQuotes.replace(/^"(.*)"$/, "$1");
      jwt.verify(token, process.env.secret_key, (err, decoded) => {
        if (err) {
          console.error("Error decoding token:", err); // Log any decoding errors
          return res.sendStatus(403); // Send 403 Forbidden if token verification fails
        }
        req.user = decoded;
        next();
      });
    }
  } catch (error) {
    next(error);
  }
};
