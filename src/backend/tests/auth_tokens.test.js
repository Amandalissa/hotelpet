import ClienteFactory from "../factories/cliente_factory";
import "dotenv/config";
import AuthService from "../services/AuthService";
import request from "supertest";
import createServer from "../server";
import RefreshToken from "../models/refresh_token";
import HotelFactory from "../factories/hotel_factory";
import AdminFactory from "../factories/admin_factory";
import RefreshTokenService from "../services/RefreshTokenService";
import RefreshTokenRepository from "../repository/RefreshTokenRepository";
import UserRepository from "../repository/UserRepository";

const app = await createServer();
const authService = new AuthService(new UserRepository, new RefreshTokenRepository);
const refreshTokenService = new RefreshTokenService(new RefreshTokenRepository());

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

describe('Grupo de renovação de token de acesso', () => {
    test('Testa sucesso recuperacao de token do cliente', async () => {
        const token = "Bearer " + await refreshTokenService.getRefreshTokenValueById(client.refresh_token_id);
        const response = await request(app).get("/auth/refresh").set("authorization", token).send();
        
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
    });

    test('Testa sucesso recuperacao de token do hotel', async () => {
        const token = "Bearer " + await refreshTokenService.getRefreshTokenValueById(hotel.refresh_token_id);
        const response = await request(app).get("/auth/refresh").set("authorization", token).send();
        
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
    });

    test('Testa sucesso recuperacao de token do admin', async () => {
        const token = "Bearer " + await refreshTokenService.getRefreshTokenValueById(admin.refresh_token_id);
        const response = await request(app).get("/auth/refresh").set("authorization", token).send();
        
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
    });
});