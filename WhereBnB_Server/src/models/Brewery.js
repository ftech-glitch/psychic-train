const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const brewerySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  postal: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  website: {
    type: String,
    required: false, // Assuming the website might not be available for all entries
  },
});

module.exports = mongoose.model("Brewery", brewerySchema);
