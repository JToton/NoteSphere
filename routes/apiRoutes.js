const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const dbPath = path.join(__dirname, "../db/db.json");

router.get("/notes", (req, res) => {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Unable to read notes." });
    }
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

router.post("/notes", (req, res) => {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Unable to read notes." });
    }
    const notes = JSON.parse(data);
    const newNote = req.body;
    newNote.id = Date.now().toString();
    notes.push(newNote);
    fs.writeFile(dbPath, JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Unable to save the note." });
      }
      res.json(newNote);
    });
  });
});

router.delete("/notes/:id", (req, res) => {
  const noteId = req.params.id;
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Unable to read notes." });
    }
    let notes = JSON.parse(data);
    notes = notes.filter((note) => note.id !== noteId);
    fs.writeFile(dbPath, JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Unable to delete the note." });
      }
      res.sendStatus(200);
    });
  });
});

module.exports = router;
