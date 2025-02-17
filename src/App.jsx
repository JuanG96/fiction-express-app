import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import BackgroundImage from "../assets/images/background.jpg";
import Library from "./screens/Library";
import Login from "./screens/Login";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("loggedUser");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error al cargar el usuario almacenado:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const handleLogin = async (loggedUser) => {
    try {
      await AsyncStorage.setItem("loggedUser", JSON.stringify(loggedUser));
      setUser(loggedUser);
    } catch (error) {
      console.error("Error al guardar el usuario:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("loggedUser");
      setUser(null);
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  if (loading) {
    return (
      <ImageBackground source={BackgroundImage} style={styles.background}>
        <SafeAreaView style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="rgba(255,87,34,1)" />
        </SafeAreaView>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={BackgroundImage} style={styles.background}>
      <SafeAreaView style={styles.container}>
        {user ? (
          <Library user={user} onLogout={handleLogout} />
        ) : (
          <Login onLogin={handleLogin} setLoading={setLoading} />
        )}
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
});
