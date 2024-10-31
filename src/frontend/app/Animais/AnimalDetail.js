import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AnimalDetail = () => {
  const { id } = useLocalSearchParams();
  const [animalDetail, setAnimalDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [token, setToken] = useState('');

  const router = useRouter();

  const handleBack = () => {
    router.push('/Animais/AnimalsList');
  };

  const handleEditAnimal = () => {
    router.push({
      pathname: '/Animais/EditAnimalProfile',
      params: { id: id }
    });
  };

  const handleDeleteAnimal = async () => {
    try {
      const response = await axios.delete(`http://localhost:8000/animais/deletar-animal/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 204) {
        alert('Animal deletado com sucesso!');
        handleBack();
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Erro ao deletar o animal.');
      } else {
        setErrorMessage('Erro ao conectar ao servidor.');
      }
    }
  };

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
          fetchAnimalDetail(storedToken);
        }
      } catch (error) {
        setErrorMessage('Erro ao recuperar o token.');
      }
    };

    fetchToken();
  }, []);

  const fetchAnimalDetail = async (token) => {
    try {
      const response = await axios.get(`http://localhost:8000/animais/perfil-animal/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAnimalDetail(response.data);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Erro ao buscar detalhes do animal.');
      } else {
        setErrorMessage('Erro ao conectar ao servidor.');
      }
    } finally {
      setLoading(false);
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
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Icon name="arrow-back" size={30} color="#F29629" onPress={handleBack} />
        <Text style={styles.header}>Detalhes do Animal</Text>
        <TouchableOpacity onPress={handleEditAnimal}>
          <Icon name="create" size={30} color="#F29629" />
        </TouchableOpacity>
      </View>
      <View style={styles.iconContainer}>
        <Icon name="paw" size={150} color="#F29629" />
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.info}>{animalDetail.nome}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Raça:</Text>
        <Text style={styles.info}>{animalDetail.raca}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Sexo:</Text>
        <Text style={styles.info}>{animalDetail.sexo ? 'Macho' : 'Fêmea'}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Temperamento:</Text>
        <Text style={styles.info}>{animalDetail.temperamento}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Tamanho:</Text>
        <Text style={styles.info}>{animalDetail.tamanho}</Text>
      </View>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAnimal}>
        <Text style={styles.deleteButtonText}>Deletar pet</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#3D005D',
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
    textAlign: 'center',
    fontWeight: 'bold',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  label: {
    fontSize: 20,
    marginVertical: 5,
    color: '#f2f2f2',
    fontWeight: 'bold',
  },
  info: {
    fontSize: 18,
    marginLeft: 10,
    marginVertical: 5,
    color: '#f2f2f2',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  deleteButton: {
    backgroundColor: '#F29629',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AnimalDetail;
