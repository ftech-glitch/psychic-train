const Brewery = require("../models/BrewerySchema");

//Get Brewery from database
const getBrewery = async (req, res) => {
  const allBrewery = await Brewery.find({});
  res.json(allBrewery);
};

//get Specific Brewery from database
const postBrewery = async (req, res) => {
  const theBrewery = await Brewery.find(req.body);
  res.json(theBrewery);
};

//create new Brewery and add into database
const createBrewery = async (req, res) => {
  const createBrewery = new Brewery({
    name: req.body.name,
    type: req.body.type,
    city: req.body.city,
    state: req.body.state,
    address: req.body.address,
    postal: req.body.postal,
    contact: req.body.contact,
    website: req.body.website,
  });
  await createBrewery.save();

  res.json({
    status: "Success",
    msg: "Brewery Added into Database ",
  });
};

//Update the brewery base on ID
const patchBrewery = async (req, res) => {
  const response = await Brewery.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    type: req.body.type,
    city: req.body.city,
    state: req.body.state,
    address: req.body.address,
    postal: req.body.postal,
    contact: req.body.contact,
    website: req.body.website,
  });
  if (response.ok) {
    console.log("Successfully Update the Brewery From Databse");
    res.json({ status: "Success", msg: `Brewery Updated ${response}` });
    return;
  }
  res.json({ status: "Unable to Update", msg: `Brewery Updated ${response}` });
};

//Remove a Brewery from the Database base on id
const deleteBrewery = async (req, res) => {
  await Brewery.findByIdAndDelete(req.params.id);
  res.json({ status: "Success", msg: "Brewery Deleted" });
};

module.exports = {
  getBrewery,
  postBrewery,
  createBrewery,
  patchBrewery,
  deleteBrewery,
};
