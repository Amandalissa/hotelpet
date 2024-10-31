import { Router } from "express";
import ClienteService from "../services/ClientService.js";
import AuthService from "../services/AuthService.js";
import ClienteController from "../controllers/ClienteController.js";
import ClientRepository from "../repository/ClientRepository.js";
import EmailService from "../services/EmailService.js";
import TokenRecuperacaoService from "../services/TokenRecuperacaoService.js";
import TokenRecuperacaoRepository from "../repository/TokenRecuperacaoRepository.js";
import UserRepository from "../repository/UserRepository.js";
import RefreshTokenRepository from "../repository/RefreshTokenRepository.js";
import { checkIsLoggedIn } from '../middlewares/checkIsLoggedIn.js';

const clienteController = new ClienteController(new ClienteService(new ClientRepository, new AuthService(new UserRepository, new RefreshTokenRepository)), new AuthService(new UserRepository, new RefreshTokenRepository), new EmailService, new TokenRecuperacaoService(new TokenRecuperacaoRepository));
const clientRouter = new Router();

clientRouter.post('/login', clienteController.login);
clientRouter.post('/password', clienteController.requestPasswordChange);
clientRouter.post('/cadastrar-cliente', clienteController.createClient);
clientRouter.put('/editar-cliente/:id', clienteController.updateClient);
clientRouter.get('/perfil', checkIsLoggedIn, clienteController.getClientProfile);

export default clientRouter;