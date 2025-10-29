import React, { createContext, useState, useContext } from 'react';
import { Alert } from 'react-native';

//Inicializa el Contexto
export const CartContext = createContext({
    cartItems: [],
    totalPrice: 0,
    addItemToCart: () => {},
    clearCart: () => {},
});

// Hook personalizado para usar el carrito fácilmente
export const useCart = () => useContext(CartContext);

//Proveedor del Contexto
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    // funcion para añadir los juegos al carrito
    const addItemToCart = (game) => {
        // El juego debe ser un objeto con: { id, título, precio }
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === game.id);
            if (existingItem) {
                Alert.alert(
                    "Juego ya añadido", 
                    `${game.title} ya está en tu Cofre del Tesoro.`, 
                    [{ text: "OK" }]
                );
                return prevItems;
            } else {
                // añade el juego
                const newItems = [...prevItems, { ...game, quantity: 1 }];
                updateTotal(newItems);
                Alert.alert(
                    "Juego Añadido", 
                    `${game.title} ha sido agregado al Cofre del Tesoro.`,
                    [{ text: "OK" }]
                );
                return newItems;
            }
        });
    };

    // funcion para el precio total
    const updateTotal = (items) => {
        const newTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setTotalPrice(newTotal);
    };
    
    // limpia el carrito
    const clearCart = () => {
        setCartItems([]);
        setTotalPrice(0);
    };

    const contextValue = {
        cartItems,
        totalPrice,
        addItemToCart,
        clearCart,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};