import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import { app_error } from "../errors/appError";
import {
  tLoginReturn,
  tLoginUserBody,
  tRegisterUserBody,
  tUserReturn,
  userReturnSchema,
} from "../schemas/user.schemas";

@injectable()
export class user_services {
  async register(body: tRegisterUserBody): Promise<tUserReturn> {
    const hashPassword = await bcrypt.hash(body.password, 10);

    const newUser: tRegisterUserBody = {
      name: body.name,
      email: body.email,
      password: hashPassword,
    };

    const data = await prisma.user.create({ data: newUser });

    return userReturnSchema.parse(data);
  }

  async login(body: tLoginUserBody): Promise<tLoginReturn> {
    const user = await prisma.user.findFirst({ where: { email: body.email } });

    if (!user) {
      throw new app_error("User not registered", 404);
    }

    const compare = await bcrypt.compare(body.password, user.password);

    if (!compare) {
      throw new app_error("Email and password doesn't match", 403);
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "12h",
    });

    return {
      accessToken: token,
      user: userReturnSchema.parse(user),
    };
  }

  async getUser(id: number): Promise<tUserReturn> {
    const user = await prisma.user.findFirst({ where: { id: id } });

    return userReturnSchema.parse(user);
  }
}
