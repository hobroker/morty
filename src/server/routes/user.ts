import { Request, Response } from "express";
import Router from "../util/Router";

class UserRouter extends Router {
  protected configure() {
    const path = "/users";

    this.router.get(path, this.getUsers);
  }

  private getUsers(req: Request, res: Response) {
    res.send([
      {
        id: 1,
      },
    ]);
  }
}

export = UserRouter;
