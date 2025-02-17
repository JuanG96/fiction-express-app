import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomLayout from "../components/CustomLayout";
import Metrics from "../components/Metrics";
import Reader from "../components/Reader";

export default function ReadBook() {
  const route = useRoute();
  const navigation = useNavigation();
  const { book } = route.params;

  const [metrics, setMetrics] = useState(null);

  return (
    <CustomLayout>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{book.title}</Text>

        {metrics ? (
          <Metrics metrics={metrics} />
        ) : (
          <Reader book={book} onFinishReading={setMetrics} />
        )}
      </View>
    </CustomLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    padding: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
  },
});
