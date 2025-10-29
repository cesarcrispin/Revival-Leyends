import React, { useState, useContext } from "react"; 
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Alert } from "react-native";
import { AuthContext } from '../context/AuthContext'; 
import { CommonActions } from '@react-navigation/native';

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
// La función debe ser ASÍNCRONA para esperar la respuesta de Firebase
  const handleLogin = async () => {
    setIsLoading(true); // Bloquea el botón
//Verificacion local
  if (!email || !password) {
    Alert.alert("Error", "Por favor, ingresa correo y contraseña.");
    setIsLoading(false);
    return;
    }
//validacion a Firebase
  try {
// La función 'login' dentro del AuthContext llama a signInWithEmailAndPassword
  await login(email, password);
// Esto elimina las pantallas de Login/Register del historial.
    navigation.dispatch(
    CommonActions.reset({
    index: 0,
    routes: [{ name: 'Main' }],
    })
    );
// Si tiene exito actualiza el usuario en el contexto y RootStack navega a la pantalla principal

  }
  catch (error) {
//Errores de Firebase
  let errorMessage = "Fallo el inicio de sesión. Inténtalo de nuevo.";

    if (error.code === 'auth/invalid-credential') {
      errorMessage = "Credenciales incorrectas. Verifica tu correo y contraseña.";
    } else if (error.code === 'auth/user-disabled') {
      errorMessage = "Tu cuenta ha sido deshabilitada.";
    } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      errorMessage = "Correo o contraseña incorrectos.";
    }

    Alert.alert("Error de Acceso", errorMessage);
    }
  finally {
    setIsLoading(false); // Desbloquear el botón
  }
  };
  const handleSkip = () => {
    navigation.navigate("Main");
  }
  return (
  <ImageBackground
    source={{ uri: "https://i.ibb.co/HTyDnyvp/Chat-GPT-Image-24-sept-2025-12-01-45.png" }}
    style={styles.background}
    resizeMode="cover">

    <View style={styles.overlay} />
    <View style={styles.loginContainer}>
      <Text style={styles.title}>Revival Legends</Text>
      <Text style={styles.subtitle}>Bienvenidos a su destino mortales</Text>

      <TextInput
        placeholder="Correo Electrónico"
        placeholderTextColor="#c9a46b"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"/>
      <TextInput
        placeholder="Contraseña"
        placeholderTextColor="#c9a46b"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}/>

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={isLoading}>
        <Text style={styles.buttonText}>
        {isLoading ? "INGRESANDO..." : "INGRESAR AL REINO"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Register")}>
        <Text style={styles.buttonText}>UNIRSE AL REINO</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.omitirContainer} onPress={handleSkip}>
        <Text style={styles.omitirText}>Omitir</Text>
      </TouchableOpacity>
    </View>
  </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
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
    marginBottom: 12
  },
  subtitle: {
    fontSize: 16,
    color: "#c9a46b",
    textAlign: "center",
    marginBottom: 22
  },
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
    marginTop: 10,
    backgroundColor: "#d4af37",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center"
  },
  buttonText: {
    color: "#1a1a1a",
    fontSize: 18
  },
  omitirContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  omitirText: {
  color: "#d4af37",
  fontSize: 16,
  }
});