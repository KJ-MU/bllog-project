const mongoose = require("mongoose");
const { Schema, model } = mongoose;
// const bcrypt = require("bcrypt");

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
