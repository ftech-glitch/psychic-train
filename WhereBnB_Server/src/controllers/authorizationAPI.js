const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const Auth = require("../models/Authentications/UserAuthSchema");
const Profile = require("../models/Authentications/UserProfileSchema");
const User = require("../models/Authentications/UserSchema");
const Brewery = require("../models/BrewerySchema");
const Favourite = require("../models/Features/UserFavSchema");

const extractToken = (req) => {
  const token = req.headers["authorization"].replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
  console.log("token:", decoded);
  return decoded;
};

const getLocalTime = () => {
  const currentDate = new Date();
  currentDate.setTime(currentDate.getTime() + 8 * 60 * 60 * 1000);
  const formattedDate = currentDate.toLocaleString("en-SG", {
    timeZone: "Asia/Singapore",
  });
  return formattedDate;
};

const getAllUser = async (req, res) => {
  try {
    // Fetch all users
    const users = await User.find();

    const userDetailsPromises = users.map(async (user) => {
      const userProfile = await Profile.findOne({ userID: user._id });
      const userAuth = await Auth.findOne({ userID: user._id });

      return {
        userInfo: user,
        userProfile,
        userAuth,
      };
    });

    const userDetails = await Promise.all(userDetailsPromises);

    console.log(userDetails);
    res.json(userDetails);
  } catch (error) {
    console.error("Error fetching all user details:", error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await Profile.deleteOne({ userID: user._id });
    await Auth.deleteOne({ userID: user._id });
    await User.findByIdAndDelete(user._id);

    console.log(`User account deleted for userID: ${user._id}`);
    res.json({
      status: "ok",
      msg: `User account deleted for userID: ${user._id}`,
    });
  } catch (error) {
    console.error("Error deleting user ", error);
    res.status(500).send("An error deleting the user");
  }
};
function EstImageSize(size) {
  const base64Multiplier = 4 / 3;
  const base64Padding = size % 3 ? 3 - (size % 3) : 0; // Padding needed for base64
  const estimatedSize = size * base64Multiplier + base64Padding;
  const result = Math.ceil(estimatedSize);
  console.log("expected result", result); // Round up to deal with any decimal
  return result;
}

const updateUserProfile = async (req, res) => {
  try {
    const decoded = extractToken(req);
    // Ensure that the query matches your database schema. This example assumes `username` is the correct field.
    const users = await User.find({ userNAME: decoded.username }); //Checked
    if (users.length === 0) {
      return res.status(404).json({ status: "error", msg: "User not found." });
    }

    const temp = {};

    if (req.file) {
      const imgBase64 = req.file.buffer.toString("base64");
      const etaSize = EstImageSize(req.file.size);
      if (etaSize != imgBase64.length) {
        console.log(
          `Error Converted Encoded Length :${imgBase64.length} are not matching ${etaSize}`
        );
        res.status(500).json({
          status: "error",
          msg: `Error Converted Encoded Length :${imgBase64.length} are not matching ${etaSize} please try again`,
        });
      }
      temp["profile"] = JSON.stringify({
        fieldname: req.file.fieldname,
        originalname: req.file.originalname,
        encoding: req.file.encoding,
        mimetype: req.file.mimetype,
        base64: imgBase64,
        length: imgBase64.length,
      });
    } else {
      console.log("No image uploaded");
    }

    const userDetailsPromises = users.map(async (user) => {
      console.log("find user _id", user._id);
      const userProfile = await Profile.findOneAndUpdate(
        { userID: user._id },
        { $set: temp },
        { new: true }
      );
      return userProfile;
    });

    const userDetails = await Promise.all(userDetailsPromises);
    if (userDetails)
      res.json({
        status: "ok",
        msg: "User Profile(s) have been updated.",
        imgChanged: JSON.parse(temp.profile),
      });
  } catch (error) {
    console.error("Error updating user profile details:", error);
    res.status(500).json({
      status: "error",
      msg: "An error occurred during the profile update.",
    });
  }
};

const register = async (req, res) => {
  try {
    const userExists = await User.findOne({ userNAME: req.body.username });
    if (userExists) {
      return res
        .status(400)
        .json({ status: "error", msg: "duplicate username" });
    }

    // Create the user without manually setting _id
    const newUser = await User.create({
      userNAME: req.body.username,
      userEMAIL: req.body.email,
      userGENDER: req.body.gender,
      userROLE: req.body.role,
    });

    const hash = await bcrypt.hash(req.body.password, 12);

    // Associate Auth with the newly created user by its _id
    await Auth.create({
      userID: newUser._id, // Use the _id from the created User document
      userNAME: req.body.username,
      userHASH: hash,
    });

    // Similarly, associate Profile with the user
    await Profile.create({
      userID: newUser._id, // Associate the Profile with the User
      bio: req.body.bio,
      profile: req.body.profile,
    });

    res.json({
      status: "ok",
      msg: `created Authentic Account: ${req.body.username}`,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ status: "error", msg: `invalid registration ${error}` });
  }
};

const loginDATE = async () => {
  const updateUSER = await User.findOneAndUpdate(
    { _id: user._id },
    { $set: { loginDATE: Date.now } },
    { new: true }
  );
  console.log("Updated Profile Login Date: ", updateUSER);
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ userNAME: req.body.username });
    if (!user) {
      return res.status(400).json({ status: "error", msg: "not authorised" });
    }
    const auth = await Auth.findOne({ userNAME: user.userNAME });
    const result = await bcrypt.compare(req.body.password, auth.userHASH);
    if (!result) {
      console.log("username or password error");
      return res.status(401).json({ status: "error", msg: "login failed" });
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $set: { loginDATE: getLocalTime() } },
      { new: true }
    );
    console.log("Updated Profile Login Date: ", updatedUser);

    const claims = {
      username: auth.userNAME,
      userrole: user.userROLE,
    };
    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });

    res.json({ access, refresh });
  } catch (error) {
    return res
      .status(400)
      .json({ status: "error", msg: "Login Failed refresh" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const decoded = extractToken(req);
    const user = await User.findOne({ userNAME: decoded.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userProfile = await Profile.findOne({ userID: user._id });
    const userAuth = await Auth.findOne({ userID: user._id });

    const userDetails = {
      userInfo: user,
      userProfile,
      userAuth,
    };

    console.log(userDetails);

    res.json(userDetails);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Error fetching user details" });
  }
};

const refresh = (req, res) => {
  try {
    const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);
    console.log(decoded);
    const claims = {
      username: decoded.userNAME,
      userrole: decoded.userROLE,
    };

    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    res.json({ access });
  } catch (error) {
    res.status(400).json({ status: "error", msg: "unable to refresh token" });
  }
};

const favouriteBrewery = async (req, res) => {
  try {
    const decoded = extractToken(req);
    const user = await User.findOne({ userNAME: decoded.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userProfile = await Profile.findOne({ userID: user._id });

    if (!userProfile) {
      return res.status(404).json({ error: "User Profile not found" });
    }

    const brewery = await Brewery.findById(req.body.breweryid);

    if (!brewery) {
      return res.status(404).json({ error: "Brewery not found" });
    }

    const userFave = new Favourite({
      userID: user._id,
      breweryID: brewery._id,
    });

    console.log(user._id, brewery._id);

    await userFave.save();

    const response = await Profile.findByIdAndUpdate(userProfile._id, {
      $push: { favourite: brewery._id },
    });

    res.json({
      status: "Success",
      msg: "Brewery Favourited",
    });
  } catch (error) {
    console.error("Error favoriting brewery:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const unfavouriteBrewery = async (req, res) => {
  try {
    const decoded = extractToken(req);
    const user = await User.findOne({ userNAME: decoded.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userProfile = await Profile.findOne({ userID: user._id });

    if (!userProfile) {
      return res.status(404).json({ error: "User Profile not found" });
    }

    // De-reference Favourite entry fron User Profile collection
    const updatedFavourites = [...userProfile.favourite].filter(
      (item) => item != req.body.breweryid
    );
    userProfile.favourite = updatedFavourites;

    // const response = await Profile.findByIdAndUpdate(userProfile._id, userProfile);
    const updatedProfile = await userProfile.save();

    if (!updatedProfile) {
      return res
        .status(404)
        .json({ error: "Delete favourite record from UserProfile error" });
    }

    // Delete actual Favourite entry from favourite Collection
    const favouriteEntry = await Favourite.findOne({
      breweryID: req.body.breweryid,
    });

    if (!favouriteEntry) {
      return res.status(404).json({ error: "Favourite not found." });
    }

    const deletedEntry = await Favourite.findByIdAndDelete(favouriteEntry._id);

    res.json({
      status: "Success",
      msg: "Favourite removed",
    });
  } catch (error) {
    console.error("Error unfavoriting brewery:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllUserFavouriteBrewery = async (req, res) => {
  try {
    const decoded = extractToken(req);

    const users = await User.findOne({ userNAME: decoded.username });
    if (!users) {
      return res
        .status(404)
        .json({ status: "error", msg: "Are you logged in?" });
    }

    const allUserFavouriteBreweries = await Profile.findOne({
      userID: users._id,
    });

    if (!allUserFavouriteBreweries) {
      return res
        .status(404)
        .json({ status: "error", msg: "No favourites found." });
    }

    res.json({
      favourite: allUserFavouriteBreweries.favourite,
    });
  } catch (error) {
    console.error("Error getting favourite brewery:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  register,
  login,
  loginDATE,
  refresh,
  getAllUser,
  deleteUser,
  updateUserProfile,
  getUserProfile,
  getAllUserFavouriteBrewery,
  favouriteBrewery,
  unfavouriteBrewery,
};
