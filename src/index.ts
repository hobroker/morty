import dotenv from "dotenv";
import { EntityManager, EntityRepository, MikroORM } from "@mikro-orm/core";
import Server from "./server";
import { initORM } from "./db";
import requestContextMiddleware from "./server/middlewares/requestContext";
import User from "./db/entities/User";

dotenv.config({
  path: ".env",
});

const DI = {} as {
  orm: MikroORM;
  em: EntityManager;
  userRepository: EntityRepository<User>;
};

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

(async () => {
  DI.orm = await initORM(process.env.MONGO_CONNECTION_STRING);
  DI.em = DI.orm.em;
  DI.userRepository = DI.orm.em.getRepository(User);

  const server = new Server(port);
  server.addMiddleware(requestContextMiddleware(DI.orm));

  await server.start();

  console.log(`API listening on port ${port}`);
})();

export { DI };
