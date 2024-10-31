import { accessTokenContentGenerator } from "../helpers/accessTokenContentGenerator.js";

class ClienteController {

    constructor(clientService, authService, emailService, tokenRecuperacaoService) {
        this.clientService = clientService;
        this.authService = authService;
        this.emailService = emailService;
        this.tokenRecuperacaoService = tokenRecuperacaoService;
    }

    login = async (request, response) => {
        let validationResult = await this.clientService.validateCredentials(request.body.email, request.body.password);

        if (!validationResult.success) {
            return response.status(401).json(validationResult);
        }

        return response.json({ success: true, content: await this.authService.generateAuthTokens(validationResult.content) });
    }

    requestPasswordChange = async (request, response) => {
        let cliente = await this.clientService.findByEmail(request.body.email);

        if (!cliente) {
            return response.status(404).json({ success: false, content: "Cliente não cadastrado." });
        }

        let data = {
            nome_papel: "CLIENTE",
            cliente_id: cliente.id
        }

        this.tokenRecuperacaoService.createTokenRecuperacao(data).then(async (tokenRecuperacao) => {
            let responseEmail = await this.emailService.send(request.body.email, "Woofing - Solicitação de nova senha", `www.google.com\n\n ${tokenRecuperacao.token}`);

            if (responseEmail.messageId != null) {
                return response.json({ success: true, content: null });
            }

            return response.status(500).json({ success: false, content: "Erro ao enviar email de recuperação." });
        }).catch(() => {
            return response.status(500).json({ success: false, content: "Erro ao gerar token de recuperação." });
        });
    }

    createClient = async (request, response) => {
        try {
            const { nome, celular, email, cpf, senha, enderecoData } = request.body;

            let { client, endereco } = await this.clientService.clientRegister(
                { nome, email, celular, cpf, senha },
                enderecoData
            );

            return response.status(201).json({ success: true, content: { client, endereco } });
        } catch (error) {
            return response.status(400).json({ success: false, content: error.message });
        }
    }

    getClientProfile = async (request, response) => {
        try {
            const clientId = request.user.id;
            const clientProfile = await this.clientService.getClientProfile(clientId);

            if (!clientProfile) {
                return response.status(404).json({ success: false, content: "Cliente não encontrado." });
            }

            return response.status(200).json({ success: true, content: clientProfile });
        } catch (error) {
            return response.status(500).json({ success: false, content: "Erro ao buscar perfil do cliente." });
        }
    }

    updateClient = async (request, response) => {
        try {
            const { id } = request.params;
            const { nome, celular, email, cpf, senha, enderecoData } = request.body;

            let updatedClient = await this.clientService.updateClient(id, { nome, celular, email, cpf, senha }, enderecoData);

            return response.status(200).json({ success: true, content: updatedClient });
        } catch (error) {
            return response.status(400).json({ success: false, content: error.message });
        }
    }
}

export default ClienteController;