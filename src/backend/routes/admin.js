import { Router } from "express";
import AuthService from "../services/AuthService.js";
import AdminController from "../controllers/AdminController.js";
import AdminService from "../services/AdminService.js";
import AdminRepository from "../repository/AdminRepository.js";
import EmailService from "../services/EmailService.js";
import TokenRecuperacaoService from "../services/TokenRecuperacaoService.js";
import TokenRecuperacaoRepository from "../repository/TokenRecuperacaoRepository.js";
import UserRepository from "../repository/UserRepository.js";
import RefreshTokenRepository from "../repository/RefreshTokenRepository.js";

const adminController = new AdminController(new AdminService(new AdminRepository), new AuthService(new UserRepository, new RefreshTokenRepository), new EmailService, new TokenRecuperacaoService(new TokenRecuperacaoRepository));
const adminRouter = new Router();

adminRouter.post('/login', adminController.login);
adminRouter.post('/password', adminController.requestPasswordChange);

export default adminRouter;