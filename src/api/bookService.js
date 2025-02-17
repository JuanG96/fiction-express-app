import Constants from "expo-constants";

const API_URL = Constants.expoConfig.extra.apiUrl;

export async function fetchBooks() {
  const response = await fetch(`${API_URL}/books`);
  if (!response.ok) {
    throw new Error("Error al obtener los libros");
  }
  return response.json();
}
