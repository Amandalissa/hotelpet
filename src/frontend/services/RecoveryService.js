import axios from "axios";

class RecoveryService {
    verifyToken(role, email, token) {
        return axios.post("/users/recovery/validate", {
            role: role.toUpperCase(),
            token: token,
            email: email
        });
    }

    changePassword(role, email, token, password) {
        return axios.post("/users/recovery/final", {
            role: role.toUpperCase(),
            token: token,
            email: email,
            new_password: password
        });
    }

    sendPasswordChangeRequest(role, email) {
        let roleToPath = {
            "CLIENTE": "clientes",
            "HOTEL": "hoteis",
            "ADMIN": "admins"
        };

        return axios.post(`/${roleToPath[role.toUpperCase()]}/password`, {
            email: email
        });
    }
}

export default RecoveryService;