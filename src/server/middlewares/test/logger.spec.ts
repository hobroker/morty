import { Request, Response, NextFunction } from "express";
import loggerMiddleware from "../logger";

describe("loggerMiddleware", () => {
  const log = jest.spyOn(global.console, "log");

  afterEach(() => {
    log.mockRestore();
  });
  it("should log and call next()", () => {
    const next = jest.fn();
    const req = {
      method: 'GET',
      path: '/'
    } as Request;
    const res = {} as Response;

    loggerMiddleware()(req, res, next);
    expect(next).toBeCalled();
    expect(log).toBeCalledWith('GET /');
  });
});
