const request = require("supertest");
const app = require("../app");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/index");

beforeEach(() => {
  return seed(testData);
});
afterAll(() => db.end());

describe.only("1. GET /api/topics", () => {
  test("status:200, responds with an array of news topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        const {
          body: { topics },
        } = response;
        console.log(topics, "<--- TOPICS");
        expect(topics).toHaveLength(3);
        topics.forEach((topic) => {
          expect(topic).toEqual(
            expect.objectContaining({
              description: expect.any(String),
              slug: expect.any(String),
            })
          );
        });
      });
  });
});

// // TICKET 5 INTERFERES - COMMENT COUNT - DELETE THIS ONE?
// xdescribe("2. GET /api/articles/:article_id", () => {
//   test("status:200, responds with an article object with specific properties", () => {
//     return request(app)
//       .get("/api/articles/1")
//       .expect(200)
//       .then((response) => {
//         const {
//           body: { article },
//         } = response;
//         expect(article).toEqual({
//           article_id: 1,
//           title: "Living in the shadow of a great man",
//           topic: "mitch",
//           author: "butter_bridge",
//           body: "I find this existence challenging",
//           created_at: expect.any(String),
//           votes: 100,
//         });
//       });
//   });
// });

// describe("3. PATCH /api/articles/:article_id", () => {
//   test("status:200, responds with article, with updated vote property", () => {
//     return request(app)
//       .patch("/api/articles/1")
//       .send({ inc_votes: 5 })
//       .expect(200)
//       .then((response) => {
//         const {
//           body: { article },
//         } = response;
//         expect(article).toEqual({
//           article_id: 1,
//           title: "Living in the shadow of a great man",
//           topic: "mitch",
//           author: "butter_bridge",
//           body: "I find this existence challenging",
//           created_at: expect.any(String),
//           votes: 105,
//         });
//       });
//   });
// });

// describe("4. 404 Path not found", () => {
//   test("status:404, responds with error message", () => {
//     return request(app)
//       .get("/api/articles/9999")
//       .expect(404)
//       .then(({ body }) => {
//         expect(body.msg).toBe("Path not found");
//       });
//   });
// });

// describe("5. 400 Bad user ID", () => {
//   test("status:400, responds with error message when passed bad user ID", () => {
//     return request(app)
//       .get("/api/articles/hello")
//       .expect(400)
//       .then(({ body }) => {
//         expect(body.msg).toBe("Bad request");
//       });
//   });
// });

// describe("6. 400 Request body invalid", () => {
//   test("status:400, responds with error message when body doesn't exist", () => {
//     return request(app)
//       .patch("/api/articles/1")
//       .send({ unrelated_key: "random value" })
//       .expect(400)
//       .then(({ body }) => {
//         expect(body.msg).toBe("Bad request");
//       });
//   });
// });

// // ADD ANOTHER TEST THAT CHECKS FOR SENDING AN EMPTY OBJECT (400)
// // NOT SURE WHAT I'M DOING  : /
// xdescribe("7. 400 Sends empty object", () => {
//   test("status:400, responds with error message when object is empty", () => {
//     return request(app)
//       .get("/api/articles/12")
//       .expect(400)
//       .then(({ body }) => {
//         console.log(body);
//         expect(body.msg).toBe("Bad request");
//       });
//   });
// });

// // AND ONE THAT SENDS INC_VOTES AND AN UNRELATED KEY, TO SEE IF IT IGNORES THE UNRELATED KEY (400)
// // NOT SURE WHAT I'M DOING  : /
// xdescribe("8. 400 Sends inc_votes and an unrelated key", () => {
//   test("status: 400, responds with error message ...?", () => {
//     return request(app)
//       .get("/api/articles/1")
//       .expect(400)
//       .then(({ body }) => {
//         console.log(body);
//         expect(body.msg).toBe("????");
//       });
//   });
// });

// // TICKET 21
// describe("9. GET api/users/", () => {
//   test("status: 200, responds with an array of objects, each with a username", () => {
//     return request(app)
//       .get("/api/users")
//       .expect(200)
//       .then((response) => {
//         const {
//           body: { users },
//         } = response;
//         expect(users).toHaveLength(4);
//         users.forEach((user) => {
//           expect(user).toEqual(
//             expect.objectContaining({
//               username: expect.any(String),
//               name: expect.any(String),
//               avatar_url: expect.any(String),
//             })
//           );
//         });
//       });
//   });
// });

// // // TICKET 9
// // describe("10. GET api/articles", () => {
// //   test("status: 200, responds with an array of article objects, each with six properties", () => {
// //     return request(app)
// //       .get("/api/articles")
// //       .expect(200)
// //       .then((response) => {
// //         const {
// //           body: { articles },
// //         } = response;
// //         expect(articles).toHaveLength(12);
// //         articles.forEach((article) => {
// //           expect(article).toEqual(
// //             expect.objectContaining({
// //               article_id: expect.any(Number),
// //               title: expect.any(String),
// //               topic: expect.any(String),
// //               author: expect.any(String),
// //               created_at: expect.any(String),
// //               votes: expect.any(Number),
// //             })
// //           );
// //         });
// //       });
// //   });
// // });

// //ticket #9 - connecting to articles + ticket #10 REFACTOR
// describe.only("GET /api/articles", () => {
//   test("status: 200 - connecting to endpoint successfully + ticket #10 comment count", () => {
//     return request(app)
//       .get("/api/articles")
//       .expect(200)
//       .then(({ body }) => {
//         expect(body).toHaveLength(12);
//         body.forEach((article) => {
//           // console.log("comment count==>", body.articles.comment_count);
//           expect(article).toEqual(
//             expect.objectContaining({
//               title: expect.any(String),
//               topic: expect.any(String),
//               author: expect.any(String),
//               body: expect.any(String),
//               created_at: expect.any(String),
//               votes: expect.any(Number),
//               comment_count: 18,
//             })
//           );
//         });
//       });
//   });

// // TICKET 5
// describe("11. GET /api/articles/:article_id (w/ comment count)", () => {
//   test("status: 200, responds with an article object with comment count", () => {
//     return request(app)
//       .get("/api/articles/1")
//       .expect(200)
//       .then((response) => {
//         const {
//           body: { article },
//         } = response;
//         console.log("ticket 5 article >>>", article);
//         expect(article).toEqual({
//           article_id: 1,
//           title: "Living in the shadow of a great man",
//           topic: "mitch",
//           author: "butter_bridge",
//           body: "I find this existence challenging",
//           created_at: expect.any(String),
//           votes: 100,
//           comment_count: "11",
//         });
//       });
//   });
// });

// // TICKET 15
// describe("12. GET /api/articles/:article_id/comments", () => {
//   test("status: 200, responds with an array of comments (w/ properties) for given article_id", () => {
//     return request(app)
//       .get("/api/articles/3/comments")
//       .expect(200)
//       .then(({ body }) => {
//         expect(body).toHaveLength(2);
//         body.forEach((comment) => {
//           expect(comment).toEqual(
//             expect.objectContaining({
//               comment_id: expect.any(Number),
//               votes: expect.any(Number),
//               created_at: expect.any(String),
//               author: expect.any(String),
//               body: expect.any(String),
//               article_id: 3,
//             })
//           );
//         });
//       });
//   });

//   test("status: 404, comment not found", () => {
//     return request(app)
//       .get("/api/articles/999/comments")
//       .expect(404)
//       .then(({ body }) => {
//         expect(body.msg).toBe("Comments not found");
//       });
//   });

//   test("status: 400, bad request", () => {
//     return request(app)
//       .get("/api/articles/alex")
//       .expect(400)
//       .then(({ body }) => {
//         expect(body.msg).toBe("Bad request");
//       });
//   });
// });

// // TICKET 11
// describe("POST /api/articles/:article_id/comments", () => {
//   test("status: 200, posts comment to article", () => {
//     return request(app)
//       .post("/api/articles/3/comments")
//       .send({ author: "icellusedkars", body: "Very good" })
//       .expect(200)
//       .then(({ body }) => {
//         expect(body.comment).toEqual({
//           body: "Very good",
//           votes: expect.any(Number),
//           author: "icellusedkars",
//           article_id: 3,
//           created_at: expect.any(String),
//           comment_id: expect.any(Number),
//         });
//       });
//   });
// });
