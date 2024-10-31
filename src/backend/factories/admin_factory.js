import "dotenv/config";
import { faker } from "@faker-js/faker";
import RefreshToken from "../models/refresh_token.js";
import RefreshTokenAdmin from "../models/refresh_token_admin.js";
import crypto from "crypto";
import Admin from "../models/admin.js";

const AdminFactory = async (authService, root) => {
    return await new Promise((resolve, reject) => {
        RefreshToken.create({
            token: crypto.randomBytes(64).toString('hex')
        }).then((model) => {
            RefreshTokenAdmin.create({
                refresh_token_id: model.id
            }).then(async (token_admin) => {
                Admin.create({
                    id: faker.number.int({max: 9999}),
                    nome: faker.person.fullName(),
                    email: faker.internet.email(),
                    senha: await authService.generateHashFromPassword("teste"),
                    cpf: "11111111" + faker.number.int({max: 999}).toString(),
                    root: root,
                    refresh_token_id: token_admin.refresh_token_id
                }).then((admin) => {
                    resolve(admin);
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

export default AdminFactory;