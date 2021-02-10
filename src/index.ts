import dotenv from "dotenv";
import Server from "./server";

dotenv.config({
  path: ".env",
});

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

(async () => {
  const server = new Server(port);
  await server.start();

  console.log(`API listening on port ${port}`);
})();
