import { Request, Response, Router } from "express";

class UserRouter {
  private _router = Router();
  public readonly path = "/users";

  get router() {
    return this._router;
  }

  constructor() {
    this.configure();
  }

  private configure() {
    this._router.get(this.path, UserRouter.getUsers);
  }

  private static getUsers(req: Request, res: Response) {
    res.status(200).json([
      {
        id: 1,
      },
    ]);
  }
}

export = new UserRouter().router;
