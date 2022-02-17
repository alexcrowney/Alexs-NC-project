const {
  selectTopics,
  selectArticleById,
  updateArticleById,
} = require("../models/articles-model.js");

exports.getTopics = (req, res, next) => {
  selectTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => next(err));
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => next(err));
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  // console.log(req.body, "<--- req.body");
  updateArticleById(article_id, inc_votes)
    .then((article) => {
      // console.log(article, '<--- article');
      res.status(200).send({ article });
    })
    .catch((err) => {
      // console.log(err, "err in catch");
      next(err);
    });
};
