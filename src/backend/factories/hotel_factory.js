import "dotenv/config";
import { faker } from "@faker-js/faker";
import RefreshToken from "../models/refresh_token.js";
import RefreshTokenHotel from "../models/refresh_token_hotel.js";
import Endereco from "../models/endereco.js";
import Hotel from "../models/hotel.js";
import crypto from "crypto";

const HotelFactory = async (authService, approved) => {
    return await new Promise((resolve, reject) => {
        RefreshToken.create({
            token: crypto.randomBytes(64).toString('hex')
        }).then((model) => {
            RefreshTokenHotel.create({
                refresh_token_id: model.id
            }).then((token_hotel) => {
                Endereco.create({
                    pais: faker.location.country(),
                    estado: faker.location.state(),
                    cidade: faker.location.city(),
                    bairro: "BAIRRO",
                    rua: faker.location.street(),
                    numero: faker.number.int({max: 500}),
                    cep: faker.location.zipCode("########")
                }).then(async (address) => {
                    Hotel.create({
                        id: faker.number.int({max: 9999}),
                        razao_social: faker.company.name(),
                        email: faker.internet.email(),
                        senha: await authService.generateHashFromPassword("teste"),
                        cnpj: "11111111111" + faker.number.int({max: 999}).toString(),
                        celular: "31911111111",
                        endereco_id: address.id,
                        refresh_token_id: token_hotel.refresh_token_id,
                        aprovado: approved
                    }).then((hotel) => {
                        resolve(hotel);
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

export default HotelFactory;