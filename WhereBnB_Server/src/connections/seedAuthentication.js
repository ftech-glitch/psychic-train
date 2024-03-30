// seed.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const connectDB = require("../connections/database"); // adjust the path as necessary
const User = require("../models/Authentications/UserSchema"); // adjust the path as necessary
const Auth = require("../models/Authentications/UserAuthSchema"); // adjust the path as necessary
const Profile = require("../models/Authentications/UserProfileSchema"); // adjust the path as necessary

async function seedUser() {
  try {
    // Connect to the database
    await connectDB("account"); // or your specific database name/path

    // Create user data
    const userData = {
      _id: 1, // Example ID, in a real scenario you might want to generate unique IDs differently
      userNAME: "exampleUser",
      userEMAIL: "user@example.com",
      userGENDER: "non-binary",
      userROLE: "admin",
    };

    // Create auth data
    const userAuthData = {
      userID: userData._id,
      userNAME: userData.userNAME,
      userHASH: await bcrypt.hash("examplePassword", 12), // Hash the password
    };

    // Create profile data
    const userProfileData = {
      userID: userData._id,
      bio: "This is an example bio.",
      profilePICTURE: "exampleBase64EncodedPicture", // Example, replace with actual base64 encoded image
    };

    // Insert the data into the database
    await new User(userData).save();
    await new Auth(userAuthData).save();
    await new Profile(userProfileData).save();

    console.log("Seed data inserted successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
}

module.exports = seedUser;
