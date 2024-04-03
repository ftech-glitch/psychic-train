const express = require("express");
const router = express.Router();

const {
  getBrewery,
  postBrewery,
  createBrewery,
  patchBrewery,
  deleteBrewery,
} = require("../controllers/brewerysAPI");
const { authUser, authAdmin } = require("../middleware/authVerification");

/*####################### API 01 ##############################################*/
//Remove auth if you're doing testing
router.get("/brewery", authUser, getBrewery);

/*####################### API 02 ##############################################*/
//Lookup for specific Brewery send a raw body {"type":"Large"} or {"city":""}
router.post("/brewery", authUser, postBrewery);

/*####################### API 03 ##############################################*/
//Upload New Brewery send a raw body :
/* {
    name: req.body.name,
    type: req.body.type,
    city: req.body.city,
    state: req.body.state,
    address: req.body.address,
    postal: req.body.postal,
    contact: req.body.contact,
    website: req.body.website,
  } */
router.put("/brewery", authAdmin, createBrewery);

/*####################### API 04 ##############################################*/
// Update base on req.params.id
router.patch("/brewery/:id", authAdmin, patchBrewery);

/*####################### API 05 ##############################################*/
// Delete base on req.params.id
router.delete("/bewery/:id", authAdmin, deleteBrewery);

module.exports = router;
