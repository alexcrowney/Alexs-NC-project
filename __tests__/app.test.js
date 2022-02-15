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

describe("2. 404 Path not found", () => {
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
