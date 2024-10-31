import Animal from "../models/animal.js";
import Cliente from "../models/cliente.js";

class AnimalRepository {

  findById(id) {
    return Animal.findByPk(id, {
      include: [
        {
          model: Cliente,
          as: "cliente"
        }
      ]
    });
  }

  findByClienteId(clienteId) {
    return Animal.findAll({
      where: {
        cliente_id: clienteId
      },
      include: [
        {
          model: Cliente,
          as: "cliente"
        }
      ]
    });
  }

  async createAnimal(animalData) {
    try {
      const newAnimal = await Animal.create(animalData);
      return newAnimal;
    } catch (error) {
      throw new Error(`Erro ao criar animal: ${error.message}`);
    }
  }

  findAnimalProfile(id) {
    return Animal.findByPk(id, {
      include: [
        {
          model: Cliente,
          as: "cliente",
        },
      ],
    });
  }

  async updateOne(id, animalData) {
    let animal = await Animal.findByPk(id);
    return animal.update(animalData);
  }

  async deleteById(id) {
    const animal = await this.findById(id);
    if (!animal) {
      throw new Error("Animal não encontrado.");
    }
    await animal.destroy();
  }
}

export default AnimalRepository;
