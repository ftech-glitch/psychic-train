const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Manually assign _id
const userReviewSchema = new Schema(
  {
    //_id is reviewID as parent entities
    _id: { type: Number, required: true, unique: true },
    userID: { type: Number, required: true },
    breweryID: { type: Number, required: true },
    reviewDATE: { type: Date, required: true }, //Date only
    reviewTIME: { type: String, required: true }, // Stored as a string; consider storing as Date if you need to manipulate this
  },
  {
    collection: "Review",
  }
);

module.exports = mongoose.model("Review", userReviewSchema);
