require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const app = express();
const brewerysAPI = require("./src/routers/routeAPI");
// Apply Helmet to secure your app by setting various HTTP headers
app.use(helmet());

// Enable CORS with default options for all routes
app.use(cors());

// Apply rate limiting to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);

// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const connectDB = require("./src/connections/database");
const SeedDB = require("./src/connections/seedDatabase");
// Attempt to connect to the database
connectDB("brewery"); // Initiating the connection
//SeedDB();
app.use("/api", brewerysAPI);

// Listen on a port specified in the .env or default to 5001
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
