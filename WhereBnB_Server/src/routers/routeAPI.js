const express = require("express");
const router = express.Router();

const { getBrewery } = require("../controllers/brewerysAPI");
const auth = require("../middleware/authVerification");

//Remove auth if you're doing testing
router.get("/brewery", auth, getBrewery);

module.exports = router;
