const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const Auth = require("../models/Authentications/UserAuthSchema");
const Profile = require("../models/Authentications/UserProfileSchema");
const User = require("../models/Authentications/UserSchema");

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
    console.log("something");
    // Fetch all users
    const users = await User.find(req.body);
    console.log("received request ", users);
    const deletionPromises = users.map(async (user) => {
      // Assuming userID is used as a reference in Profile and Auth schemas
      await Profile.deleteMany({ userID: user._id }); // Adjust if necessary
      await Auth.deleteMany({ userID: user._id }); // Adjust if necessary

      // Delete the user itself
      await User.findByIdAndDelete(user._id);
    });

    // Await all deletion promises to resolve
    const deletedUsers = await Promise.all(deletionPromises);

    console.log(deletedUsers); // Logs the IDs of deleted users
    res.json(deletedUsers);

    res.json({
      status: "ok",
      msg: `User Account has been deleted: ${deletedUsers}`,
    });
  } catch (error) {
    console.error("Error deleting all users", error);
    res.status(500).send("An error occurred while deleting users.");
  }
};

const updateUserProfile = async (req, res) => {
  try {
    // Find base on username
    console.log("received ", req.body.username);
    const users = await User.find({ userNAME: req.body.username });
    console.log("find user ", users);
    const response = await Profile.findOneAndUpdate(
      { userID: users._id }, // Correctly reference the user's ID
      { profilePICTURE: req.body.profilepicture }, // Update operation
      { new: true } // Return the updated document
    );
    if (response.ok) {
      console.log("Successfully Update the profile Pictrure From Databse");
      res.json({
        status: "Success",
        msg: `profile Pictrure Updated ${users.userNAME}`,
      });
      return;
    }
    res.json({
      status: "Unable to Update porile picture",
      msg: `Unable to Updated ${users.userNAME} profile picture`,
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
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

    /*     const newUserId = (await User.countDocuments()) + 1; */
    // Create the user without manually setting _id
    const newUser = await User.create({
      /*   _id: newUserId, */
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
      profilePICTURE: req.body.profile,
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

const login = async (req, res) => {
  try {
    const user = await User.findOne({ userNAME: req.body.username });
    if (!user) {
      return res.status(400).json({ status: "error", msg: "not authorised" });
    }
    const auth = await Auth.findOne({ userNAME: user.userNAME });
    console.log(auth);
    const result = await bcrypt.compare(req.body.password, auth.userHASH);
    if (!result) {
      console.log("username or password error");
      return res.status(401).json({ status: "error", msg: "login failed" });
    }

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

module.exports = {
  register,
  login,
  refresh,
  getAllUser,
  deleteUser,
  updateUserProfile,
};
