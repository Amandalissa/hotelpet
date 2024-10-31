import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import { Picker } from 'react-native-web';
import { Link, useRouter } from 'expo-router';
import AuthService from '../services/AuthService';
import { registerUserData } from '../utils/registerUserData';


const authService = new AuthService();

const LoginScreen = () => {
    const [selectedRole, setSelectedRole] = useState("cliente");
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loginResult, setLoginResult] = useState();

    const router = useRouter();

    const login = () => {
        authService.login(selectedRole, email, password).then((response) => {
            if (response.data.success) {
                registerUserData(response.data.content.token, response.data.content.refresh);

                setLoginResult();

                router.push({
                    pathname: "/home",
                    params: { token: response.data.content.token },
                });

            }
        }).catch((error) => {
            console.log(error);
            setLoginResult(error.response.data.content);
        });
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={{ marginBottom: 60, width: '80%', height: 200, display: 'flex', flexDirection: 'column' }}>
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/images/logo.png')} style={styles.logo} />
                </View>

                <Picker
                    selectedValue={selectedRole}
                    onValueChange={(itemValue) => setSelectedRole(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Cliente" value="cliente" />
                    <Picker.Item label="Hotel" value="hotel" />
                    <Picker.Item label="Admin" value="admin" />
                </Picker>
            </View>

            <View style={styles.formContainer}>
                <Text style={styles.label}>Email:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu e-mail"
                    placeholderTextColor="#A8A8A8"
                    onChange={(event) => setEmail(event.target.value)}
                />

                <Text style={styles.label}>Senha:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Confirme a sua senha"
                    placeholderTextColor="#A8A8A8"
                    secureTextEntry
                    onChange={(event) => setPassword(event.target.value)}
                />

                <Text style={{ color: '#ffc9cf', marginBottom: 10 }}>{loginResult}</Text>

                <TouchableOpacity style={styles.button} onPress={() => login()}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                <Link style={styles.forgotPassword} href={{ pathname: "/recovery", params: { role: selectedRole } }}>Esqueci minha senha</Link>

                <Link style={styles.createAccount} href={{ pathname: "/Clientes/ClientRegister" }}>Não possui uma conta?</Link>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#3D005D',
        justifyContent: 'center',
        padding: 20
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
        height: '80%',
    },
    logo: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    title: {
        fontSize: 36,
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
    formContainer: {
        width: '100%'
    },
    label: {
        color: '#FFFFFF',
        fontSize: 16,
        marginBottom: 8
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#FFFFFF',
        paddingVertical: 10,
        marginBottom: 20,
        color: '#FFFFFF',
        backgroundColor: 'transparent',
        outlineStyle: 'none'
    },
    button: {
        backgroundColor: '#f16529',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold'
    },
    forgotPassword: {
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 20
    },
    createAccount: {
        color: '#FFFFFF',
        textAlign: 'center'
    },
    picker: {
        alignSelf: 'flex-end',
        outlineStyle: 'none',
        width: '30%',
        height: 50,
        color: 'gray',
        backgroundColor: 'transparent',
        border: 'none'
    },
});

export default LoginScreen;
