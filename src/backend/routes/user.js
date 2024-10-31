import { Router } from "express";
import AuthService from "../services/AuthService.js";
import UserRepository from "../repository/UserRepository.js";
import UserController from "../controllers/UserController.js";
import TokenRecuperacaoService from "../services/TokenRecuperacaoService.js";
import TokenRecuperacaoRepository from "../repository/TokenRecuperacaoRepository.js";
import RefreshTokenRepository from "../repository/RefreshTokenRepository.js";

const userController = new UserController(new TokenRecuperacaoService(new TokenRecuperacaoRepository), new AuthService(new UserRepository, new RefreshTokenRepository));
const userRouter = new Router();

userRouter.post("/recovery/validate", userController.verifyRecoveryToken);
userRouter.post("/recovery/final", userController.changePassword);

export default userRouter;