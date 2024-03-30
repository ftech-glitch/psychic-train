const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userRatingSchema = new Schema(
  {
    //Require auto insert _id
    _id: { type: Number, required: true, unique: true },
    // Corrected: reviewID to match the Number type as in userReviewSchema
    reviewID: {
      type: Number, // Changed from mongoose.Schema.Types.ObjectId to Number
      ref: "Review",
      required: true,
      unique: true,
    },
    score: { type: Number, min: 1, max: 5, required: true },
  },
  {
    collection: "Rating",
  }
);

module.exports = mongoose.model("Rating", userRatingSchema);
