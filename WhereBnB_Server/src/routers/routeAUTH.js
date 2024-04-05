const express = require("express");
const {
  register,
  login,
  refresh,
  getAllUser,
  deleteUser,
  updateUserProfile,
  getUser,
  getUserProfile,
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
router.get("/users", getAllUser);
router.post("/users", authAdmin, deleteUser);
//Inorder for updateUserProfile work please send {"bio":"","profile":""}
router.post("/users/profile", authUser || authAdmin, updateUserProfile);

router.get("/users/profile", authUser || authAdmin, getUserProfile);

module.exports = router;
