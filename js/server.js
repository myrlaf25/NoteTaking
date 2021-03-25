const express = require ("express")
const path = require("path")

const app= express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//HTML routes
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });
  app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "notes.html"));
});
//API routes
app.get("/api/notes", function (req, res) {
    res.json(notes);
  });






  app.listen(PORT, () => console.log("App listening on port " + PORT));