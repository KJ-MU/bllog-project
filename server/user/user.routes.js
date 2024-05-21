const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/AuthenticateToken");
const {
  getAllUsers,
  userSignUP,
  deleteUserById,
  editUser,
  logIn,
  searchUser,
  getUserById,
} = require("./user.controllers");

const fileUpload = require("../middleware/FileUpload");

router.post("/signup", fileUpload.single("image"), userSignUP);
router.post("/login", logIn);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.get("/search/:name", searchUser);
router.delete("/", authenticateToken, deleteUserById);
router.put("/", authenticateToken, fileUpload.single("image"), editUser);
module.exports = router;
