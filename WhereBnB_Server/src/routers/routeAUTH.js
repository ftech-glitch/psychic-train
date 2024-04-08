const express = require("express");
const multer = require("multer");

const {
  register,
  login,
  refresh,
  getAllUser,
  deleteUser,
  updateUserProfile,
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
// Set up multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.put("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.get("/users", getAllUser);

//Inorder for updateUserProfile work please send {"bio":"","profile":""}
router.post(
  "/users/profile",
  authUser || authAdmin,
  upload.single("image"),
  updateUserProfile
);
//Get their own information
router.get("/users/profile", authUser || authAdmin, getUserProfile);

//Bug delete have to be appearing at the last line.
router.post("/users/:id", authAdmin, deleteUser);
module.exports = router;
