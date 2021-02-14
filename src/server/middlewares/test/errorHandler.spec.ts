import { Request, Response, NextFunction } from "express";
import HttpException from "../../util/HttpException";
import errorHandlerMiddleware from "../errorHandler";

describe("errorHandlerMiddleware", () => {
  const log = jest.spyOn(global.console, "log");

  afterEach(() => {
    log.mockRestore();
  });
  it("should log and call next()", () => {
    const next = jest.fn();
    const req = {} as Request;
    const res = {} as Response;
    const statusCode = 400;
    const message = "error";
    const exception = new HttpException(statusCode, message);

    res.json = jest.fn();
    res.status = jest.fn();

    errorHandlerMiddleware()(exception, req, res, next);
    expect(res.status).toBeCalledWith(statusCode);
    expect(res.json).toBeCalledWith({
      statusCode,
      message,
    });
  });
});
