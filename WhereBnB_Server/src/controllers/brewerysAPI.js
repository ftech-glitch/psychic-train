const Brewery = require("../models/BrewerySchema");
const Rating = require("../models/Features/UserRatSchema");
const Review = require("../models/Features/UserRevSchema");

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

// get review by brewery
const getReview = async (req, res) => {
  try {
    const breweryId = req.params.id;
    const reviews = await Review.find({ brewery: breweryId });
    res.json({ status: "Success", reviews: reviews });
  } catch (error) {
    console.error("Error fetching reviews by brewery:", error);
  }
};

// get rating by brewery
const getRating = async (req, res) => {
  try {
    const breweryId = req.params.id;
    const ratings = await Rating.find({ brewery: breweryId });
    res.json({ status: "Success", ratings: ratings });
  } catch (error) {
    console.error("Error fetching ratings by brewery:", error);
  }
};

// add rating
const addRating = async (req, res) => {
  try {
    const breweryId = req.params.id;
    const brewery = await Brewery.findById(breweryId);
    if (!brewery) {
      return res
        .status(404)
        .json({ status: "Error", msg: "Brewery not found" });
    }

    const newRating = new Rating({
      score: req.body.score,
      brewery: breweryId,
    });
    await newRating.save();

    res.json({
      status: "Success",
      msg: "Rating added successfully",
      rating: newRating,
    });
  } catch (error) {
    console.error("Error adding rating:", error);
  }
};

// add review
const addReview = async (req, res) => {
  try {
    const breweryId = req.params.id;
    const brewery = await Brewery.findById(breweryId);
    if (!brewery) {
      return res
        .status(404)
        .json({ status: "Error", msg: "Brewery not found" });
    }

    const reviewDate = new Date().toISOString().split("T")[0]; // Current date
    const reviewTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }); // Current time

    const newReview = new Review({
      // userID: req.body.userID,
      reviewDATE: reviewDate,
      reviewTIME: reviewTime,
      brewery: breweryId,
    });
    await newReview.save();

    res.json({
      status: "Success",
      msg: "Review added successfully",
      review: newReview,
    });
  } catch (error) {
    console.error("Error adding review:", error);
  }
};

module.exports = {
  getBrewery,
  postBrewery,
  createBrewery,
  patchBrewery,
  deleteBrewery,
  addRating,
  addReview,
  getRating,
  getReview,
};
