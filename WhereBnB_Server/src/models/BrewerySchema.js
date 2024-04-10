const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const brewerySchema = new Schema(
  {
    Name: {
      type: String,
      required: false,
    },
    Type: {
      type: String,
      required: false,
    },
    City: {
      type: String,
      required: false,
    },
    State: {
      type: String,
      required: false,
    },
    Address: {
      type: String,
      required: false,
    },
    Postal: {
      type: String,
      required: false,
    },
    Contact: {
      type: Number,
      required: false,
    },
    Website: {
      type: String,
      required: false, // Assuming the website might not be available for all entries
    },

    ratings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Rating",
      },
    ],

    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  {
    collection: "breweryList",
  }
);

module.exports = mongoose.model("Brewery", brewerySchema);
