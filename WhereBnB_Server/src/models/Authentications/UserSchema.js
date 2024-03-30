const mongoose = require("mongoose");

// Override _id therefore we'll assign manually.
// Take note: _id will be preresent as userID
// Parent Entity
const UserSchema = new mongoose.Schema(
  {
    //_id represent userID as parent
    _id: {
      type: Number,
      required: true,
      unique: true,
    },
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
      required: true,
    },
  },
  {
    collection: "User",
  }
);
module.exports = mongoose.model("User", UserSchema);
