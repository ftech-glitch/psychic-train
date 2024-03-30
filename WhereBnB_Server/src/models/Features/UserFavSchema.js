const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favouriteSchema = new Schema(
  {
    //_id represent as favouriteID
    _id: { type: Number, required: true, unique: true },
    userID: { type: Number, required: true },
    breweryID: { type: Number, required: true, ref: "Brewery" }, // Assuming Brewery schema exists and uses Number for _id
  },
  {
    collection: "Favourite",
  }
);

const Favourite = mongoose.model("Favourite", favouriteSchema);
module.exports = Favourite;
