import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/UserServices";

export class UserController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.listAll();
      return res.json(users);
    } catch (error) {
      next(error);
    }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const user = await UserService.getById(id);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const user = UserService.create({ name, email, password });
      return res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const { name, email, password } = req.body;
      const user = await UserService.update(id, { name, email, password });
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const user = await UserService.delete(id);

      // 204 (No Content) é o status correto para "deu certo, mas não
      // tenho nada para retornar no corpo da resposta".
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
