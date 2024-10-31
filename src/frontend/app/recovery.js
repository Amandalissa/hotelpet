import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import RecoveryService from '../services/RecoveryService';


const recoveryService = new RecoveryService();

const PasswordRecoveryScreen = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);

  const { role } = useLocalSearchParams();
  const codeInputs = useRef([]);
  const router = useRouter();

  const handleNext = () => {
    if (step === 1 && email) {
      recoveryService.sendPasswordChangeRequest(role, email).then(() => {
        setStep(2);
      }).catch((error) => {
        console.log(error.response.data.content);
      });
    } else if (step === 2) {
      recoveryService.verifyToken(role, email, code.join('')).then(() => {
        setStep(3);
      }).catch((error) => {
        console.log(error.response.data.content);
      });
    } else if (step === 3) {
      recoveryService.changePassword(role, email, code.join(''), newPassword).then(() => {
        alert("SENHA ATUALIZADA");

        router.replace("/login");
      }).catch((error) => {
        console.log(error.response.data.content);
      });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.logoContainer}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      </View>

      <View style={styles.formContainer}>
        {step === 1 && (
          <>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu e-mail"
              placeholderTextColor="#A8A8A8"
              value={email}
              onChangeText={setEmail}
            />
          </>
        )}
        {step === 2 && (
          <>
            <Text style={styles.label}>Código:</Text>
            <View style={styles.codeContainer}>
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  style={styles.codeInput}
                  placeholder="0"
                  placeholderTextColor="#A8A8A8"
                  maxLength={1}
                  keyboardType="numeric"
                  value={digit}
                  onChangeText={(text) => {
                    const newCode = [...code];
                    newCode[index] = text;
                    setCode(newCode);

                    if (text && index < code.length - 1) {
                      const nextInput = codeInputs[index + 1];
                      nextInput.focus();
                    }
                  }}
                  ref={(input) => (codeInputs[index] = input)}
                />
              ))}
            </View>
          </>
        )}
        {step === 3 && (
          <>
            <Text style={styles.label}>Nova Senha:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite sua nova senha"
              placeholderTextColor="#A8A8A8"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
          </>
        )}

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Próximo</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    marginBottom: 10,
    width: '100%',
    height: '20%',
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  formContainer: {
    width: '100%',
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 8,
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
    backgroundColor: '#8A2BE2',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  codeInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    width: 40,
    height: 40,
    textAlign: 'center',
    marginHorizontal: 5,
    color: '#FFFFFF',
    backgroundColor: 'transparent',
    outlineStyle: 'none',
  },
});

export default PasswordRecoveryScreen;
