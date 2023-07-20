const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

describe("health check", () => {
  test("return an ok", async () => {
    const response = await api
      .get("/health")
      .expect(200)
      .expect("Content-Type", /text\/html/);
    expect(response.text).toBe("ok");
  });
});
