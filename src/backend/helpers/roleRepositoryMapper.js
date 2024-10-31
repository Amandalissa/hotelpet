import AdminRepository from "../repository/AdminRepository.js";
import ClientRepository from "../repository/ClientRepository.js";
import HotelRepository from "../repository/HotelRepository.js";


const repositories = {
    "CLIENTE": new ClientRepository,
    "ADMIN": new AdminRepository,
    "HOTEL": new HotelRepository
};

export const roleRepository = (role) => {
    return Object.keys(repositories).includes(role) ? repositories[role] : null; 
}