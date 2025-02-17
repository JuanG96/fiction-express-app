import React from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import BackgroungImage from "../../assets/images/background.jpg";

export default function CustomLayout({ children }) {
  return (
    <ImageBackground
      source={BackgroungImage}
      style={styles.background}
    >
      <View style={styles.container}>{children}</View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 20, 
  },
});
