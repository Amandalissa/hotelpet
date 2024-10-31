import Hotel from "../models/hotel.js";
import RefreshToken from "../models/refresh_token.js";
import RefreshTokenHotel from "../models/refresh_token_hotel.js";
import TokenRecuperacao from "../models/token_recuperacao.js";

class HotelRepository {
    findById(id) {
        return Hotel.findByPk(id, {
            include: [
                {
                    model: TokenRecuperacao,
                    as: "token_recuperacao"
                },
                {
                    model: RefreshTokenHotel,
                    as: "refresh_token",
                    include: {
                        model: RefreshToken,
                        as: "refresh_token"
                    }
                }
            ]
        });
    }

    findByEmail(email) {
        return Hotel.findOne({
            where: {
                email: email,
            },
            include: [
                {
                    model: TokenRecuperacao,
                    as: "token_recuperacao"
                },
                {
                    model: RefreshTokenHotel,
                    as: "refresh_token",
                    include: {
                        model: RefreshToken,
                        as: "refresh_token"
                    }
                }
            ]
        });
    }

    setPassword(id, password) {
        return Hotel.update({
            senha: password,
        }, {
            where: { id: id }
        });
    }

    async updateOne(id, data) {
        let hotel = await Hotel.findByPk(id);

        return hotel.update(data);
    }
}

export default HotelRepository;