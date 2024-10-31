import { Router } from "express";
import AnimalService from "../services/AnimalService.js";
import AnimalController from "../controllers/AnimalController.js";
import AnimalRepository from "../repository/AnimalRepository.js";
import { checkIsLoggedIn } from '../middlewares/checkIsLoggedIn.js';

const animalController = new AnimalController(new AnimalService(new AnimalRepository));
const animalRouter = new Router();

animalRouter.post('/cadastrar-animal', checkIsLoggedIn, animalController.createAnimal);
animalRouter.put('/editar-animal/:id', checkIsLoggedIn, animalController.updateAnimal);
animalRouter.get('/animais-cliente', checkIsLoggedIn, animalController.getAnimalsByClient);
animalRouter.get('/perfil-animal/:id', checkIsLoggedIn, animalController.getAnimalProfile);
animalRouter.delete('/deletar-animal/:id', checkIsLoggedIn, animalController.deleteAnimal);


export default animalRouter;
