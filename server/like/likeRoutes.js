const express = require("express");
const router = express.Router();
const {
  addLike,
  deleteLike,
  getLikesByPostId,
} = require("../like/like.controllers");
const { authenticateToken } = require("../middleware/AuthenticateToken");
const { verifyToken } = require("../middleware/VerifyToken");
router.get("/:postId", getLikesByPostId);
router.post("/:postId", verifyToken, addLike);
router.delete("/:likeId", authenticateToken, deleteLike);

module.exports = router;
