import Animal from '../models/animal.js';

export default class AnimalController {
  constructor(animalService) {
    this.animalService = animalService;
  }

  createAnimal = async (req, res) => {
    try {
      const { nome, tamanho, sexo, temperamento, raca } = req.body;
      const cliente_id = req.user.id;

      const newAnimal = await this.animalService.createAnimal({
        nome,
        tamanho,
        sexo,
        temperamento,
        raca,
        cliente_id: cliente_id,
      });

      return res.status(201).json(newAnimal);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }

  getAnimalsByClient = async (req, res) => {
    try {
      const cliente_id = req.user.id;

      const animals = await this.animalService.getAnimalsByClient(cliente_id);

      return res.status(200).json(animals);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }

  getAnimalProfile = async (req, res) => {
    try {
      const { id } = req.params;
      const cliente_id = req.user.id;

      const animalProfile = await this.animalService.getAnimalProfile(id, cliente_id);

      if (!animalProfile) {
        return res.status(404).json({ message: "Perfil do animal não encontrado ou não pertence ao cliente." });
      }

      return res.status(200).json(animalProfile);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }

  updateAnimal = async (req, res) => {
    console.log("Entrou na função updateAnimal");
    try {
      const { id } = req.params;
      const { nome, tamanho, sexo, temperamento, raca } = req.body;
      const cliente_id = req.user.id;

      const animal = await Animal.findOne({ where: { id, cliente_id } });
      if (!animal) {
        return res.status(404).json({ message: 'Animal não encontrado ou não pertence ao cliente.' });
      }

      const updatedAnimal = await this.animalService.updateAnimal(id, { nome, tamanho, sexo, temperamento, raca, cliente_id });

      return res.status(200).json(updatedAnimal);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }

  deleteAnimal = async (req, res) => {
    try {
      const { id } = req.params;
      const cliente_id = req.user.id;

      const animal = await Animal.findOne({ where: { id, cliente_id } });
      if (!animal) {
        return res.status(404).json({ message: 'Animal não encontrado ou não pertence ao cliente.' });
      }

      await animal.destroy();

      return res.status(204).send();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }

}
