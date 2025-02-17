import Constants from "expo-constants";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { loginUser } from "../api/authService";

const API_URL = Constants.expoConfig.extra.apiUrl;

export default function Login({ onLogin, setLoading }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handlePressLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Ingresa usuario y contraseña");
      return;
    }

    try {
      setLoading(true);
      const data = await loginUser(username, password);

      if (data.length > 0) {
        onLogin(data[0]);
      } else {
        Alert.alert("Error", "Usuario o contraseña inválidos");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo conectar al servidor");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handlePressLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "rgba(255, 87, 34, 1)",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginBottom: 15,
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 50,
    fontSize: 16,
  },
  button: {
    backgroundColor: "rgba(76, 175, 80, 1)",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 18,
  },
});
