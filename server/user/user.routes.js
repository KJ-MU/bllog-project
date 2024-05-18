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
} = require("./user.controllers");

const fileUpload = require("../middleware/FileUpload");

router.post("/signup", fileUpload.single("image"), userSignUP);
router.get("/", getAllUsers);
router.get("/search/:name", searchUser);
router.post("/login", logIn);
router.delete("/", authenticateToken, deleteUserById);
router.put("/", authenticateToken, fileUpload.single("image"), editUser);
module.exports = router;
