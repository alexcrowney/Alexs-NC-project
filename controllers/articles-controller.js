const {
  selectTopics,
  selectArticleById,
  updateArticleById,
  selectUsers,
  selectArticles,
  selectArticleByIdWithCommentCount,
  selectCommentsByArticleId,
  insertCommentsByArticleId,
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
  updateArticleById(article_id, inc_votes)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => next(err));
};

exports.getUsers = (req, res, next) => {
  selectUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((err) => next(err));
};

exports.getArticles = (req, res, next) => {
  selectArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => next(err));
};

// exports.getArticleByIdWithCommentCount = (req, res, next) => {
//   const { article_id } = req.params;
//   selectArticleByIdWithCommentCount(article_id)
//     .then((article) => {
//       res.status(200).send({ article });
//     })
//     .catch((err) => next(err));
// };

exports.getCommentsById = (req, res, next) => {
  const { article_id } = req.params;
  // const id = req.params.article_id;
  selectCommentsByArticleId(article_id)
    .then((comments) => {
      res.status(200).send(comments);
    })
    .catch((err) => next(err));
};

exports.postCommentById = (req, res, next) => {
  // const { article_id } = req.params;
  // const { author, body } = req.body;
  const id = req.params.article_id;
  const author = req.body.author;
  const body = req.body.body;

  console.log("req.body >>>", req.body);

  insertCommentsByArticleId(id, author, body)
    .then((comment) => {
      res.status(200).send({ comment: comment });
    })
    .catch((err) => next(err));
};
