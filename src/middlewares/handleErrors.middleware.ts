import { NextFunction, Request, Response } from "express";
import { app_error } from "../errors/appError";
import { JsonWebTokenError } from "jsonwebtoken";

export class handle_errors {
  static execute(error: Error, req: Request, res: Response, next: NextFunction) {
    if (error instanceof app_error) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    if (error instanceof JsonWebTokenError) {
      return res.status(401).json({ message: error.message });
    }

    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
