import Admin from "../models/admin.js";
import Cliente from "../models/cliente.js";
import Hotel from "../models/hotel.js";


const models = {
    "CLIENTE": Cliente,
    "ADMIN": Admin,
    "HOTEL": Hotel
};

export const roleToModel = (role) => {
    return Object.keys(models).includes(role) ? models[role] : null; 
}

export const modelToRole = (model) => {
    let keys = Object.keys(models);
    let values = Object.values(models);
    let found = values.find((value) => model instanceof value);
    
    return found ? keys[values.indexOf(found)] : null; 
}