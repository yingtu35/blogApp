const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const helper = require("./test.helper");

const api = supertest(app);

beforeEach(async () => {
  await helper.initializeUsers();
});

describe("health check", () => {
  test("return an ok", async () => {
    const response = await api
      .get("/health")
      .expect(200)
      .expect("Content-Type", /text\/html/);
    expect(response.text).toBe("ok");
  });
});

afterAll(() => {
  mongoose.connection.close();
});
