const express = require("express");

const { getTopics } = require("./controllers/nc-news");

const app = express();
app.get("/api/topics", getTopics);
app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Path not found" });
});
app.use((err, req, res) => {
  console.log(err);
  res.sendStatus(500);
});

// const connection = require("../db/connection.js");

module.exports = app;
