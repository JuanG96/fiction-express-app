import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BookImage from "../../assets/images/book.jpg";
import CustomLayout from "../components/CustomLayout";
import { AuthContext } from "../context/AuthContext";

export default function Library() {
  const { logout } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const storedBooks = await AsyncStorage.getItem("books");
        setBooks(JSON.parse(storedBooks));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    loadBooks();
  }, []);

  const handleLogout = async () => {
    try {
      logout();
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.containerCentered}>
        <ActivityIndicator size="large" color="#ff5722" />
        <Text style={styles.loadingText}>Cargando libros...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.containerCentered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.bookItem}
      onPress={() => navigation.navigate("ReadBook", { book: item })}
    >
      <Image source={BookImage} style={styles.bookImage} />
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookAuthor}>{item.author}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <CustomLayout>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Cerrar sesión</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Biblioteca</Text>
        <FlatList
          data={books}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </CustomLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  containerCentered: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,1)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "rgba(255,87,34,1)",
  },
  errorText: {
    fontSize: 16,
    color: "rgba(255,0,0,1)",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "rgba(255,87,34,1)",
    marginBottom: 20,
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 20,
  },
  bookItem: {
    flexDirection: "row",
    backgroundColor: "rgba(249,249,249,1)",
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
    padding: 10,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  bookImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
    resizeMode: "contain",
  },
  bookInfo: {
    flex: 1,
    justifyContent: "center",
  },
  bookTitle: {
    fontSize: 16,
    color: "rgba(76,175,80,1)",
    fontWeight: "bold",
    marginBottom: 5,
  },
  bookAuthor: {
    fontSize: 14,
    color: "rgba(51,51,51,1)",
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
