//* Required Packages
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const app = express();

//* Loads environment variables
dotenv.config({
  path: "./config.env"
});

//* Dev Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//* Profile Routes
const userRoute = require("./routes/profile");

//* Routes
app.use("/api/v1/profile", userRoute);

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV;
const TRACKER_API_URL = process.env.TRACKER_API_URL;
const TRACKER_API_KEY = process.env.TRACKER_API_KEY;

app.listen(5000, () => {
  console.log(
    `Hello, I am your Server. I am running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});

// TEST
