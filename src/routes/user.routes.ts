import { Router } from "express";
import { container } from "tsyringe";
import { user_services } from "../services/user.services";
import { user_controllers } from "../controllers/user.controllers";
import { verify_token } from "../middlewares/verifyToken.middleware";

container.registerSingleton("userServices", user_services);

const userControllers = container.resolve(user_controllers);

export const userRouter = Router();

userRouter.post("/", (req, res) => userControllers.register(req, res));
userRouter.post("/login", (req, res) => userControllers.login(req, res));
userRouter.get("/", verify_token.execute, (req, res) => userControllers.getUser(req, res));
