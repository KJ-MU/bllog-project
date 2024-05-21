const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/AuthenticateToken");

const {
  createComment,
  deleteComment,
  getCommentsByPostId,
} = require("./comment.controllers");
const { verifyToken } = require("../middleware/VerifyToken");

router.get("/:id", getCommentsByPostId);
// Middleware to ensure only logged-in users can create comments
router.post("/:id", verifyToken, createComment);

// Middleware to ensure only the comment creator can delete it
router.delete("/:id", authenticateToken, deleteComment);

module.exports = router;
