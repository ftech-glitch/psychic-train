const Brewery = require("../models/BrewerySchema");
const Rating = require("../models/Features/UserRatSchema");
const Review = require("../models/Features/UserRevSchema");
const User = require("../models/Authentications/UserSchema");
const Favourite = require("../models/Features/UserFavSchema");
const UserProfile = require("../models/Authentications/UserProfileSchema");
const uuid = require("uuid");

//Get Brewery from database
const getBrewery = async (req, res) => {
  const allBrewery = await Brewery.find({});
  res.json(allBrewery);
};

// // search for brewery by name
// const searchBreweryByName = async (req, res) => {
//   try {
//     const { name } = req.body;

//     const breweries = await Brewery.find({
//       Name: { $regex: name, $options: "i" },
//     });

//     res.json({ success: true, data: breweries });
//   } catch (error) {
//     console.error("error searching breweries by name:", error);
//   }
// };

/* const searchBreweryByName = async (req, res) => {
  try {
    const { name } = req.body;

    // Ensure that the name is a string before using it in the MongoDB query
    const regexName = new RegExp(name, "i");

    const breweries = await Brewery.find({
      Name: { $regex: regexName },
    });

    res.json({ success: true, data: breweries });
  } catch (error) {
    console.error("error searching breweries by name:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}; */

//get Specific Brewery from database
const postBrewery = async (req, res) => {
  const regexName = new RegExp(req.body.Name, "i");

  const theBrewery = await Brewery.find({ Name: { $regex: regexName } });

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
    console.log("received", req.body);
    console.log("received id", req.params.id);
    const response = await Brewery.findByIdAndUpdate(
      req.params.id,
      {
        Name: req.body.Name,
        Type: req.body.Type,
        City: req.body.City,
        State: req.body.State,
        Address: req.body.Address,
        Postal: req.body.Postal,
        Contact: req.body.Contact,
        Website: req.body.Website,
      },
      { new: true } // to return the updated document
    );
    console.log("Update Success:" + response);
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
  console.log("Delete Recevied:", req.params.id);
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

    const reviewID = uuid.v4();

    const newRating = new Rating({
      reviewID: reviewID,
      score: req.body.score,
      brewery: breweryId,
    });
    await newRating.save();

    brewery.ratings.push(newRating._id);
    await brewery.save();

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
    const reviewID = uuid.v4();

    const newReview = new Review({
      // userID: req.body.userID,
      reviewID: reviewID,
      reviewDATE: reviewDate,
      reviewTIME: reviewTime,
      brewery: breweryId,
      review: req.body.review,
    });
    await newReview.save();

    brewery.reviews.push(newReview);
    await brewery.save();

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
