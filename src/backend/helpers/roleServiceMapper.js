import AdminService from "../services/AdminService.js";
import HotelService from "../services/HotelService.js";
import ClientService from "../services/ClientService.js";
import ClientRepository from "../repository/ClientRepository.js";
import AdminRepository from "../repository/AdminRepository.js";
import HotelRepository from "../repository/HotelRepository.js";
import AuthService from "../services/AuthService.js";
import UserRepository from "../repository/UserRepository.js";
import RefreshTokenRepository from "../repository/RefreshTokenRepository.js";

const services = {
    "CLIENTE": new ClientService(new ClientRepository, new AuthService(new UserRepository, new RefreshTokenRepository)),
    "ADMIN": new AdminService(new AdminRepository),
    "HOTEL": new HotelService(new HotelRepository)
};

export const roleToService = (role) => {
    return Object.keys(services).includes(role) ? services[role] : null; 
}