// * Importing required modules.
const path = require("path");
const express = require("express");

// * Creating an Express router.
const router = express.Router();

// * Defining a route for the "/notes" endpoint.
router.get("/notes", (req, res) => {
  // ! Sending the "notes.html" file as a response.
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// * Defining a catch-all route for any other endpoint.
router.get("*", (req, res) => {
  // ! Sending the "index.html" file as a response.
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// * Exporting the router.
module.exports = router;
