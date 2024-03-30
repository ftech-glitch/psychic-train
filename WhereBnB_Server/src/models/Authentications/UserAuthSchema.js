const mongoose = require("mongoose");

const userAuthSchema = new mongoose.Schema(
  {
    //userID are refer to User _id
    userID: {
      // Primary key & Foreign Key
      type: Number,
      ref: "User",
      required: true,
      unique: true,
    },
    userNAME: {
      type: String,
      required: true,
    },
    userHASH: {
      type: String,
      required: true,
    },
    create_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "Authentication",
  }
);

module.exports = mongoose.model("Authentication", userAuthSchema);
