import React, { useState, useEffect } from 'react';
import { Link, useRouter } from 'expo-router';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

const SupportPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const router = useRouter();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    setIsFormValid(name.trim() !== '' && validateEmail(email) && message.trim() !== '');
  }, [name, email, message]);

  const handleSend = async () => {
    if (!isFormValid) return;

    const data = { name, email, message };
    try {
      await axios.post('http://localhost:8000/suporte-solicitacoes', data);
      router.push({pathname: "/"})
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      </View>
      <Text style={styles.title}>Suporte</Text>
      <TextInput
        style={styles.input}
        maxLength={100}
        placeholder="Nome"
        placeholderTextColor="#CCCCCC"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={[styles.input, !isValidEmail && email ? styles.inputError : null]}
        maxLength={50}
        placeholder="Email"
        placeholderTextColor="#CCCCCC"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setIsValidEmail(validateEmail(text));
        }}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        maxLength={255}
        placeholder="Digite sua mensagem aqui..."
        placeholderTextColor="#CCCCCC"
        multiline
        value={message}
        onChangeText={(text) => setMessage(text)}
      />
      <TouchableOpacity
        style={[styles.sendButton, !isFormValid && styles.disabledButton]}
        onPress={handleSend}
        disabled={!isFormValid}
      >
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3D005D',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
    width: '100%',
    height: '25%',
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 36,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#5B0A80',
    color: '#FFFFFF',
    width: '80%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    minHeight: 100,
  },
  sendButton: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#A9A9A9',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SupportPage;
