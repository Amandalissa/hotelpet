import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserData = async () => {
    const token = await AsyncStorage.getItem("token");
    const refresh = await AsyncStorage.getItem("refresh");
    const userData = await AsyncStorage.getItem("userData");

    if (token && refresh) {
        return JSON.parse(userData);
    }
}