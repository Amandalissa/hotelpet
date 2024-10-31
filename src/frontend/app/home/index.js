import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const HomeScreen = () => {
  const [name, setName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchName = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
          setName(userData.name);
        }
      } catch (error) {
        console.error('Erro ao buscar nome do usuário:', error);
      }
    };

    fetchName();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      </View>
      <Text style={styles.welcomeText}>
        Bem-vindo <Text style={styles.boldText}>{name}</Text>! Reserve a hospedagem ideal para seu pet.
      </Text>
      <TouchableOpacity style={styles.buttonExit} onPress={() => router.push('/home/Profile')}>
        <Text style={styles.buttonText}>Começar agora</Text>
      </TouchableOpacity>
    </View>
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
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    width: '100%',
    height: '25%',
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  welcomeText: {
    fontSize: 20,
    color: '#FFFFFF',
    marginVertical: 20,
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
  buttonExit: {
    backgroundColor: '#f16529',
    paddingVertical: 15,
    borderRadius: 10,
    width: '80%',
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
