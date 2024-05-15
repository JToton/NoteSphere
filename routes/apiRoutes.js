// * Importing required modules.
const express = require("express");
const fs = require("fs");
const path = require("path");

// * Creating an Express router.
const router = express.Router();

// * Setting the path to the JSON database file.
const dbPath = path.join(__dirname, "../db/db.json");

// * Defining a route for GET requests to "/notes".
router.get("/notes", (req, res) => {
  // ! Reading the JSON database file.
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Unable to read notes." });
    }
    // * Parsing the JSON data and sending it as a response.
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

// * Defining a route for POST requests to "/notes".
router.post("/notes", (req, res) => {
  // ! Reading the JSON database file.
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Unable to read notes." });
    }
    // * Parsing the JSON data and adding a new note.
    const notes = JSON.parse(data);
    const newNote = req.body;
    newNote.id = Date.now().toString();
    notes.push(newNote);
    // ! Writing the updated notes back to the JSON database file.
    fs.writeFile(dbPath, JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Unable to save the note." });
      }
      // * Sending the new note as a response.
      res.json(newNote);
    });
  });
});

// * Defining a route for DELETE requests to "/notes/:id".
router.delete("/notes/:id", (req, res) => {
  // * Getting the ID of the note to delete from the URL parameters.
  const noteId = req.params.id;
  // ! Reading the JSON database file
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Unable to read notes." });
    }
    // * Parsing the JSON data and removing the note with the specified ID.
    let notes = JSON.parse(data);
    notes = notes.filter((note) => note.id !== noteId);
    // ! Writing the updated notes back to the JSON database file.
    fs.writeFile(dbPath, JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Unable to delete the note." });
      }
      // * Sending a success status code as a response.
      res.sendStatus(200);
    });
  });
});

// * Exporting the router.
module.exports = router;
