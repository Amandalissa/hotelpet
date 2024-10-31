import { roleToService } from "../helpers/roleserviceMapper.js";

class UserController {
    constructor(tokenRecuperacaoService, authService) {
        this.tokenRecuperacaoService = tokenRecuperacaoService;
        this.authService = authService;
    }

    verifyRecoveryToken = async (request, response) => {
        let service = roleToService(request.body.role);
        let user = await service.findByEmail(request.body.email);

        if(!user.token_recuperacao) return response.status(400).json({success: false, content: "Token de recuperação não encontrado."});
        if(user.token_recuperacao.token !== request.body.token) return response.status(401).json({success: false, content: "Token de recuperação inválido."});

        return response.json({success: true, content: null});
    }
    
    changePassword = async (request, response) => {
        let service = roleToService(request.body.role);
        let user = await service.findByEmail(request.body.email);

        if(!user.token_recuperacao) return response.status(400).json({success: false, content: "Token de recuperação não encontrado."});
        if(user.token_recuperacao.token !== request.body.token) return response.status(401).json({success: false, content: "Token de recuperação inválido."});

        this.authService.generateHashFromPassword(request.body.new_password).then(async (hash) => {
            let success = await roleToService(request.body.role).changePassword(user.id, hash);
            if(success) await this.tokenRecuperacaoService.deleteTokenRecuperacaoById(user.token_recuperacao.id);

            return response.status(success ? 200 : 500).json({success: success, content: success ? null : "Erro ao alterar senha do usuário."});
        }).catch(() => {
            return response.status(500).json({success: false, content: "Erro ao processar senha do usuário."});
        });
    }
}

export default UserController;