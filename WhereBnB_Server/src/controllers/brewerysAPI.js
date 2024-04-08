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
  // const BreweryExists = await Brewery.findOne({
  //   Name: req.body.Name,
  //   State: req.body.State,
  //   City: req.body.City,
  // });
  // if (BreweryExists) {
  //   return res
  //     .status(400)
  //     .json({ status: "error", msg: "duplicate Brewery exist" });
  // }

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
  try {
    const response = await Brewery.findByIdAndUpdate(
      req.params.id,
      {
        Name: req.body.name,
        Type: req.body.type,
        City: req.body.city,
        State: req.body.state,
        Address: req.body.address,
        Postal: req.body.postal,
        Contact: req.body.contact,
        Website: req.body.website,
      },
      { new: true } // to return the updated document
    );
    res.json({
      status: "Success",
      msg: `Brewery updated: ${response}`,
      data: response, // returning the updated document
    });
  } catch (error) {
    console.error("Error updating brewery:", error);
    res.status(500).json({ status: "Error", msg: "Internal server error" });
  }
};

// const patchBrewery = async (req, res) => {
//   const response = await Brewery.findByIdAndUpdate(
//     req.params.id,
//     {
//       Name: req.body.name,
//       Type: req.body.type,
//       City: req.body.city,
//       State: req.body.state,
//       Address: req.body.address,
//       Postal: req.body.postal,
//       Contact: req.body.contact,
//       Website: req.body.website,
//     },

//     res.json(patchBrewery)
//   );
// if (response.ok) {
//   console.log("Successfully Update the Brewery From Databse");
//   res.json({ status: "Success", msg: `Brewery Updated ${response}` });
//   return;
// };
//   res.json({ status: "Unable to Update", msg: `Brewery Updated ${response}` });
// };

//Remove a Brewery from the Database base on id
const deleteBrewery = async (req, res) => {
  await Brewery.findByIdAndDelete(req.params.id);
  res.json({ status: "Success", msg: "Brewery Deleted" });
};

// add rating and review to brewery
const addRatingAndReview = async (res, req) => {
  try {
    const brewery = await Brewery.findById(req.params.id);

    if (!brewery) {
      return res.status(404).json({ error: "Brewery not found" });
    }

    brewery.rating = req.body.rating;
    brewery.review = req.body.review;
    await brewery.save();

    res.status(200).json({ message: "raing and review added successfully" });
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = {
  getBrewery,
  postBrewery,
  createBrewery,
  patchBrewery,
  deleteBrewery,
  addRatingAndReview,
};
