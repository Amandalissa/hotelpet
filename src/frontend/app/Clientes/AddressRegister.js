import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import AuthService from '../../services/AuthService';
import { registerUserData } from '../../utils/registerUserData';

const AddressRegister = () => {

  const router = useRouter();

  const { name, email, phone, cpf, password } = useLocalSearchParams();
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [number, setNumber] = useState('');
  const [cep, setCep] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleBack = () => {
    router.back({
      name,
      email,
      phone,
      cpf,
      password,
    });
  };

  const handleRegister = async () => {

    if (!state || !city || !street || !neighborhood || !number || !cep) {
      setErrorMessage('Todos os campos devem ser preenchidos.');
      return;
    }

    try {
      const clientData = {
        nome: name,
        celular: phone,
        email: email,
        cpf: cpf,
        senha: password,
      };

      const addressData = {
        estado: state,
        cidade: city,
        rua: street,
        bairro: neighborhood,
        numero: number,
        cep: cep
      };

      await axios.post('http://localhost:8000/clientes/cadastrar-cliente', {
        ...clientData,
        enderecoData: addressData,
      });
      alert('Cadastro realizado com sucesso!');

      const authService = new AuthService();
      const response = await authService.login("cliente", email, password);
      console.log("Resposta do login:", response);

      if (response.data.success) {
        registerUserData(response.data.content.token, response.data.content.refresh);

        alert('Cadastro e login realizados com sucesso!');

        router.push({ pathname: "/Clientes/AnimalRegister" });
      } else {
        setErrorMessage('Erro ao fazer login após o cadastro.');
      }

    } catch (error) {
      if (error.response) {
        if (error.response.data.content === 'Cliente já cadastrado com esse e-mail.') {
          setErrorMessage('Email já existe.');
        } else {
          setErrorMessage(error.response.data.content || 'Erro ao cadastrar. Tente novamente.');
        }
      } else {
        setErrorMessage('Erro ao conectar ao servidor. Tente novamente.');
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Icon name="arrow-back" size={30} color="#FFFFFF" />
      </TouchableOpacity>

      <Text style={styles.headerText}>Informe seu Endereço</Text>

      <Text style={styles.label}>Estado:</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira seu estado"
        value={state}
        onChangeText={setState}
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Cidade:</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira sua cidade"
        value={city}
        onChangeText={setCity}
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Rua:</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira sua rua"
        value={street}
        onChangeText={setStreet}
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Bairro:</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira seu bairro"
        value={neighborhood}
        onChangeText={setNeighborhood}
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Número:</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira o número"
        value={number}
        onChangeText={setNumber}
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>CEP:</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira seu cep"
        value={cep}
        onChangeText={setCep}
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#3D005D',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  label: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    paddingVertical: 10,
    marginBottom: 20,
    color: '#FFFFFF',
    backgroundColor: 'transparent',
    outlineStyle: 'none',
  },
  button: {
    backgroundColor: '#f16529',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold'
  },
});

export default AddressRegister;