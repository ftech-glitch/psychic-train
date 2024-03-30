const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  userID: {
    // Primary Key & Foreign Key
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  bio: {
    type: String,
  },
  profilePicture: {
    type: String, // Store only base64 encoded image
  },
});

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

module.exports = UserProfile;
