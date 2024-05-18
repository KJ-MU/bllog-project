// post.routes.js
const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/AuthenticateToken");
const fileUpload = require("../middleware/FileUpload");
// Import controller methods
const {
  createPost,
  getAllPost,
  getPostsByCategoryId,
  getPostById,
  updatePost,
  deletePost,
  searchPost,
} = require("./post.controller");
// Routes with authentication middleware
router.post("/", authenticateToken, fileUpload.single("image"), createPost);
router.get("/", getAllPost);
router.get("/search/:word", searchPost);
router.get("/:id", getPostsByCategoryId);
router.get("/:id", getPostById);
router.put("/:id", authenticateToken, fileUpload.single("image"), updatePost);
router.delete("/:id", authenticateToken, deletePost);

module.exports = router;
