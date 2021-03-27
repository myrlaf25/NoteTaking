const express = require("express");
const { v4: uuidv4 } = require("uuid");

const fs = require("fs");
const path = require("path");
const db = require("./db/db.json");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//HTML routes
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});
// app.get("/assets/css/styles.css", function(req, res){
//     res.sendFile(path.join(__dirname, "assets", "css", "styles.css"));
// })
//API routes
app.get("/api/notes", function (req, res) {
  fs.readFile("db/db.json", "utf8", function (err, data) {
    res.json(JSON.parse(data));
  });
});

app.post("/api/notes", function (req, res) {
  const note = {
    id: uuidv4(),
    title: req.body.title,
    text: req.body.text,
  };
  async function addNote() {
    let notes = await fs.promises.readFile("./db/db.json", "utf-8");

    const newNote = {
      id: uuidv4(),
      title: req.body.title,
      text: req.body.text,
    };
    notes = JSON.parse(notes);
    notes.push(newNote);

    res.json(notes);
    await fs.promises.writeFile("./db/db.json", JSON.stringify(notes));
  }
  addNote(note).catch(function (err) {
    console.log(err);
  });
});

app.delete("/api/notes/:id", function (req, res) {
  async function deleteNote() {
    notes = await fs.promises.readFile("./db/db.json", "utf-8");

    const { id } = req.params;
    notes = JSON.parse(notes);
    const oldNote = notes.filter((note) => note.id !== id);

    res.json(oldNote);

    await fs.promises.writeFile("./db/db.json", JSON.stringify(oldNote));
  }
  deleteNote();
});

app.listen(PORT, () => console.log("App listening on port " + PORT));
