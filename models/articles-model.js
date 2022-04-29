const db = require("../db/connection.js");

exports.selectTopics = () => {
  return db.query("SELECT * FROM topics;").then(({ rows }) => {
    return rows;
  });
};

exports.selectArticleById = (article_id) => {
  return db
    .query(
      `SELECT articles.*, COUNT (comments.comment_id) AS comment_count 
    FROM articles
    LEFT JOIN comments ON comments.article_id = articles.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id`,
      [article_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Path not found" });
      }
      return rows[0];
    });
};

exports.updateArticleById = (article_id, inc_votes) => {
  return db
    .query(
      "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;",
      [inc_votes, article_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.selectUsers = () => {
  return db.query("SELECT * FROM users;").then(({ rows }) => {
    return rows;
  });
};

// // TICKET 9 & 10 (REFACTOR)
// exports.selectArticles = () => {
//   return db
//     .query("SELECT * FROM articles ORDER BY created_at DESC;")
//     .then(({ rows }) => {
//       return rows;
//     });
// };

//TICKET #10 IS TO REFACTOR TICKET #9 BELOW
//GET ticket #9 - connecting to articles
exports.selectArticles = () => {
  return db
    .query(
      `SELECT *,
    COUNT(comments.comment_id) AS comment_count
    FROM articles
    LEFT JOIN comments ON comments.article_id = articles.article_id
    ORDER BY created_at DESC;`
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "path not found" });
      }
      console.log("RESULT FROM CONTROLLER===>", result.rows);
      return result.rows;
    });
};

// exports.selectArticleByIdWithCommentCount = (article_id) => {
//   return db
//     .query(
//       `SELECT * FROM articles, COUNT (comments.comment_id) AS comment_count
//       WHERE article_id = $1
//       FROM articles
//       LEFT JOIN comments ON comments.article_id = articles.article_id
//       GROUP BY articles.article_id`,
//       [article_id]
//     )
//     .then(({ rows }) => {
//       if (rows.length === 0) {
//         return Promise.reject({ status: 404, msg: "Path not found" });
//       }
//       return rows[0];
//     });
// };

// TICKET 15
exports.selectCommentsByArticleId = (article_id) => {
  return db
    .query(
      `SELECT * FROM comments
  WHERE article_id = $1;`,
      [article_id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Comments not found" });
      }
      return result.rows;
    });
};

// TICKET 11
exports.insertCommentsByArticleId = (id, author, body) => {
  if (body.length === 0 || author.length === 0) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
  return db
    .query(
      `INSERT INTO comments (id, author, body)
    VALUES($1, $2, $3)
    RETURNING *`,
      [id, author, body]
    )
    .then((result) => {
      return result.rows[0];
    });
};
