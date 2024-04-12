const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userReviewSchema = new Schema(
  {
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
    },
    reviewID: {
      type: String,
      unique: true,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
  },
  {
    collection: "Review",
  }
);

module.exports = mongoose.model("Review", userReviewSchema);
