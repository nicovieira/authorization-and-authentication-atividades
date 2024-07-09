import { inject, injectable } from "tsyringe";
import { user_services } from "../services/user.services";
import { Request, Response } from "express";

@injectable()
export class user_controllers {
  constructor(@inject("userServices") private user_services: user_services) {}

  async register(req: Request, res: Response): Promise<Response> {
    const response = await this.user_services.register(req.body);

    return res.status(201).json(response);
  }

  async login(req: Request, res: Response): Promise<Response> {
    const response = await this.user_services.login(req.body);

    return res.status(200).json(response);
  }

  async getUser(req: Request, res: Response): Promise<Response> {
    const { id } = res.locals.decode;

    const response = await this.user_services.getUser(id);

    return res.status(200).json(response);
  }
}
