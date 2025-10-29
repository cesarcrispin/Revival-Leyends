import React, { useContext } from "react"; 
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { useCart } from "../context/CartContext";
import { AuthContext } from '../context/AuthContext'; 

// Componente para renderizar cada item en la lista
const CartItem = ({ item }) => (
    <View style={itemStyles.itemContainer}>
        <Text style={itemStyles.title}>{item.title}</Text>
        <View style={itemStyles.rightGroup}>
            {/* Asumimos quantity en 1 por defecto */}
            <Text style={itemStyles.quantity}>x{item.quantity}</Text> 
            <Text style={itemStyles.price}>${(item.price * item.quantity).toFixed(2)}</Text>
        </View>
    </View>
);

export default function CartScreen({ navigation }) {

    const { cartItems, totalPrice, clearCart } = useCart();
    
    //se obtiene el estado del usuario del contexto de autenticacion
    const { user } = useContext(AuthContext); 

    //funcion para Proceder al Pago
    const handleProceedToPayment = () => {
        if (cartItems.length === 0) {
            Alert.alert("Cofre Vacío", "Añade juegos antes de proceder al pago.");
            return;
        }

        //se Verifica si el usuario esta logueado
        if (!user) {
            Alert.alert(
                "Inicia Sesión",
                "Debes iniciar sesión para finalizar la compra.",
                [
                    { 
                        text: "Cancelar", 
                        style: "cancel" 
                    },
                    {
                        text: "Ir a Iniciar Sesión",
                        //se redirige a la pantalla de Login
                        onPress: () => navigation.navigate("Login"), 
                    }
                ]
            );
            return;
        }

        // Si el usuario está logueado simula el pago
        Alert.alert("Transaccion Exitosa", "Compra finalizada");
        clearCart();
    };


    return (
        <View style={styles.container}>
            <Text style={styles.header}>🛒 Cofre del Tesoro</Text>

            {/* Lista de Juegos */}
            {cartItems.length === 0 ? (
                <Text style={styles.emptyText}>Tu Cofre está vacío.</Text>
            ) : (
                <FlatList
                    data={cartItems}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <CartItem item={item} />}
                    style={styles.list}
                />
            )}

            {/* Resumen y Botones */}
            <View style={styles.footer}>
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total a Desbloquear:</Text>
                    <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
                </View>

                {/* BOTÓN DE PAGO */}
                <TouchableOpacity 
                    style={[styles.payButton, cartItems.length === 0 && styles.disabledButton]}
                    onPress={handleProceedToPayment} 
                    disabled={cartItems.length === 0}
                >
                    <Text style={styles.payButtonText}>Proceder al Pago</Text>
                </TouchableOpacity>

                {/* BOTÓN EXTRA: Limpiar Carrito */}
                {cartItems.length > 0 && (
                    <TouchableOpacity 
                        onPress={clearCart}
                        style={styles.clearButton}
                    >
                        <Text style={styles.clearButtonText}>Vaciar Cofre</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const itemStyles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    title: {
      marginTop: 4,
        fontSize: 16,
        color: '#fff',
        flex: 2,
    },
    rightGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
    },
    quantity: {
        fontSize: 16,
        color: '#aaa',
        marginRight: 15,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#d4af37',
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
    },
    header: {
        fontSize: 26,
        color: "#d4af37",
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#222',
    },
    list: {
        flex: 1,
        paddingHorizontal: 10,
    },
    emptyText: {
        fontSize: 18,
        color: '#aaa',
        textAlign: 'center',
        marginTop: 50,
    },
    footer: {
        padding: 20,
        borderTopWidth: 2,
        borderTopColor: '#d4af37',
        backgroundColor: '#1a1a1a',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    totalLabel: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    totalPrice: {
        fontSize: 20,
        color: '#d4af37',
        fontWeight: 'bold',
    },
    payButton: {
        backgroundColor: '#d4af37',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    payButtonText: {
        color: '#121212',
        fontSize: 18,
        fontWeight: 'bold',
    },
    clearButton: {
        padding: 10,
        alignItems: 'center',
    },
    clearButtonText: {
        color: '#f05a5a',
        fontSize: 14,
    },
    disabledButton: {
        backgroundColor: '#888',
    }
});