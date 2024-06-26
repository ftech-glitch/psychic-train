const mongoose = require("mongoose");

// Override _id therefore we'll assign manually.
// Take note: _id will be preresent as userID
// Parent Entity
const UserSchema = new mongoose.Schema(
  {
    userNAME: {
      type: String,
      required: true,
    },
    userEMAIL: {
      type: String,
      required: true,
    },
    userGENDER: {
      type: String,
      required: true,
    },
    userROLE: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      required: true,
    },
    loginDATE: {
      type: Date,
      required: false,
      default: Date.now,
    },
  },
  {
    collection: "User",
  }
);
module.exports = mongoose.model("User", UserSchema);
