const express = require ("express")
const path = require("path")

cont app= express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

