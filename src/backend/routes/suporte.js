import { Router } from "express";
import SuporteSolicitacaoRepository from "../repository/SuporteSolicitacaoRepository.js";
import SuporteSolicitacaoService from "../services/SuporteSolicitacaoService.js";
import SuporteSolicitacaoController from "../controllers/SuporteSolicitacaoController.js";

const controller = new SuporteSolicitacaoController(new SuporteSolicitacaoService(new SuporteSolicitacaoRepository));
const suporteRouter = new Router();

suporteRouter.post('', controller.create);
suporteRouter.get('', controller.list);
suporteRouter.put('/:id/status', controller.updateStatus);

export default suporteRouter;
