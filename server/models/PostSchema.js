const mongoose = require("mongoose");
const { Schema, model } = mongoose;
// const bcrypt = require("bcrypt");

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  image: String,
  introduction: {
    type: String,
    trim: true,
    required: true,
  },
  content: {
    type: String,
    trim: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likeCount: {
    type: Number,
    default: 0, // Default value for like count
  },
});

const Post = model("Post", postSchema);

module.exports = Post;
