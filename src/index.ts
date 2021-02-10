import dotenv from "dotenv";
import Server from "./server";

dotenv.config({
  path: ".env",
});

const port = process.env.APP_PORT ? Number(process.env.APP_PORT) : 5000;

(async () => {
  const server = new Server(port);
  await server.start();

  console.log(`API listening on port ${port}`);
})();
