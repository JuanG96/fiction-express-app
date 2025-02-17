import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { loginUser } from "../api/authService";
import CustomLayout from "../components/CustomLayout";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePressLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Ingresa usuario y contraseña");
      return;
    }

    try {
      setLoading(true);
      const data = await loginUser(username, password);

      if (data.length > 0) {
        login(data[0]);
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
    <CustomLayout>
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar Sesión</Text>

        <TextInput
          style={styles.input}
          placeholder="Usuario"
          placeholderTextColor="#888"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {loading ? (
          <ActivityIndicator size="large" color="rgba(76, 175, 80, 1)" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handlePressLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        )}
      </View>
    </CustomLayout>
  );
};

export default Login;

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
    color: "#000",
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
