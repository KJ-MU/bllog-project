const express = require("express");
const router = express.Router();

const { addCategory, getAllCategories } = require("./categories.controllers");
// Route to add a category

router.post("/", addCategory);

// Route to get all categories
router.get("/", getAllCategories);

module.exports = router;
