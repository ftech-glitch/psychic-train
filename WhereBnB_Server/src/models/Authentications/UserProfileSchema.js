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
      required: false,
    },
    profilePICTURE: {
      type: String, // Store only base64 encoded image
      required: false,
    },
  },
  {
    collection: "Profile",
  }
);

module.exports = mongoose.model("UserProfile", userProfileSchema);
