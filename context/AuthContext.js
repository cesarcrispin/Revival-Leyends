import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import App from '../config/firebase.js';

//Inicia la autenticacion
const auth = getAuth(App); 

// Almacena el token del usuario, informacion
export const AuthContext = createContext({
    user: null,         // El objeto de usuario de Firebase
    isLoading: true,    // Para saber si Firebase terminó de chequear la sesión
    login: async () => {},
    register: async () => {},
    logout: async () => {},
    error: null,
});

//Provider
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState(null);


    useEffect(() => {
        // onAuthStateChanged se dispara cada vez que cambia el estado de login
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); // Guarda el objeto de usuario
            setIsLoading(false);  // Ya terminamos de chequear si el usuario está logeado
        });

        // Funcion de limpieza para cerrar
        return () => unsubscribe();
    }, []); 

    //Registro
    const register = async (email, password) => {
        setAuthError(null);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // onAuthStateChanged detecta cambios y actualiza el usuario automáticamente.
        } catch (error) {
            setAuthError(error.message);
            throw error; // Propagamos el error para que RegisterScreen pueda mostrarlo.
        }
    };

    //Inicio de Sesión
    const login = async (email, password) => {
        setAuthError(null);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setAuthError(error.message);
            throw error;
        }
    };

    //Cierre de Sesión
    const logout = async () => {
        setAuthError(null);
        try {
            await signOut(auth);
        } catch (error) {
            setAuthError(error.message);
            throw error;
        }
    };

    const contextValue = {
        user,
        isLoading,
        login,
        register,
        logout,
        error: authError,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
