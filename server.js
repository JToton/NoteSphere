// * Importing required modules.
const express = require("express");
const path = require("path");

// * Importing route modules.
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

// * Creating an Express application.
const app = express();

// * Setting the port for the application.
const PORT = process.env.PORT || 3000;

// * Middleware for parsing JSON and urlencoded data.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// * Serving static files from the "public" directory.
app.use(express.static("public"));

// * Mounting the API routes.
app.use("/api", apiRoutes);

// * Mounting the HTML routes.
app.use("/", htmlRoutes);

// ! Starting the server and listening for incoming requests.
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
