import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Reader({ book, onFinishReading }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageTimes, setPageTimes] = useState(
    new Array(book.pages.length).fill(0)
  );
  const [startTime, setStartTime] = useState(Date.now());

  const handlePageChange = (direction) => {
    const now = Date.now();
    setPageTimes((prev) => {
      const newTimes = [...prev];
      newTimes[currentPage] += now - startTime;
      return newTimes;
    });
    setStartTime(now);
    setCurrentPage((prev) => prev + direction);
  };

  const finishReading = () => {
    const now = Date.now();
    const lastPageTime = now - startTime;
    const updatedPageTimes = [...pageTimes];
    updatedPageTimes[currentPage] += lastPageTime;

    const totalTime = updatedPageTimes.reduce((acc, time) => acc + time, 0);
    const avgTime = totalTime / book.pages.length;

    onFinishReading({
      bookTitle: book.title,
      totalTime,
      avgTime,
      pageTimes: updatedPageTimes,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageText}>
        {currentPage + 1} de {book.pages.length}
      </Text>
      <ScrollView style={styles.content}>
        <Text style={styles.bookContent}>{book.pages[currentPage]}</Text>
      </ScrollView>
      <View style={styles.navButtons}>
        <TouchableOpacity
          style={[styles.button, currentPage === 0 && styles.disabled]}
          disabled={currentPage === 0}
          onPress={() => handlePageChange(-1)}
        >
          <Text style={styles.buttonText}>Página anterior</Text>
        </TouchableOpacity>
        {currentPage === book.pages.length - 1 ? (
          <TouchableOpacity style={styles.button} onPress={finishReading}>
            <Text style={styles.buttonText}>Finalizar lectura</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePageChange(1)}
          >
            <Text style={styles.buttonText}>Siguiente página</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  content: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 10,
  },
  pageText: {
    fontSize: 18,
    marginBottom: 8,
  },
  bookContent: {
    fontSize: 18,
    textAlign: "left",
  },
  navButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 10,
  },
  button: {
    padding: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
  },
  disabled: {
    backgroundColor: "#AAA",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
  },
});
