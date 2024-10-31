import { accessTokenContentGenerator } from "../helpers/accessTokenContentGenerator.js";

class ClienteController {
    
    constructor(adminService, authService, emailService, tokenRecuperacaoService) {
        this.adminService = adminService;
        this.authService = authService;
        this.emailService = emailService;
        this.tokenRecuperacaoService = tokenRecuperacaoService;
    }

    login = async (request, response) => {
        let validationResult = await this.adminService.validateCredentials(request.body.email, request.body.password);

        if(!validationResult.success) {
            return response.status(401).json(validationResult); 
        }

        return response.json({success: true, content: await this.authService.generateAuthTokens(validationResult.content)});
    }

    requestPasswordChange = async (request, response) => {
        let admin = await this.adminService.findByEmail(request.body.email);

        if(!admin) {
            return response.status(404).json({success: false, content: "Administrador não cadastrado."});
        }

        let data = {
            "nome_papel": "ADMIN",
            "admin_id": admin.id
        }

        this.tokenRecuperacaoService.createTokenRecuperacao(data).then(async (tokenRecuperacao) => {
            let responseEmail = await this.emailService.send(request.body.email, "Woofing - Solicitação de nova senha", `www.google.com\n\n ${tokenRecuperacao.token}`);
            
            if(responseEmail.messageId != null) {
                return response.json({success: true, content: null});
            }
            
            return response.status(500).json({success: false, content: "Erro ao enviar email de recuperação."});
        }).catch(() => {
            return response.status(500).json({success: false, content: "Erro ao gerar token de recuperação."});
        });
    }
}

export default ClienteController;