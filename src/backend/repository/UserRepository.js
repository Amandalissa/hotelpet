import Cliente from "../models/cliente.js";
import Hotel from "../models/hotel.js";
import Admin from "../models/admin.js";
import RefreshTokenAdmin from "../models/refresh_token_admin.js";
import RefreshToken from "../models/refresh_token.js";
import RefreshTokenCliente from "../models/refresh_token_cliente.js";
import RefreshTokenHotel from "../models/refresh_token_hotel.js";


class UserRepository {
    async findUserAssociatedWithRefreshToken(refreshToken) {
        const found = await Promise.all([
            Admin.findOne({
                include: {
                    model: RefreshTokenAdmin,
                    as: "refresh_token",
                    required: true,
                    include: {
                        model: RefreshToken,
                        as: "refresh_token",
                        required: true,
                        where: {
                            token: refreshToken
                        }
                    }
                }
            }),
            Cliente.findOne({
                include: {
                    model: RefreshTokenCliente,
                    as: "refresh_token",
                    required: true,
                    include: {
                        model: RefreshToken,
                        as: "refresh_token",
                        required: true,
                        where: {
                            token: refreshToken
                        }
                    }
                }
            }),
            Hotel.findOne({
                include: {
                    model: RefreshTokenHotel,
                    as: "refresh_token",
                    required: true,
                    include: {
                        model: RefreshToken,
                        as: "refresh_token",
                        required: true,
                        where: {
                            token: refreshToken
                        }
                    }
                }
            })
        ]);
        
        let user = found.filter((i) => i !== null);

        return user.length === 0 ? null : user[0];
    }
}

export default UserRepository;