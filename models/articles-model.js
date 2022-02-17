const db = require("../db/connection.js");

exports.selectTopics = () => {
  return db.query("SELECT * FROM topics;").then(({ rows }) => {
    return rows;
  });
};

exports.selectArticleById = (article_id) => {
  return (
    db
      // '$1' prevents SQL injection
      .query("SELECT * FROM articles WHERE article_id = $1;", [article_id])
      .then(({ rows }) => {
        return rows[0];
      })
  );
};

exports.updateArticleById = (article_id, inc_votes) => {
  return db
    .query(
      "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;",
      [inc_votes, article_id]
    )
    .then(({ rows }) => {
      // console.log(response, "<--- response");
      return rows[0];
    });
};
