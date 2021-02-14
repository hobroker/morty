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

    this.setup();
  }

  private app = express();

  private setupRouters() {
    this.routers.forEach((Router) => {
      const instance = new Router();

      this.app.use(this.path, instance.router);
    });
  }

  private setup() {
    this.addMiddleware(loggerMiddleware());
    this.addMiddleware(express.json());
  }

  addMiddleware(middleware: any) {
    this.app.use(middleware);
  }

  public start() {
    this.setupRouters();
    this.addMiddleware(errorHandlerMiddleware());

    return new Promise((resolve) => {
      this.app.listen(this.port, () => resolve(this));
    });
  }
}

export = Server;
