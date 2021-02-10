import express from "express";
import UserRouter from "./routes/user";

class Server {
  private readonly port: number;
  private readonly path = "/api";

  constructor(port: number) {
    this.port = port;
  }

  private app = express();

  private setupRouters() {
    const routers = [UserRouter];
    routers.forEach((router) => {
      this.app.use(this.path, router);
    });
  }

  public start() {
    this.setupRouters();

    return new Promise((resolve) => {
      this.app.listen(this.port, () => resolve(this));
    });
  }
}

export default Server;
