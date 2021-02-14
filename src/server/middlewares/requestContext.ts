import { RequestContext, MikroORM } from "@mikro-orm/core";
import { Request, Response, NextFunction } from "express";

const requestContextMiddleware = (orm: MikroORM) => (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  RequestContext.create(orm.em, next);
};

export = requestContextMiddleware;
