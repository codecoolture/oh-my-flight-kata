import request from "supertest";
import { api } from "../src/api";

describe("GET /", () => {
  it("works", (done) => {
    request(api).get("/").expect(200, done);
  });
});
