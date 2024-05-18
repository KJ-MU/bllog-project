const express = require("express");
const router = express.Router();
const {
  addLike,
  deleteLike,
  getLikesByPostId,
} = require("../like/like.controllers");
const { authenticateToken } = require("../middleware/AuthenticateToken");
router.get("/:postId", getLikesByPostId);
router.post("/:postId", authenticateToken, addLike);
router.delete("/:likeId", authenticateToken, deleteLike);

module.exports = router;
