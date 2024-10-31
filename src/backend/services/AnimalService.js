export default class AnimalService {
  constructor(animalRepository) {
    this.animalRepository = animalRepository;
  }

  async createAnimal(animalData) {
    return await this.animalRepository.createAnimal(animalData);
  }

  async getAnimalsByClient(cliente_id) {
    return await this.animalRepository.findByClienteId(cliente_id);
  }

  async getAnimalProfile(id, cliente_id) {
    const animalProfile = await this.animalRepository.findAnimalProfile(id);

    if (!animalProfile || animalProfile.cliente_id !== cliente_id) {
      throw new Error("Perfil do animal não encontrado ou não pertence ao cliente.");
    }

    return animalProfile;
  }

  async updateAnimal(id, animalData) {
    const animal = await this.animalRepository.findById(id);

    if (!animal) {
      throw new Error("Animal não encontrado.");
    }

    console.log("Cliente ID do token:", animalData.cliente_id);
    console.log("Cliente ID associado ao animal:", animal.cliente_id);

    if (animal.cliente_id !== animalData.cliente_id) {
      throw new Error("Animal não encontrado ou não pertence ao cliente.");
    }

    return await this.animalRepository.updateOne(id, animalData);
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
