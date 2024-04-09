const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favouriteSchema = new Schema(
  {
    //_id represent as favouriteID
    // _id: { type: Number, required: true, unique: true },
    userID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    breweryID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Brewery" }, // Assuming Brewery schema exists and uses Number for _id
  },
  {
    collection: "Favourite",
  }
);

module.exports = mongoose.model("Favourite", favouriteSchema);
