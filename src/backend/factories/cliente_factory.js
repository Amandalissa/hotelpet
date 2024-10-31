import "dotenv/config";
import { faker } from "@faker-js/faker";
import RefreshToken from "../models/refresh_token.js";
import RefreshTokenCliente from "../models/refresh_token_cliente.js";
import Endereco from "../models/endereco.js";
import Cliente from "../models/cliente.js";
import crypto from "crypto";

const ClienteFactory = async (authService) => {
    return await new Promise((resolve, reject) => {
        RefreshToken.create({
            token: crypto.randomBytes(64).toString('hex')
        }).then((model) => {
            RefreshTokenCliente.create({
                refresh_token_id: model.id
            }).then((token_cliente) => {
                Endereco.create({
                    pais: faker.location.country(),
                    estado: faker.location.state(),
                    cidade: faker.location.city(),
                    bairro: "BAIRRO",
                    rua: faker.location.street(),
                    numero: faker.number.int({max: 500}),
                    cep: faker.location.zipCode("########")
                }).then(async (address) => {
                    Cliente.create({
                        id: faker.number.int({max: 9999}),
                        nome: faker.person.fullName(),
                        email: faker.internet.email(),
                        senha: await authService.generateHashFromPassword("teste"),
                        cpf: "11111111" + faker.number.int({max: 999}).toString(),
                        celular: "31911111111",
                        endereco_id: address.id,
                        refresh_token_id: token_cliente.refresh_token_id
                    }).then((user) => {
                        resolve(user);
                    }).catch((error) => {
                        reject(error);
                    });
                }).catch((error) => {
                    reject(error);
                });
            }).catch((error) => {
                reject(error);
            });
        }).catch((error) => {
            reject(error);
        });
    });
}

export default ClienteFactory;