/// Handle custom errors...

exports.handleCustomErrors = (err, req, res, next) => {
  console.log(err);
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.handlePSQLErrors = (err, req, res, next) => {
  if (err.code === "23502") {
    res.status(400).send({ msg: "Bad request" });
  } else if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad request" });
  } else {
    next(err);
  }
};

// exports.handleInvalidBody = (err, req, res, next) => {
//   if (!body) {
//     res.status(400).send({ msg: "Invalid body" });
//   } else {
//     next(err);
//   }
// };

// app.use((err, req, res) => {
//   console.log(err);
//   res.sendStatus(500);
// });
