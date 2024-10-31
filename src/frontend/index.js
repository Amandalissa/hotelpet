import "expo-router/entry";
import axios from "axios";
import AuthService from "./services/AuthService";
import { registerUserData } from "./utils/registerUserData";


axios.defaults.baseURL = "http://localhost:8000";

const authService = new AuthService();

axios.interceptors.response.use(async (response) => {
    return response;
}, async (error) => {
    if(error.response.data.authReject === "[INVALID-TOKEN]") {
        let newToken = await authService.getNewAccessToken(SecureStore.getItem("refreshToken"));

        if(newToken.data.success) {
            registerUserData(newToken.data.content.token, newToken.data.content.refresh);

        }
        
        return Promise.reject(newToken.data.content);
    }

    return Promise.reject(error);
});