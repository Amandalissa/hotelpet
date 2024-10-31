import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';

const ClientProfile = () => {
  const [token, setToken] = useState(null);
  const [clientProfile, setClientProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleBack = () => {
    router.push('/home/Profile');
  };

  const handleEditProfile = () => {
    router.push({
      pathname: '/Clientes/ClientEditProfile'
    });
  };

  useEffect(() => {
    const fetchTokenAndProfile = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
          const response = await axios.get('http://localhost:8000/clientes/perfil', {
            headers: { Authorization: `Bearer ${storedToken}` },
          });
          setClientProfile(response.data);
        } else {
          setErrorMessage('Token não encontrado.');
        }
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

    fetchTokenAndProfile();
  }, []);

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
        <Text style={styles.header}>Perfil do Cliente</Text>
        <Icon name="create" size={30} color="#F29629" onPress={handleEditProfile} />
      </View>
      <View style={styles.iconContainer}>
        <Icon name="person-circle-outline" size={150} color="#F29629" />
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.info}>{clientProfile?.content?.nome}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Celular:</Text>
        <Text style={styles.info}>{clientProfile?.content?.celular}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.info}>{clientProfile?.content?.email}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>CPF:</Text>
        <Text style={styles.info}>{clientProfile?.content?.cpf}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Senha:</Text>
        <Text style={styles.info}>{clientProfile?.content?.senha && '*********'}</Text>
      </View>
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
    fontSize: 16,
    marginLeft: 10,
    color: '#f2f2f2',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
});

export default ClientProfile;
