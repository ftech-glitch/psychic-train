const mongoose = require("mongoose");

const connectDB = async (path) => {
  try {
    console.log(`${process.env.MONGODB_URL}${path}`);
    await mongoose.connect(`${process.env.MONGODB_URL}${path}`);
    console.log("DB connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
