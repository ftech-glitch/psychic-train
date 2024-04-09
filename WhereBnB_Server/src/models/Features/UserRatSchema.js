const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userRatingSchema = new Schema(
  {
    score: { type: String, enum: ["1", "2", "3", "4", "5"], required: true },
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
    collection: "Rating",
  }
);

module.exports = mongoose.model("Rating", userRatingSchema);
