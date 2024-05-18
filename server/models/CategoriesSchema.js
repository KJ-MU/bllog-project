const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const categoriesSchema = new Schema({
  tag: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});

const Categories = model("Categories", categoriesSchema);

module.exports = Categories;
