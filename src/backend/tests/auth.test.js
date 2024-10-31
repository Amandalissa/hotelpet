import ClienteFactory from "../factories/cliente_factory";
import "dotenv/config";
import AuthService from "../services/AuthService";
import request from "supertest";
import createServer from "../server";
import RefreshToken from "../models/refresh_token";
import HotelFactory from "../factories/hotel_factory";
import AdminFactory from "../factories/admin_factory";
import RefreshTokenRepository from "../repository/RefreshTokenRepository";
import UserRepository from "../repository/UserRepository";

const app = await createServer();
const authService = new AuthService(new UserRepository, new RefreshTokenRepository);

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

describe('Grupo de autenticação', () => {
    test('Testa sucesso autenticação do cliente', async () => {
        const requestData = {
            email: client.email,
            password: "teste"
        };

        const response = await request(app).post("/clientes/login").send(requestData);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
    });

    test('Testa sucesso autenticação do hotel', async () => {
        const requestData = {
            email: hotel.email,
            password: "teste"
        };

        const response = await request(app).post("/hoteis/login").send(requestData);
        
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
    });

    test('Testa sucesso autenticação do administrador', async () => {
        const requestData = {
            email: admin.email,
            password: "teste"
        };

        const response = await request(app).post("/admins/login").send(requestData);
        
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
    });
});