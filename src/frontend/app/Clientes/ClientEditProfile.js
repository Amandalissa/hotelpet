import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { validateFields } from '../../hooks/validateEditProfile';

const EditClientProfile = () => {
  const { token } = useLocalSearchParams();
  const [clientProfile, setClientProfile] = useState({
    nome: '',
    celular: '',
    email: '',
    cpf: '',
    senha: '',
  });
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    nome: '',
    celular: '',
    email: '',
    cpf: '',
    senha: '',
  });
  const router = useRouter();

  const handleBack = () => {
    router.push('/Clientes/ClientProfile');
  };

  const storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('@token', token);
    } catch (error) {
      console.error('Erro ao armazenar o token', error);
    }
  };

  const retrieveToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      return storedToken;
    } catch (error) {
      console.error('Erro ao recuperar o token', error);
    }
  };

  useEffect(() => {
    const fetchClientProfile = async () => {
      try {
        const storedToken = await retrieveToken();
        const response = await axios.get('http://localhost:8000/clientes/perfil', {
          headers: {
            Authorization: `Bearer ${storedToken || token}`,
          },
        });
        setClientProfile({
          ...response.data.content,
          senha: '',
        });
      } catch (error) {
        if (error.response) {
          setErrorMessage(error.response.data.message || 'Erro ao buscar perfil.');
        } else {
          setErrorMessage('Erro ao conectar ao servidor.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchClientProfile();
  }, [token]);

  const handleUpdateProfile = async () => {
    if (!validateFields(clientProfile, setErrors)) return;

    setIsSubmitting(true);
    try {
      const storedToken = await retrieveToken();
      await axios.put(`http://localhost:8000/clientes/editar-cliente/${clientProfile.id}`, clientProfile, {
        headers: {
          Authorization: `Bearer ${storedToken || token}`,
        },
      });
      storeToken(storedToken || token);
      router.push('/Clientes/ClientProfile');
    } catch (error) {
      setErrorMessage('Erro ao atualizar perfil.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8A2BE2" />
      </View>
    );
  }

  if (errorMessage) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Icon name="arrow-back" size={30} color="#F29629" onPress={handleBack} />
      <Text style={styles.headerText}>Editar Perfil</Text>

      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira o nome"
        placeholderTextColor="#999"
        value={clientProfile.nome}
        onChangeText={(text) => setClientProfile({ ...clientProfile, nome: text })}
      />
      <Text style={styles.errorText}>{errors.nome}</Text>

      <Text style={styles.label}>Celular:</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira o celular"
        placeholderTextColor="#999"
        value={clientProfile.celular}
        onChangeText={(text) => setClientProfile({ ...clientProfile, celular: text })}
      />
      <Text style={styles.errorText}>{errors.celular}</Text>

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira o email"
        placeholderTextColor="#999"
        value={clientProfile.email}
        onChangeText={(text) => setClientProfile({ ...clientProfile, email: text })}
      />
      <Text style={styles.errorText}>{errors.email}</Text>

      <Text style={styles.label}>CPF:</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira o CPF"
        placeholderTextColor="#999"
        value={clientProfile.cpf}
        onChangeText={(text) => setClientProfile({ ...clientProfile, cpf: text })}
      />
      <Text style={styles.errorText}>{errors.cpf}</Text>

      <Text style={styles.label}>Senha:</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira a senha"
        placeholderTextColor="#999"
        secureTextEntry
        value={clientProfile.senha}
        onChangeText={(text) => setClientProfile({ ...clientProfile, senha: text })}
      />
      <Text style={styles.errorText}>{errors.senha}</Text>

      <TouchableOpacity style={styles.button} onPress={handleUpdateProfile} disabled={isSubmitting}>
        <Text style={styles.buttonText}>Atualizar</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3D005D',
  },
  errorContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default EditClientProfile;
