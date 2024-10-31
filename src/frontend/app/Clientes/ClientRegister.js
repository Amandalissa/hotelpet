import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

//hooks
import { validationClientRegister } from '../../hooks/validationClientRegister';

const ClientRegister = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cpf, setCpf] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const formatCPF = (value) => {
    const numbers = value.replace(/\D/g, '');
    const formattedCpf = numbers
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
    return formattedCpf;
  };

  const handleCpfChange = (value) => {
    const formattedCpf = formatCPF(value);
    setCpf(formattedCpf);
  };

  const removeCPFFormatting = (formattedCpf) => {
    return formattedCpf.replace(/\D/g, '');
  };

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d)(\d{4})$/, '$1-$2');
    } else {
      return numbers.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d)(\d{4})(\d)/, '$1$2-$3');
    }
  };

  const handlePhoneChange = (value) => {
    const formattedPhone = formatPhone(value);
    setPhone(formattedPhone);
  };

  const removePhoneFormatting = (formattedPhone) => {
    return formattedPhone.replace(/\D/g, '');
  };

  const handleNext = () => {

    if (!validationClientRegister(name, email, phone, cpf, password, setErrorMessage)) {
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('As senhas precisam ser iguais.');
      return;
    }

    const unformattedCpf = removeCPFFormatting(cpf);
    const unformattedPhone = removePhoneFormatting(phone);

    router.push({
      pathname: "/Clientes/AddressRegister", params: {
        name: name,
        phone: unformattedPhone,
        email: email,
        cpf: unformattedCpf,
        password: password
      }
    })

  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Cadastre-se para garantir o melhor cuidado para seu pet!</Text>

      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome de usuário"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail do usuário"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Celular:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu número"
        value={phone}
        onChangeText={handlePhoneChange}
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>CPF:</Text>
      <TextInput
        style={styles.input}
        placeholder="CPF do usuário"
        value={cpf}
        onChangeText={handleCpfChange}
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Senha:</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira sua senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Confirmação de senha:</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirme a sua senha"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Próximo</Text>
      </TouchableOpacity>

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      <TouchableOpacity style={styles.loginButton}>
        <Link href={{ pathname: "/login" }} style={styles.loginText}>Já possui uma conta?</Link>
      </TouchableOpacity>
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
    marginBottom: 5
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
    fontSize: 16,
    fontWeight: 'bold'
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  loginButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  loginText: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20
  },
});

export default ClientRegister;