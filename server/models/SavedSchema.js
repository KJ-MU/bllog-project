const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const savedSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
});

const Saved = model("Saved", savedSchema);

module.exports = Saved;
