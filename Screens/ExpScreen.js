import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function OffersScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> pendiente por añadir recompensas y procesos de fidelidad</Text>
    </View>
  );
}

const styles = StyleSheet.create({

  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#121212" },

  text: { 
    centerTextAlign: "center",
    fontSize: 22, 
    color: "#d4af37" }
    
});