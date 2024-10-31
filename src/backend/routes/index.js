import { Router } from "express";
import clientRouter from "./client.js";
import hotelRouter from "./hotel.js";
import adminRouter from "./admin.js";
import authRouter from "./auth.js";
import userRouter from "./user.js";
import animalRouter from './animal.js';
import suporteRouter from './suporte.js';

const mainRouter = new Router();

mainRouter.use('/auth', authRouter);
mainRouter.use('/clientes', clientRouter);
mainRouter.use('/hoteis', hotelRouter);
mainRouter.use('/admins', adminRouter);
mainRouter.use('/users', userRouter);
mainRouter.use('/animais', animalRouter);
mainRouter.use('/suporte-solicitacoes', suporteRouter);

export default mainRouter;
