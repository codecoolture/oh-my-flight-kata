import request from "supertest";
import { api } from "../src/api";

describe("GET /", () => {
  it("works", async () => {
    await request(api).get("/").expect(200);
  });
});
