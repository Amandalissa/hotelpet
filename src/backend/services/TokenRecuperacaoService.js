import { recoveryTokenGenerator } from "../helpers/recoveryTokenGenerator.js";
import { roleToService } from "../helpers/roleServiceMapper.js";

class TokenRecuperacaoService {
    constructor(tokenRecuperacaoRepository) {
        this.tokenRecuperacaoRepository = tokenRecuperacaoRepository;
    }

    async getTokenRecuperacaoById(id) {
        return await this.tokenRecuperacaoRepository.findById(id);
    }

    async createTokenRecuperacao(data) {
        data["token"] = recoveryTokenGenerator();

        let roleToField = {
            "CLIENTE": "cliente_id",
            "HOTEL": "hotel_id",
            "ADMIN": "admin_id"
        };
        let user = await roleToService(data.nome_papel).findById(data[roleToField[data.nome_papel]]);

        if(user.token_recuperacao) {
            await this.tokenRecuperacaoRepository.deleteOne(user.token_recuperacao.id);
        }
        
        return await this.tokenRecuperacaoRepository.createOne(data);
    }

    async getTokenRecuperacaoUserId(id) {
        let userId = await this.tokenRecuperacaoRepository.getUserId(id);

        return userId;
    }

    async deleteTokenRecuperacaoById(id) {
        let success = await this.tokenRecuperacaoRepository.deleteOne(id).then(() => true).catch(() => false);

        return success;
    }
}

export default TokenRecuperacaoService;