import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import AuthService from "../services/AuthService.js";
import UserRepository from "../repository/UserRepository.js";
import RefreshTokenRepository from "../repository/RefreshTokenRepository.js";

const authController = new AuthController(new AuthService(new UserRepository, new RefreshTokenRepository));
const authRouter = new Router();

authRouter.get("/refresh", authController.newAccessToken);

export default authRouter;