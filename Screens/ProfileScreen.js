import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ProfileScreen({ setIsLoggedIn }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.screenText}>🛡 Tu Legado</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={() => setIsLoggedIn(false)}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({

  screen: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#121212" },

  screenText: { 
    fontSize: 22, 
    color: "#d4af37", 
    fontWeight: "bold" },

  logoutButton: { 
    backgroundColor: "#8b0000", 
    padding: 12, borderRadius: 8, 
    marginTop: 20 },

  logoutText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "bold" },
    
});