const express = require("express");
const {
  register,
  login,
  refresh,
  getAllUser,
  deleteUser,
  updateUserProfile,
} = require("../controllers/authorizationAPI");
const { authUser, authAdmin } = require("../middleware/authVerification");
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
router.get("/users", authAdmin, getAllUser);
router.post("/users", authAdmin, deleteUser);
router.post("/users/profile", authUser || authAdmin, updateUserProfile);

module.exports = router;
