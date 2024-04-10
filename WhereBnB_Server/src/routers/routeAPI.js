const express = require("express");
const router = express.Router();

const {
  getBrewery,
  postBrewery,
  createBrewery,
  patchBrewery,
  deleteBrewery,
  addReview,
  addRating,
  getRating,
  getReview,
} = require("../controllers/brewerysAPI");
const { authUser, authAdmin } = require("../middleware/authVerification");

// get brewery list
router.get("/brewery", getBrewery);

//Lookup for specific Brewery send a raw body {"type":"Large"} or {"city":""}
router.post("/brewery", authUser, postBrewery);

//Upload New Brewery send a raw body :
/* {
    "name": "test",
    "type": "test",
    "city": "test",
    "state": "test",
    "address": "test",
    "postal": "test",
    "contact": "test",
    "website": "test"
  }
  */
router.put("/brewery", authAdmin, createBrewery);

// Update base on req.params.id
router.patch("/brewery/:id", authAdmin, patchBrewery);

// Delete base on req.params.id
router.delete("/brewery/:id", deleteBrewery);

// get ratings
router.get("/brewery/rating/:id", getRating);

// get reviews
router.get("/brewery/review/:id", getReview);

// add rating
router.put("/brewery/rating/:id", addRating);

//add review review
router.put("/brewery/review/:id", addReview);

module.exports = router;
