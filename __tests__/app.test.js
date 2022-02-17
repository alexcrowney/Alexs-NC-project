const request = require("supertest");
const app = require("../app");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/index");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("1. GET /api/topics", () => {
  test("status:200, responds with an array of news topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        const {
          body: { topics },
        } = response;
        // console.log(topics, "<---TEST");
        expect(topics).toHaveLength(3);
        topics.forEach((topic) => {
          expect(topic).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });
});

describe("2. GET /api/articles/:article_id", () => {
  test("status:200, responds with an article object with specific properties", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((response) => {
        const {
          body: { article },
        } = response;
        // console.log(article, "<--- TEST");
        expect(article).toEqual({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: expect.any(String),
          votes: 100,
        });
      });
  });
});

describe("3. PATCH /api/articles/:article_id", () => {
  test("status:200, responds with article, with updated vote property", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 5 })
      .expect(200)
      .then((response) => {
        // console.log(response);
        const {
          body: { article },
        } = response;
        // console.log(article, "<---- TEST");
        expect(article).toEqual({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: expect.any(String),
          votes: 105,
        });
      });
  });
});

describe("4. 404 Path not found", () => {
  test("status:404, responds with error message", () => {
    return request(app)
      .get("/api/not-a-valid-path")
      .expect(404)
      .then(({ body }) => {
        console.log(body);
        expect(body.msg).toBe("Path not found");
      });
  });
});

// describe("5. 404 Valid but non-existent article ID", () => {
//   test("status:404, responds with error message", () => {
//     return request(app)
//       .get("/api/articles/99999")
//       .expect(404)
//       .then(({ body: { msg } }) => {
//         expect(msg).toBe("Article not found");
//       });
//   });
// });
