const Brewery = require("../models/BrewerySchema");

//Get Brewery from database
const getBrewery = async (req, res) => {
  try {
    const allBrewery = await Brewery.find({});
    res.json(allBrewery);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: "getting all breweries error" });
  }
};

//get Specific Brewery from database
const postBrewery = async (req, res) => {
  try {
    const theBrewery = await Brewery.find(req.body);
    res.json(theBrewery);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "error getting brewery" });
  }
};

//create new Brewery and add into database
const createBrewery = async (req, res) => {
  try {
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
      msg: "Brewery Added into Database",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: "brewery not saved" });
  }
};

//Update the brewery base on ID
const patchBrewery = async (req, res) => {
  try {
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
    if (response) {
      console.log("Successfully Updated the Brewery From Database");
      res.json({ status: "Success", msg: `Brewery Updated ${response}` });
    } else {
      res.status(404).json({ status: "error", msg: "Brewery not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "Error updating brewery" });
  }
};

//Remove a Brewery from the Database base on id
const deleteBrewery = async (req, res) => {
  try {
    const response = await Brewery.findByIdAndDelete(req.params.id);
    res.json({ status: "Success", msg: "Brewery Deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "error deleting brewery" });
  }
};

module.exports = {
  getBrewery,
  postBrewery,
  createBrewery,
  patchBrewery,
  deleteBrewery,
};
