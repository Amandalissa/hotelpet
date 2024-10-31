import TokenRecuperacao from "../models/token_recuperacao.js";

class TokenRecuperacaoRepository {

    createOne(data) {
        return TokenRecuperacao.create(data);
    }

    findById(id) {
        return TokenRecuperacao.findByPk(id);
    }

    async getUserId(id) {
        let token = await TokenRecuperacao.findByPk(id);

        switch(token.nome_papel) {
            case "CLIENTE":
                return token.cliente_id;
            case "HOTEL":
                return token.hotel_id;
            case "ADMIN":
                return token.admin_id;
            default:
                return null;
        }
    }

    async deleteOne(id) {
        let token = await TokenRecuperacao.findByPk(id);

        return token.destroy();
    }

    async updateOne(id, data) {
        let token = await TokenRecuperacao.findByPk(id);

        return token.update(data);
    }
}

export default TokenRecuperacaoRepository;