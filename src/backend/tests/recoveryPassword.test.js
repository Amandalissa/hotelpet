import "dotenv/config";
import request from "supertest";
import createServer from "../server";
import TokenRecuperacao from "../models/token_recuperacao";
import ClientService from "../services/ClientService";
import ClienteFactory from "../factories/cliente_factory";
import HotelFactory from "../factories/hotel_factory";
import AdminFactory from "../factories/admin_factory";
import RefreshToken from "../models/refresh_token";
import AuthService from "../services/AuthService";
import UserRepository from "../repository/UserRepository";
import ClientRepository from "../repository/ClientRepository";
import HotelService from "../services/HotelService";
import HotelRepository from "../repository/HotelRepository";
import AdminService from "../services/AdminService";
import AdminRepository from "../repository/AdminRepository";
import RefreshTokenRepository from "../repository/RefreshTokenRepository";


const app = await createServer();

const hotelService = new HotelService(new HotelRepository);
const adminService = new AdminService(new AdminRepository);
const authService = new AuthService(new UserRepository, new RefreshTokenRepository);
const clientService = new ClientService(new ClientRepository, authService);

var client, hotel, admin;

beforeAll(async () => {
    client = await ClienteFactory(authService);
    hotel = await HotelFactory(authService);
    admin = await AdminFactory(authService); 
});

afterAll(async () => {
    let client_token_id = client.refresh_token_id;
    let hotel_token_id = hotel.refresh_token_id;
    let admin_token_id = admin.refresh_token_id;

    await client.destroy();
    await (await RefreshToken.findOne({where: {id: client_token_id}})).destroy();

    await hotel.destroy();
    await (await RefreshToken.findOne({where: {id: hotel_token_id}})).destroy();

    await admin.destroy();
    await (await RefreshToken.findOne({where: {id: admin_token_id}})).destroy();
})

describe("Grupo de testes de recuperação de senha", () => {
    test("Testa recuperacao de senha cliente", async () => {
        let response = await request(app).post("/clientes/password").send({
            email: client.email
        });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);

        let lastRecoveryToken = await TokenRecuperacao.findOne({where: {cliente_id: client.id}});

        expect(lastRecoveryToken === null).toBe(false);

        let validateTokenResponse = await request(app).post("/users/recovery/validate").send({
            role: "CLIENTE",
            token: lastRecoveryToken.token,
            email: client.email
        });

        expect(validateTokenResponse.status).toBe(200);
        expect(validateTokenResponse.body.success).toBe(true);

        let changePasswordResponse = await request(app).post("/users/recovery/final").send({
            role: "CLIENTE",
            token: lastRecoveryToken.token,
            email: client.email,
            new_password: "teste2"
        });

        expect(changePasswordResponse.status).toBe(200);
        expect(changePasswordResponse.body.success).toBe(true);

        expect((await clientService.validateCredentials(client.email, "teste")).success).toBe(false);
        expect((await clientService.validateCredentials(client.email, "teste2")).success).toBe(true);
    });

    test("Testa recuperacao de senha hotel", async () => {
        let response = await request(app).post("/hoteis/password").send({
            email: hotel.email
        });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);

        let lastRecoveryToken = await TokenRecuperacao.findOne({where: {hotel_id: hotel.id}});

        expect(lastRecoveryToken === null).toBe(false);

        let validateTokenResponse = await request(app).post("/users/recovery/validate").send({
            role: "HOTEL",
            token: lastRecoveryToken.token,
            email: hotel.email
        });

        expect(validateTokenResponse.status).toBe(200);
        expect(validateTokenResponse.body.success).toBe(true);

        let changePasswordResponse = await request(app).post("/users/recovery/final").send({
            role: "HOTEL",
            token: lastRecoveryToken.token,
            email: hotel.email,
            new_password: "teste2"
        });

        expect(changePasswordResponse.status).toBe(200);
        expect(changePasswordResponse.body.success).toBe(true);

        expect((await hotelService.validateCredentials(hotel.email, "teste")).success).toBe(false);
        expect((await hotelService.validateCredentials(hotel.email, "teste2")).success).toBe(true);
    });

    test("Testa recuperacao de senha admin", async () => {
        let response = await request(app).post("/admins/password").send({
            email: admin.email
        });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);

        let lastRecoveryToken = await TokenRecuperacao.findOne({where: {admin_id: admin.id}});

        expect(lastRecoveryToken === null).toBe(false);

        let validateTokenResponse = await request(app).post("/users/recovery/validate").send({
            role: "ADMIN",
            token: lastRecoveryToken.token,
            email: admin.email
        });

        expect(validateTokenResponse.status).toBe(200);
        expect(validateTokenResponse.body.success).toBe(true);

        let changePasswordResponse = await request(app).post("/users/recovery/final").send({
            role: "ADMIN",
            token: lastRecoveryToken.token,
            email: admin.email,
            new_password: "teste2"
        });

        expect(changePasswordResponse.status).toBe(200);
        expect(changePasswordResponse.body.success).toBe(true);

        expect((await adminService.validateCredentials(admin.email, "teste")).success).toBe(false);
        expect((await adminService.validateCredentials(admin.email, "teste2")).success).toBe(true);
    });
})