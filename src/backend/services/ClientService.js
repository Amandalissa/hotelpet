import bcrypt from "bcrypt";

class ClientService {
    constructor(clientRepository, authService) {
        this.clientRepository = clientRepository;
        this.authService = authService;
    }

    async findById(id) {
        return await this.clientRepository.findById(id);
    }

    async findByEmail(email) {
        return await this.clientRepository.findByEmail(email);
    }

    async validateCredentials(email, password) {
        if (!email) {
            throw new Error("É necessário passar um email para fazer o login");
        }

        if (!password) {
            throw new Error("É necessário passar uma senha para fazer o login");
        }

        let client = await this.clientRepository.findByEmail(email);

        if (client === null) return { success: false, content: "Cliente não encontrado" };

        if (!bcrypt.compareSync(password, client.senha)) return { success: false, content: "Senha incorreta" };

        return { success: true, content: client };
    }

    async changePassword(id, password) {
        return await this.clientRepository.setPassword(id, password).then(() => true).catch(() => false);
    }

    async clientRegister(clientData, enderecoData) {
        const existClient = await this.clientRepository.findByEmail(clientData.email);
        if (existClient) {
            throw new Error("Cliente já cadastrado com esse e-mail.");
        }

        clientData.senha = await this.authService.generateHashFromPassword(clientData.senha);

        try {
            const { client, endereco } = await this.clientRepository.createNewClientWithEndereco(clientData, enderecoData);
            return { client, endereco };
        } catch (error) {
            throw new Error(`Erro ao criar cliente ou endereço: ${error.message}`);
        }
    }

    getClientProfile = async (clientId) => {
        return await this.clientRepository.findById(clientId);

    }

    async updateClient(id, clientData, enderecoData) {
        const client = await this.clientRepository.findById(id);
        if (!client) {
            throw new Error("Cliente não encontrado.");
        }

        clientData.senha = await this.authService.generateHashFromPassword(clientData.senha);

        const updatedClient = await this.clientRepository.updateOne(id, clientData);

        if (enderecoData) {
            const updatedEndereco = await this.clientRepository.updateEndereco(client.endereco_id, enderecoData);
            return { updatedClient, updatedEndereco };
        }

        return updatedClient;
    }
}

export default ClientService;