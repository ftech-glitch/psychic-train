const mongoose = require("mongoose");
const Brewery = require("../models/BrewerySchema");

const brewerySeed = [
  {
    name: "Brewery One",
    type: "Micro",
    city: "City Name",
    state: "State Name",
    address: "123 Brewery Lane",
    postal: "12345",
    contact: 1234567890,
    website: "https://www.breweryone.com",
  },
  {
    name: "Brewery Two",
    type: "Nano",
    city: "Another City",
    state: "Another State",
    address: "456 Brew Street",
    postal: "67890",
    contact: 9876543210,
    website: "https://www.brewerytwo.com",
  },
];

const seedDB = async () => {
  try {
    // Delete existing breweries
    await Brewery.deleteMany({});
    console.log("Breweries cleared");

    // Insert new seed data
    await Brewery.insertMany(brewerySeed);
    console.log("Database seeded");

    // Close the database connection
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = seedDB;
