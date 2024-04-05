const { check } = require("express-validator");

const checkFlowerInput = [
  check("name", "name is required").not().isEmpty(),
  check("colour", "colour is required").not().isEmpty(),
  check("colour", "colour must be between 5 and 15 characters").isLength({
    min: 5,
    max: 15,
  }),
];

module.exports = { checkFlowerInput };
