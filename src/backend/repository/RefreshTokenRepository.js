import RefreshToken from "../models/refresh_token.js";
import RefreshTokenAdmin from "../models/refresh_token_admin.js";
import RefreshTokenCliente from "../models/refresh_token_cliente.js";
import RefreshTokenHotel from "../models/refresh_token_hotel.js";

class RefreshTokenRepository {
    findById(id) {
        return RefreshToken.findByPk(id);
    }

    async createOne(token, role) {
        let roleToRefreshToken = {
            "CLIENTE": RefreshTokenCliente,
            "HOTEL": RefreshTokenHotel,
            "ADMIN": RefreshTokenAdmin,
        };
        let refreshToken = await RefreshToken.create({
            token: token
        });

        await roleToRefreshToken[role].create({
            refresh_token_id: refreshToken.id
        });

        return refreshToken;
    }
}

export default RefreshTokenRepository;