const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.authenticateUser = async (req, res, next) => {
  try {
    const foundUser = await User.findOne({
      username: { $regex: req.body.username, $options: "i" },
    });
    if (!foundUser) {
      return res.status(403).json({ message: "Username not found" });
    }

    const comparePassword = await bcrypt.compare(
      req.body.password,
      foundUser.password
    );
    if (!comparePassword) {
      return res
        .status(403)
        .json({ message: "Incorrect username or password" });
    }

    req.user = foundUser;
    next();
  } catch (error) {
    next(error);
  }
};
