const mongoose = require("mongoose");

const userList = new mongoose.Schema({
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  UserProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserProfile",
  },
  UserAuth: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Authentication",
  },
});

module.exports = mongoose.model("userList", userList);
