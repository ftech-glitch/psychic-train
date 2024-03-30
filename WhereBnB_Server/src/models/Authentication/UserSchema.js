const mongoose = require("mongoose");
//userID is unique

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userGender: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    required: true,
  },
});
const User = mongoose.model("User", UserSchema);

module.exports = User;
