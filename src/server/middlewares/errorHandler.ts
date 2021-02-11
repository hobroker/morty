import { Request, Response, NextFunction } from "express";
import HttpException from "../util/HttpException";

const errorHandlerMiddleware = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    statusCode,
    status: "error",
    message: err.message,
  });
};

export = errorHandlerMiddleware;
