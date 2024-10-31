import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

class AuthService {
    login(role, email, password) {
        let roleToPath = {
            "CLIENTE": "clientes",
            "HOTEL": "hoteis",
            "ADMIN": "admins"
        };

        return axios.post(`/${roleToPath[role.toUpperCase()]}/login`, {
            email: email,
            password: password
        });
    }

    getNewAccessToken(refreshToken) {
        return axios.get("/auth/refresh", {
            headers: {
                Authorization: "Bearer " + refreshToken
            }
        });
    }

    async logout() {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("refresh");
        await AsyncStorage.removeItem("userData");
    }
}

export default AuthService;