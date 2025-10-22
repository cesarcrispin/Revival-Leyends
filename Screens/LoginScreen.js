import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet } from "react-native";

export default function LoginScreen({ setIsLoggedIn }) {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");

  const handleLogin = () => {
    if (usuario && contrasena) setIsLoggedIn(true);
    else alert("Por favor, ingresa usuario y contraseña");
  };

  return (
    <ImageBackground
      source={{ uri: "https://i.ibb.co/HTyDnyvp/Chat-GPT-Image-24-sept-2025-12-01-45.png" }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Revival Legends</Text>
        <Text style={styles.subtitle}>Bienvenidos a su destino mortales</Text>

        <TextInput
          placeholder="Nombre de usuario"
          placeholderTextColor="#c9a46b"
          style={styles.input}
          value={usuario}
          onChangeText={setUsuario}
        />
        <TextInput
          placeholder="Contraseña"
          placeholderTextColor="#c9a46b"
          style={styles.input}
          secureTextEntry
          value={contrasena}
          onChangeText={setContrasena}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>INGRESAR AL REINO</Text>  
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonOmitir} onPress={() => setIsLoggedIn(true)}>
          <Text style={styles.buttonOmitir}>Omitir</Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  background: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" },

  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.45)" },
  loginContainer: {
    width: "85%",
    padding: 25,
    borderRadius: 15,
    backgroundColor: "rgba(20,20,20,0.8)",
    borderWidth: 2,
    borderColor: "#d4af37"
  },
  title: { 
    fontSize: 34, 
    color: "#d4af37", 
    textAlign: "center", 
    marginBottom: 12 },

  subtitle: { 
    fontSize: 16, 
    color: "#c9a46b", 
    textAlign: "center", 
    marginBottom: 22 },

  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#c9a46b",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    color: "#fff",
    backgroundColor: "rgba(0,0,0,0.6)"
  },
  button: { 
    backgroundColor: "#d4af37", 
    paddingVertical: 14, 
    borderRadius: 10, 
    alignItems: "center" },

  buttonText: { 
    color: "#1a1a1a", 
    fontSize: 18 },

  buttonOmitir: { 
    marginTop: 15,
    alignItems: "center",
    color: "#d4af37"  }    
});