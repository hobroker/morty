import express from "express";
import errorHandlerMiddleware from "./middlewares/errorHandler";
import loggerMiddleware from "./middlewares/logger";
import UserRouter from "./routes/user";

class Server {
  private readonly port: number;
  private readonly path = "/api";
  private readonly routers = [UserRouter];

  constructor(port: number) {
    this.port = port;
  }

  private app = express();

  private setupRouters() {
    this.routers.forEach((Router) => {
      const instance = new Router();

      this.app.use(this.path, instance.router);
    });
  }

  private setup() {
    this.app.use(loggerMiddleware);
    this.setupRouters();
    this.app.use(errorHandlerMiddleware);
  }

  public start() {
    this.setup();

    return new Promise((resolve) => {
      this.app.listen(this.port, () => resolve(this));
    });
  }
}

export = Server;
