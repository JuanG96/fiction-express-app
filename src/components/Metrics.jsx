import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { postMetrics } from "../api/postMetrics";

export default function Metrics({ metrics }) {
  if (!metrics) return null;

  useEffect(() => {
    const saveMetrics = async () => {
      await postMetrics(metrics);
    };

    saveMetrics();
  }, [metrics]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Métricas de lectura</Text>
      <Text style={styles.metric}>
        <Text style={styles.bold}>Libro:</Text> {metrics.bookTitle}
      </Text>
      <Text style={styles.metric}>
        <Text style={styles.bold}>Tiempo total:</Text> {metrics.totalTime} ms
      </Text>
      <Text style={styles.metric}>
        <Text style={styles.bold}>Tiempo promedio por página:</Text>{" "}
        {metrics.avgTime.toFixed(2)} ms
      </Text>
      <Text style={styles.metric}>
        <Text style={styles.bold}>Tiempo por página:</Text>
      </Text>
      {metrics.pageTimes.map((time, index) => (
        <Text key={index} style={styles.pageTime}>
          Página {index + 1}: {time} ms
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  metric: {
    fontSize: 16,
    marginBottom: 5,
  },
  bold: {
    fontWeight: "bold",
  },
  pageTime: {
    fontSize: 14,
    marginLeft: 10,
  },
});
