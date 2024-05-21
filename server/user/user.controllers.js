const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params.id;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

exports.userSignUP = async (req, res, next) => {
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).json({
        message:
          "You already have an account. You cannot create multiple accounts with the same email.",
      });
    }

    // Hash the password

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;

    // Handle image upload
    const imageFile = req.file;
    const imageUrl = "images/" + imageFile.filename;
    const newUserData = { ...req.body, image: imageUrl };
    // const newUserData = req.body;
    // Create the new user
    const newUser = await User.create(newUserData);

    // Generate JWT token
    const payload = {
      email: newUser.email,
      id: newUser.id,
      fullname: newUser.fullName,
    };
    const token = jwt.sign(payload, process.env.secret_key);

    res.status(201).json(token);
  } catch (error) {
    next(error);
  }
};

exports.logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body.logInAccount;

    // Check if user exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.secret_key
    );
    res.status(201).json(token);
  } catch (error) {
    next(error);
  }
};
exports.deleteUserById = async (req, res, next) => {
  try {
    const id = req.user.id;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const imagePath = path.join(__dirname, "..", "static", deletedUser.image);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    } else {
      console.warn(`Image file not found at path: ${imagePath}`);
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
//
exports.editUser = async (req, res, next) => {
  try {
    const id = req.user.id;

    // Check if the user exists
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the email is being updated and if it conflicts with existing emails
    if (req.body.email && req.body.email !== existingUser.email) {
      const existingEmail = await User.findOne({ email: req.body.email });
      if (existingEmail) {
        return res.status(400).json({
          error:
            "A user with this email already exists. Please choose another email.",
        });
      }
    }

    let updatedUserData = { ...req.body };

    // Hash the updated password if provided
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      updatedUserData.password = hashedPassword;
    }

    // Handle image upload if a new image is provided
    if (req.file) {
      const imageUrl = "images/" + req.file.filename;
      updatedUserData.image = imageUrl;

      // Delete the old image from the database
      const imagePath = path.join(
        __dirname,
        "..",
        "static",
        existingUser.image
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      } else {
        console.warn(`Image file not found at path: ${imagePath}`);
      }
    }

    // Update the user's information
    const updatedUser = await User.findByIdAndUpdate(id, updatedUserData, {
      new: true,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

exports.searchUser = async (req, res, next) => {
  try {
    const Name = req.params.name;

    // Search for posts with titles containing the specified word
    const searchedUser = await User.find({
      fullName: { $regex: Name, $options: "i" }, // Case-insensitive regex search
    });

    res.json(searchedUser);
  } catch (error) {
    next(error);
  }
};
