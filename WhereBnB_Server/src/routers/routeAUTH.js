const express = require("express");
const { register, login, refresh } = require("../controllers/authorizationAPI");

/* const {
  validateRegistrationData,
  validateLoginData,
  validateRefreshToken,
} = require("../validators/auth");
const { errorCheck } = require("../validators/errorCheck"); */

const router = express.Router();

router.put("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);

module.exports = router;
