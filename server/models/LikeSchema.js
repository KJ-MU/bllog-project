const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const likeSchema = new mongoose.Schema({
  // count: {
  //   type: Number,
  //   default: 0, // Default value for likes count
  // },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
});

// Create a Mongoose model based on the schema
const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
