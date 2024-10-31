import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { validateFields } from '../../hooks/validateEditFieldsAnimal';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage

const EditAnimalProfile = () => {
  const { id } = useLocalSearchParams(); // Remove o token daqui
  const [animalProfile, setAnimalProfile] = useState({
    nome: '',
    raca: '',
    sexo: true,
    temperamento: '',
    tamanho: '',
  });
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({
    nome: '',
    raca: '',
    sexo: '',
    temperamento: '',
    tamanho: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [token, setToken] = useState(null); // Adiciona estado para o token
  const router = useRouter();

  const handleBack = () => {
    router.push('/Animais/AnimalDetail?token=' + token + '&id=' + id);
  };

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem('token'); // Recupera o token
      if (storedToken) {
        setToken(storedToken); // Atualiza o estado com o token
      }
    };

    fetchToken();

    const fetchAnimalProfile = async () => {
      if (!token) return; // Verifica se o token está disponível
      try {
        const response = await axios.get(`http://localhost:8000/animais/perfil-animal/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAnimalProfile(response.data);
      } catch (error) {
        setErrorMessage(
          error.response ? error.response.data.message || 'Erro ao buscar perfil do animal.' : 'Erro ao conectar ao servidor.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAnimalProfile();
  }, [token, id]);

  const handleUpdateProfile = async () => {
    setIsSubmitting(true);
    setErrorMessage('');

    const isValid = validateFields(animalProfile, setErrors);
    if (!isValid) {
      setIsSubmitting(false);
      return;
    }

    try {
      await axios.put(`http://localhost:8000/animais/editar-animal/${id}`, animalProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      router.push('/Animais/AnimalDetail?token=' + token + '&id=' + id);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Erro ao atualizar perfil do animal.');
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Icon name="arrow-back" size={30} color="#F29629" onPress={handleBack} />
      <Text style={styles.headerText}>Editar Perfil do Animal</Text>

      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira o nome"
        placeholderTextColor="#999"
        value={animalProfile.nome}
        onChangeText={(text) => setAnimalProfile({ ...animalProfile, nome: text })}
      />
      {errors.nome ? <Text style={styles.errorText}>{errors.nome}</Text> : null}

      <Text style={styles.label}>Raça:</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira a raça"
        placeholderTextColor="#999"
        value={animalProfile.raca}
        onChangeText={(text) => setAnimalProfile({ ...animalProfile, raca: text })}
      />
      {errors.raca ? <Text style={styles.errorText}>{errors.raca}</Text> : null}

      <Text style={styles.label}>Sexo:</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          onPress={() => setAnimalProfile({ ...animalProfile, sexo: true })}
          style={[styles.radioButton, animalProfile.sexo ? styles.selectedButton : null]}
        >
          <Text style={styles.radioText}>Macho</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setAnimalProfile({ ...animalProfile, sexo: false })}
          style={[styles.radioButton, !animalProfile.sexo ? styles.selectedButton : null]}
        >
          <Text style={styles.radioText}>Fêmea</Text>
        </TouchableOpacity>
      </View>
      {errors.sexo ? <Text style={styles.errorText}>{errors.sexo}</Text> : null}

      <Text style={styles.label}>Temperamento:</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira o temperamento"
        placeholderTextColor="#999"
        value={animalProfile.temperamento}
        onChangeText={(text) => setAnimalProfile({ ...animalProfile, temperamento: text })}
      />
      {errors.temperamento ? <Text style={styles.errorText}>{errors.temperamento}</Text> : null}

      <Text style={styles.label}>Tamanho:</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira o tamanho"
        placeholderTextColor="#999"
        value={animalProfile.tamanho}
        onChangeText={(text) => setAnimalProfile({ ...animalProfile, tamanho: text })}
      />
      {errors.tamanho ? <Text style={styles.errorText}>{errors.tamanho}</Text> : null}

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
    marginBottom: 10,
    color: '#FFFFFF',
    backgroundColor: 'transparent',
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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  radioButton: {
    backgroundColor: '#3D005D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  radioText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  selectedButton: {
    backgroundColor: '#f16529',
  },
});

export default EditAnimalProfile;
