const express = require("express");
const router = express.Router();
const {
  savePost,
  deleteSavedPost,
  getSavedPost,
} = require("./saved.controllers");
const { authenticateToken } = require("../middleware/AuthenticateToken");

router.get("/", authenticateToken, getSavedPost);
router.post("/:id", authenticateToken, savePost);
router.delete("/:id", authenticateToken, deleteSavedPost);

module.exports = router;
