import express from "express";

const api = express();

api.get("/", function (_, res) {
  res.send("Hello World!");
});

export { api };
