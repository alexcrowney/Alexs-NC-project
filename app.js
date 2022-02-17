const express = require("express");

const {
  getTopics,
  getArticleById,
  patchArticleById,
} = require("./controllers/articles-controller.js");

// console.log(patchArticleById, "<-----");

const app = express();
app.use(express.json());
app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById);
app.patch("/api/articles/:article_id", patchArticleById);
app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Path not found" });
});
// IS THIS RIGHT? //
// app.all("/*", (req, res) => {
//   res.status(404).send({ msg: "Article not found" });
// });

app.use((err, req, res) => {
  console.log(err);
  res.sendStatus(500);
});

module.exports = app;
