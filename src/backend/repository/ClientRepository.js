import Cliente from "../models/cliente.js";
import Endereco from "../models/endereco.js";
import RefreshToken from "../models/refresh_token.js";
import RefreshTokenCliente from "../models/refresh_token_cliente.js";
import TokenRecuperacao from "../models/token_recuperacao.js";

class ClientRepository {

    findById(id) {
        return Cliente.findByPk(id, {
            include: [
                {
                    model: TokenRecuperacao,
                    as: "token_recuperacao"
                },
                {
                    model: RefreshTokenCliente,
                    as: "refresh_token",
                    include: {
                        model: RefreshToken,
                        as: "refresh_token"
                    }
                },
                {
                    model: Endereco,
                    as: "endereco"
                }
            ]
        });
    }

    findByEmail(email) {
        return Cliente.findOne({
            where: {
                email: email,
            },
            include: [
                {
                    model: TokenRecuperacao,
                    as: "token_recuperacao"
                },
                {
                    model: RefreshTokenCliente,
                    as: "refresh_token",
                    include: {
                        model: RefreshToken,
                        as: "refresh_token"
                    }
                },
                {
                    model: Endereco,
                    as: "endereco"
                }
            ]
        });
    }

    setPassword(id, password) {
        return Cliente.update({
            senha: password,
        }, {
            where: { id: id }
        });
    }

    async updateOne(id, data) {
        let client = await Cliente.findByPk(id);

        return client.update(data);
    }


    async createNewClientWithEndereco(clientData, enderecoData) {
        let endereco = await Endereco.findOne({ where: { cep: enderecoData.cep } });

        if (!endereco) {
            endereco = await Endereco.create(enderecoData).catch(error => {
                throw new Error(`Erro ao criar endereço: ${error}`);
            });
        }

        clientData.endereco_id = endereco.id;

        const newClient = await Cliente.create(clientData).catch(error => {
            throw new Error(`Erro ao criar cliente: ${error.message}`);
        });

        return { client: newClient, endereco: endereco };
    }

    async getClientProfile(id) {
        return await Cliente.findByPk(id, {
            include: [
                {
                    model: Endereco,
                    as: "endereco"
                },
                {
                    model: TokenRecuperacao,
                    as: "token_recuperacao"
                },
                {
                    model: RefreshTokenCliente,
                    as: "refresh_token",
                    include: {
                        model: RefreshToken,
                        as: "refresh_token"
                    }
                }
            ]
        });
    }

    async updateEndereco(enderecoId, enderecoData) {
        let endereco = await Endereco.findByPk(enderecoId);

        if (!endereco) {
            throw new Error("Endereço não encontrado.");
        }

        return await endereco.update(enderecoData);
    }

}

export default ClientRepository;