const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userReviewSchema = new Schema(
  {
    // userID: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    reviewDATE: {
      type: String,
      required: true,
    },
    reviewTIME: {
      type: String,
      required: true,
    },
    brewery: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brewery",
      required: true,
      index: true,
      unique: true,
      sparse: true,
    },
  },
  {
    collection: "Review",
  }
);

module.exports = mongoose.model("Review", userReviewSchema);
