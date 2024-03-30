const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema(
  {
    //userID are refer to User _id
    userID: {
      // Primary Key & Foreign Key
      type: Number,
      ref: "User",
      required: true,
      unique: true,
    },
    bio: {
      type: String,
    },
    profilePICTURE: {
      type: String, // Store only base64 encoded image
    },
  },
  {
    collection: "Profile",
  }
);

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

module.exports = UserProfile;
