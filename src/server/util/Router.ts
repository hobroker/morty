import { Router as ExpressRouter } from "express";

class Router {
  private _router = ExpressRouter();

  get router() {
    return this._router;
  }

  constructor() {
    this.configure();
  }

  protected configure() {
    throw new Error("not implemented");
  }
}

export = Router;
