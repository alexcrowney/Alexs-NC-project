const express = require("express");

const { getTopics, getArticleById } = require("./controllers/nc-news");

const app = express();
app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById);
app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Path not found" });
});
app.use((err, req, res) => {
  console.log(err);
  res.sendStatus(500);
});

module.exports = app;
