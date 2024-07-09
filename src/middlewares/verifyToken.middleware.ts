import { NextFunction, Request, Response } from "express";
import { app_error } from "../errors/appError";
import jwt from "jsonwebtoken";

export class verify_token {
  static execute(req: Request, res: Response, next: NextFunction) {
    const auth = req.headers.authorization;

    if (!auth) {
      throw new app_error("Token is required", 401);
    }

    const token = auth?.replace("Bearer ", "");

    const secret = process.env.JWT_SECRET as string;

    jwt.verify(token, secret);

    res.locals.decode = jwt.decode(token);

    next();
  }
}
