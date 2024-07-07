import "dotenv/config";
import "reflect-metadata";
import helmet from "helmet";
import "express-async-errors";
import express, { json } from "express";
import { userRouter } from "./routes/user.routes";
import { handle_errors } from "./middlewares/handleErrors.middleware";

export const app = express();

app.use(helmet());

app.use(json());

app.use("/users", userRouter);

app.use(handle_errors.execute);
