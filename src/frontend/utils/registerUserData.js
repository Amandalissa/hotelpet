import { Buffer } from "buffer";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const registerUserData = (token, refresh) => {
    let data = JSON.parse(Buffer.from(token.split('.')[1], "base64").toString());

    AsyncStorage.setItem("userData", JSON.stringify(data));
    AsyncStorage.setItem("token", token);
    AsyncStorage.setItem("refresh", refresh);
}