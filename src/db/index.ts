import { MikroORM } from "@mikro-orm/core";
import User from "./entities/User";

const initORM = (connectionString: string | undefined) =>
  MikroORM.init({
    entities: [User],
    dbName: "morty",
    type: "mongo",
    clientUrl: connectionString,
  });

export { initORM };
