import { Router } from "express";
import AuthService from "../services/AuthService.js";
import HotelController from "../controllers/HotelController.js";
import HotelService from "../services/HotelService.js";
import HotelRepository from "../repository/HotelRepository.js";
import EmailService from "../services/EmailService.js";
import TokenRecuperacaoService from "../services/TokenRecuperacaoService.js";
import TokenRecuperacaoRepository from "../repository/TokenRecuperacaoRepository.js";
import UserRepository from "../repository/UserRepository.js";
import RefreshTokenRepository from "../repository/RefreshTokenRepository.js";

const hotelController = new HotelController(new HotelService(new HotelRepository), new AuthService(new UserRepository, new RefreshTokenRepository), new EmailService, new TokenRecuperacaoService(new TokenRecuperacaoRepository));
const hotelRouter = new Router();

hotelRouter.post('/login', hotelController.login);
hotelRouter.post('/password', hotelController.requestPasswordChange);

export default hotelRouter;