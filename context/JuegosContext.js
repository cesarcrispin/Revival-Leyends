import React, { createContext, useState, useEffect } from 'react';
import { db } from '../config/firebase'; 
import { collection, onSnapshot, query, doc, getDoc } from 'firebase/firestore';

// Función para obtener informacion de un juego
export const getJuegoDetalles = async (juegoId) => {
    if (!juegoId) return null;
    const docRef = doc(db, "Juegos", juegoId); 
    try {
        const docSnap = await getDoc(docRef); 
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            return null;
        }
    } catch (e) {
        throw new Error("Fallo en la carga del juego: " + e.message);
    }
};

export const JuegosContext = createContext({ juegos: [], cargando: true, error: null });

export const JuegosProvider = ({ children }) => {
    const [juegos, setJuegos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const q = query(collection(db, 'Juegos'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            try {
                const listaJuegos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setJuegos(listaJuegos);
                setCargando(false);
                setError(null);
            } catch (err) {
                setError("Error al cargar datos.");
                setCargando(false);
            }
        }, 
        (connError) => {
             setError(`Error de conexión o permisos`);
             setCargando(false);
        });

        return () => unsubscribe();
    }, []); 

    return (
        <JuegosContext.Provider value={{ juegos, cargando, error }}>
            {children}
        </JuegosContext.Provider>
    );
};