import Admin from "../models/admin.js";
import RefreshToken from "../models/refresh_token.js";
import RefreshTokenAdmin from "../models/refresh_token_admin.js";
import TokenRecuperacao from "../models/token_recuperacao.js";

class AdminRepository {

    findById(id) {
        return Admin.findByPk(id, {
            include: [
                {
                    model: TokenRecuperacao,
                    as: "token_recuperacao"
                },
                {
                    model: RefreshTokenAdmin,
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
        return Admin.findOne({
            where: {
                email: email,
            },
            include: [
                {
                    model: TokenRecuperacao,
                    as: "token_recuperacao"
                },
                {
                    model: RefreshTokenAdmin,
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
        return Admin.update({ 
            senha: password ,
        }, {
            where: { id: id }
        });
    }

    async updateOne(id, data) {
        let admin = await Admin.findByPk(id);

        return admin.update(data);
    }
}

export default AdminRepository;