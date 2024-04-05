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
  const BreweryExists = await Brewery.findOne({
    Name: req.body.name,
    State: req.body.state,
    City: req.body.city,
  });
  if (BreweryExists) {
    return res
      .status(400)
      .json({ status: "error", msg: "duplicate Brewery exist" });
  }

  const createBrewery = new Brewery({
    Name: req.body.name,
    Type: req.body.type,
    City: req.body.city,
    State: req.body.state,
    Address: req.body.address,
    Postal: req.body.postal,
    Contact: req.body.contact,
    Website: req.body.website,
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
    Name: req.body.name,
    theBreweryype: req.body.type,
    City: req.body.city,
    State: req.body.state,
    Address: req.body.address,
    Postal: req.body.postal,
    Contact: req.body.contact,
    Website: req.body.website,
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
