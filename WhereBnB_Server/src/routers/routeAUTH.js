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
  getAllUserFavouriteBrewery,
  favouriteBrewery,
  unfavouriteBrewery,
} = require("../controllers/authorizationAPI");
const { authUser, authAdmin } = require("../middleware/authVerification");

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

// Get Favourite
router.get(
  "/brewery/favourites",
  authUser || authAdmin,
  getAllUserFavouriteBrewery
);

// Favourite
router.put("/brewery/favourite", authUser || authAdmin, favouriteBrewery);

// Unfavourite
router.post("/brewery/favourites", authUser || authAdmin, unfavouriteBrewery);

//Bug delete have to be appearing at the last line.
router.post("/users/:id", authAdmin, deleteUser);

module.exports = router;
