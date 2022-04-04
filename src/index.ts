import { createServer } from "http";
import { api } from "./api";

const { HOST, PORT } = process.env;

if (typeof HOST !== "string" || typeof PORT !== "string") {
  throw new Error("Missing HOST or PORT env variables");
}

const server = createServer(api).listen(parseInt(PORT, 10), HOST);

server.on("listening", () => {
  const addressInfo = server.address();

  if (addressInfo === null || typeof addressInfo === "string") {
    return;
  }

  const { address, port } = addressInfo;

  console.log(`The server is listening on ${address}:${port}`);
});
