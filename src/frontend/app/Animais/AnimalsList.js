import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AnimalsList = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [token, setToken] = useState(null); // Estado para armazenar o token
  const router = useRouter();

  useEffect(() => {
    const fetchTokenAndAnimals = async () => {
      try {
        // Buscar o token do AsyncStorage
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
          const response = await axios.get('http://localhost:8000/animais/animais-cliente', {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });
          setAnimals(response.data);
        } else {
          setErrorMessage('Token não encontrado. Por favor, faça login novamente.');
        }
      } catch (error) {
        if (error.response) {
          setErrorMessage(error.response.data.message || 'Erro ao buscar animais.');
        } else {
          setErrorMessage('Erro ao conectar ao servidor.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTokenAndAnimals();
  }, []);

  const renderAnimalItem = ({ item }) => (
    <TouchableOpacity style={styles.animalItem} onPress={() => router.push({ pathname: "/Animais/AnimalDetail", params: { id: item.id } })}>
      <Text style={styles.animalName}>{item.nome}</Text>
      <Text style={styles.animalInfo}>
        {item.raca} - {item.sexo ? 'Macho' : 'Fêmea'} - {item.temperamento}
      </Text>
    </TouchableOpacity>
  );

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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/home/Profile')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color='#F29629' />
        </TouchableOpacity>
      </View>

      <Text style={styles.headerTitle}>PETS</Text>

      {animals.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Você não cadastrou nenhum pet.</Text>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => router.push({ pathname: "/Clientes/AnimalRegister" })}>
            <Text style={styles.buttonText}>Cadastrar Animal</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <FlatList
            data={animals}
            renderItem={renderAnimalItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.list}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => router.push({ pathname: "/Clientes/AnimalRegister" })}>
              <Text style={styles.buttonText}>Cadastrar novo pet</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3D005D',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#3D005D',
  },
  backButton: {
    marginLeft: 10,
  },
  headerTitle: {
    color: '#F29629',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
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
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3D005D',
  },
  emptyText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    paddingHorizontal: 20,
  },
  registerButton: {
    paddingVertical: 15,
    backgroundColor: '#f16529',
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  list: {
    padding: 20,
  },
  animalItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#8A2BE2',
    borderRadius: 10,
  },
  animalName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  animalInfo: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default AnimalsList;
