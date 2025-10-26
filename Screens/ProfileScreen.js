import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { AuthContext } from '../context/AuthContext';
import { CommonActions } from '@react-navigation/native';

export default function ProfileScreen({ navigation }) {
    // Obtenemos el usuario y la función logout del contexto
    const { user, logout } = useContext(AuthContext); 

    const handleAction = async () => {
        if (user) {
            try {
                await logout();
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'Login' }], 
                    })
                );
            } catch (error) {
                Alert.alert("Error de Cierre de Sesión", "No se pudo cerrar la sesión correctamente.");
            }
        } else {
            // Si el usuario no está logueado, redirigimos al Login
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Login' }], 
                })
            );
        }
    };
    
    // Si no hay usuario se muestra invitado.
    const userEmail = user ? user.email : "Invitado(a)";

    return (
        <View style={styles.screen}>
            <Text style={styles.screenText}>🛡 Tu Legado</Text>
            
            <View style={styles.userInfoContainer}>
                <Text style={styles.label}>Estado:</Text>
                <Text style={styles.email}>{user ? 'Conectado' : 'Sin Sesión'}</Text>
                <Text style={styles.label}>Usuario:</Text>
                <Text style={styles.email}>{userEmail}</Text>
            </View>

            <TouchableOpacity 
                style={user ? styles.logoutButton : styles.loginButton} 
                onPress={handleAction}
            >
                <Text style={styles.logoutText}>
                    {user ? "CERRAR SESIÓN" : "INICIAR SESIÓN"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 20,
        backgroundColor: '#1a1a1a',
        alignItems: 'center',
        paddingTop: 80,
    },
    screenText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#d4af37',
        marginBottom: 30,
    },
    userInfoContainer: {
        width: '90%',
        padding: 20,
        backgroundColor: 'rgba(20, 20, 20, 0.9)',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#c9a46b',
        marginBottom: 40,
    },
    label: {
        fontSize: 14,
        color: '#c9a46b',
        marginTop: 5,
    },
    email: {
        fontSize: 18,
        color: '#ffffff',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
        paddingBottom: 5,
    },
    // Estilo para cerrar sesión
    logoutButton: {
        backgroundColor: '#ff4d4d',
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 10,
        width: '90%',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    // Estilo para iniciar sesión
    loginButton: {
        backgroundColor: '#d4af37',
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 10,
        width: '90%',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    logoutText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});