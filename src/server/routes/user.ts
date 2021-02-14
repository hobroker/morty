import { NextFunction, Request, Response } from "express";
import { DI } from "../..";
import Router from "../util/Router";
import User from "../../db/entities/User";
import NotFoundException from "../util/NotFoundException";

class UserRouter extends Router {
  protected configure() {
    try {
      const path = "/users";

      this.router.get(path, this.getUsers);
      this.router.get(`${path}/:id`, this.getUser);
      this.router.post(path, this.createUser);
      this.router.patch(`${path}/:id`, this.updateUser);
      this.router.delete(`${path}/:id`, this.deleteUser);
    } catch (e) {
      console.log("coifurer");
    }
  }

  private async getUsers(req: Request, res: Response) {
    const users = await DI.userRepository.findAll();
    res.json(users);
  }

  private async createUser(req: Request, res: Response) {
    const { name, email } = req.body;
    const user = new User(name, email);

    await DI.userRepository.persist(user).flush();

    res.json(user);
  }

  private async getUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const user = await DI.userRepository.findOneOrFail(id);
      res.json(user);
    } catch (e) {
      next(new NotFoundException());
    }
  }

  private async updateUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = await DI.userRepository.findOne(id);
    if (user === null) {
      throw next(new NotFoundException());
    }

    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }

    await DI.userRepository.persist(user).flush();

    res.json(user);
  }

  private async deleteUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const user = await DI.userRepository.findOne(id);
    if (user === null) {
      throw next(new NotFoundException());
    }

    await DI.em.removeAndFlush(user);

    res.status(201).send();
  }
}

export = UserRouter;
