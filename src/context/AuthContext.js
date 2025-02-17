import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
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

  const login = async (loggedUser) => {
      await AsyncStorage.setItem("loggedUser", JSON.stringify(loggedUser));
      setUser(loggedUser);
  };

  const logout = async () => {
      await AsyncStorage.removeItem("loggedUser");
      setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
