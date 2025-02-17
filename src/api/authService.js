import Constants from "expo-constants";

const API_URL = Constants.expoConfig.extra.apiUrl;

export async function loginUser(username, password) {
  const url = `${API_URL}/users?username=${encodeURIComponent(
    username
  )}&password=${encodeURIComponent(password)}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Error al conectar con el servidor");
  }

  return response.json();
}
