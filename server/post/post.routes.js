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
  getRandomPost,
  getFeaturedPost,
  getUserPosts,
} = require("./post.controller");
// Routes with authentication middleware
router.post("/", authenticateToken, fileUpload.single("image"), createPost);
router.get("/", getAllPost);
router.get("/headerpost", getRandomPost);
router.get("/featuredpost", getFeaturedPost);
router.get("/search/:word", searchPost);
router.get("/category/:id", getPostsByCategoryId);

router.get("/:userId", getUserPosts);
router.get("/single/:id", getPostById);
router.put("/:id", authenticateToken, fileUpload.single("image"), updatePost);
router.delete("/:id", authenticateToken, deletePost);

module.exports = router;
