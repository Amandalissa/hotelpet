import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AnimalRegister = () => {
  const router = useRouter();

  const [animalProfile, setAnimalProfile] = useState({
    nome: '',
    tamanho: '',
    sexo: true,
    temperamento: '',
    raca: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
        } else {
          console.log('Token não encontrado');
          router.push('/login');
        }
      } catch (error) {
        console.error('Erro ao obter o token:', error);
      }
    };

    fetchToken();
  }, []);

  const handleRegisterAnimal = async () => {
    if (!animalProfile.nome || !animalProfile.tamanho || animalProfile.sexo === null || !animalProfile.temperamento || !animalProfile.raca) {
      setErrorMessage('Preencha todos os campos.');
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post('http://localhost:8000/animais/cadastrar-animal', animalProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Animal cadastrado com sucesso!');
      router.push({ pathname: "/home/Profile" });

    } catch (error) {
      if (error.response) {
        console.log(error);
        setErrorMessage(error.response.data.content || 'Erro ao cadastrar o animal. Tente novamente.');
      } else {
        setErrorMessage('Erro ao conectar ao servidor. Tente novamente.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterLater = () => {
    router.push('/home/Profile?token=' + token);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8A2BE2" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Registrar Animal</Text>

      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira o nome"
        value={animalProfile.nome}
        onChangeText={(text) => setAnimalProfile({ ...animalProfile, nome: text })}
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Tamanho:</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira o tamanho"
        value={animalProfile.tamanho}
        onChangeText={(text) => setAnimalProfile({ ...animalProfile, tamanho: text })}
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Sexo:</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          onPress={() => setAnimalProfile({ ...animalProfile, sexo: true })}
          style={[styles.radioButton, animalProfile.sexo ? styles.selectedButton : styles.defaultButton]}
        >
          <Text style={styles.radioText}>Macho</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setAnimalProfile({ ...animalProfile, sexo: false })}
          style={[styles.radioButton, !animalProfile.sexo ? styles.selectedButton : styles.defaultButton]}
        >
          <Text style={styles.radioText}>Fêmea</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Temperamento:</Text>
      <TextInput
        style={styles.input}
        placeholder="Descreva o temperamento"
        value={animalProfile.temperamento}
        onChangeText={(text) => setAnimalProfile({ ...animalProfile, temperamento: text })}
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Raça:</Text>
      <TextInput
        style={styles.input}
        placeholder="Informe a raça"
        value={animalProfile.raca}
        onChangeText={(text) => setAnimalProfile({ ...animalProfile, raca: text })}
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.button} onPress={handleRegisterAnimal} disabled={isSubmitting}>
        <Text style={styles.buttonText}>Cadastrar Animal</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.laterButton} onPress={handleRegisterLater}>
        <Text style={styles.laterButtonText}>Cadastrar mais tarde</Text>
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
  laterButton: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    borderColor: '#f16529',
    borderWidth: 1,
  },
  laterButtonText: {
    color: '#f16529',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  radioButton: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  defaultButton: {
    backgroundColor: 'transparent',
  },
  selectedButton: {
    backgroundColor: '#f16529',
  },
  radioText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default AnimalRegister;
