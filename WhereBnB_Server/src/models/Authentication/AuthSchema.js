const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema(
  {
    userID: {
      // Primary key & Foreign Key
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    hash: {
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

module.exports = mongoose.model("Authentication", AuthSchema);
