const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      required: false,
    },
    profile: {
      type: String, // Store only base64 encoded image
      required: false,
    },
    favourite: [{ type: mongoose.Schema.Types.ObjectId, ref: "Favourite" }],
  },
  {
    collection: "Profile",
  }
);

module.exports = mongoose.model("UserProfile", userProfileSchema);
