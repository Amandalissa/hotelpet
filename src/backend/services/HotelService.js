import bcrypt from "bcrypt";

class HotelService {
    constructor(hotelRepository) {
        this.hotelRepository = hotelRepository;
    }

    async findById(id) {
        return await this.hotelRepository.findById(id);
    }

    async findByEmail(email) {
        return await this.hotelRepository.findByEmail(email);
    }

    async validateCredentials(email, password) {
        let hotel = await this.hotelRepository.findByEmail(email);
        
        if(hotel === null) return {success: false, content: "Hotel não encontrado"};
        if(!bcrypt.compareSync(password, hotel.senha)) return {success: false, content: "Senha incorreta"};

        return {success: true, content: hotel};
    }

    async changePassword(id, password) {
        return await this.hotelRepository.setPassword(id, password).then(() => true).catch(() => false);
    }
}

export default HotelService;