const express = require("express");
const { handleCustomErrors, handlePSQLErrors } = require("./errors.js");

const {
  getTopics,
  getArticleById,
  patchArticleById,
  getUsers,
  getArticles,
  // getArticleByIdWithCommentCount,
} = require("./controllers/articles-controller.js");

const app = express();
app.use(express.json());
app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById);
app.patch("/api/articles/:article_id", patchArticleById);
app.get("/api/users", getUsers);
app.get("/api/articles", getArticles);
// app.get("/api/articles/:article_id", getArticleByIdWithCommentCount);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Path not found" });
});

app.use(handleCustomErrors);
app.use(handlePSQLErrors);
// app.use(handleInvalidBody);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Server error" });
});

module.exports = app;
