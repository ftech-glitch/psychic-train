const Brewery = require("../models/BrewerySchema");

//Get Flower from database
const getBrewery = async (req, res) => {
  const allBrewery = await Brewery.find({});
  res.json(allBrewery);
};

module.exports = {
  getBrewery,
};
