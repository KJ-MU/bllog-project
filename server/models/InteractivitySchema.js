const mongoose = require("mongoose");
const { Schema, model } = mongoose;
// const bcrypt = require("bcrypt");

const interactivitySchema = new Schema({
  comment: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  like: [
    {
      type: Schema.Types.ObjectId,
      ref: "Like",
    },
  ],
  saved: [
    {
      type: Schema.Types.ObjectId,
      ref: "Saved",
    },
  ],
});

const Interactivity = model("Interactivity", interactivitySchema);

module.exports = Interactivity;
