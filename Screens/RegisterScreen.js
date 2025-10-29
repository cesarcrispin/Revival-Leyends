import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Alert } from "react-native";
import { AuthContext } from '../context/AuthContext'; 


export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Para deshabilitar el botón

    // Expresiones para validar el formato basico del correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const { register } = useContext(AuthContext); 
    
    
    const handleRegister = async () => { 
        setIsLoading(true);

        if (!email || !password || !confirmPassword) {
            Alert.alert("Error", "Todos los campos son obligatorios.");
            setIsLoading(false);
            return;
        }

        if (!emailRegex.test(email)) {
            Alert.alert("Error", "Por favor, ingresa un formato de correo válido.");
            setIsLoading(false);
            return;
        }

        if (password.length < 6) {
            Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres.");
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Error", "Las contraseñas no coinciden.");
            setIsLoading(false);
            return;
        }
  
        try {
            await register(email, password);

            Alert.alert("Éxito", "¡Cuenta creada! Serás redirigido.");
            navigation.navigate("Login");
            
        } catch (error) {
            //errores de Firebase Auth (ejemplo correo ya en uso)
            let errorMessage = "Fallo el registro. Inténtalo de nuevo.";
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = "Este correo ya está registrado.";
            } else if (error.code === 'auth/weak-password') {
                errorMessage = "La contraseña es muy débil (mínimo 6 caracteres).";
            }
            
            Alert.alert("Error de Registro", errorMessage);

        } finally {
            setIsLoading(false); //desbloquea el botón
        }
    };
    return (
        <ImageBackground
            source={{ uri: "https://i.ibb.co/HTyDnyvp/Chat-GPT-Image-24-sept-2025-12-01-45.png" }}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay} />
            <View style={styles.registerContainer}>
                <Text style={styles.title}>FORJA TU LEYENDA</Text>
                <Text style={styles.subtitle}>Crea tu cuenta</Text>

                <TextInput
                    placeholder="Correo Electrónico"
                    placeholderTextColor="#c9a46b"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address" // Hint para el teclado
                    autoCapitalize="none"
                />
                <TextInput
                    placeholder="Contraseña (mínimo 6 caracteres)"
                    placeholderTextColor="#c9a46b"
                    style={styles.input}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TextInput
                    placeholder="Confirmar Contraseña"
                    placeholderTextColor="#c9a46b"
                    style={styles.input}
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                <TouchableOpacity 
                    style={styles.button} 
                    onPress={handleRegister} 
                    disabled={isLoading} // Deshabilita durante la carga
                >
                    <Text style={styles.buttonText}>
                        {isLoading ? "REGISTRANDO..." : "REGISTRARSE"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.link} 
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text style={styles.linkText}>¿Ya tienes cuenta? Ingresa aquí.</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

// Los estilos son los mismos de LoginScreen.
const styles = StyleSheet.create({
    background: { 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center" 
    },
    overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.45)" },
    registerContainer: {
        width: "85%",
        padding: 25,
        borderRadius: 15,
        backgroundColor: "rgba(20,20,20,0.8)",
        borderWidth: 2,
        borderColor: "#d4af37"
    },
    title: { 
        fontSize: 30, 
        color: "#d4af37", 
        textAlign: "center", 
        marginBottom: 8 
    },
    subtitle: { 
        fontSize: 14, 
        color: "#c9a46b", 
        textAlign: "center", 
        marginBottom: 20 
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
        backgroundColor: "#d4af37", 
        paddingVertical: 14, 
        borderRadius: 10, 
        alignItems: "center" 
    },
    buttonText: { 
        color: "#1a1a1a", 
        fontSize: 18,
        fontWeight: 'bold' 
    },
    link: { 
        marginTop: 20, 
        alignItems: "center" 
    },
    linkText: { 
        color: "#c9a46b", 
        fontSize: 14 
    }
});