import bcrypt from "bcrypt";

class AdminService {
    constructor(adminRepository) {
        this.adminRepository = adminRepository;
    }

    async findById(id) {
        return await this.adminRepository.findById(id);
    }

    async findByEmail(email) {
        return await this.adminRepository.findByEmail(email);
    }

    async validateCredentials(email, password) {
        let admin = await this.adminRepository.findByEmail(email);
        
        if(admin === null) return {success: false, content: "Administrador não encontrado"};
        if(!bcrypt.compareSync(password, admin.senha)) return {success: false, content: "Senha incorreta"};

        return {success: true, content: admin};
    }

    async changePassword(id, password) {
        return await this.adminRepository.setPassword(id, password).then(() => true).catch(() => false);
    }
}

export default AdminService;