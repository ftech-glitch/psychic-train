const express = require("express");
const router = express.Router();

const { getBrewery } = require("../controllers/brewerysAPI");

router.get("/brewery", getBrewery);

module.exports = router;
