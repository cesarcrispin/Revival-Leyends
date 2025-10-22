import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Credenciales
const fallbackConfig = {
  apiKey: "AIzaSyA1O58vB9lj2WAoTS8tCXwJPPjGklx8v3s",
  authDomain: "revival-leyends.firebaseapp.com",
  projectId: "revival-leyends",
  storageBucket: "revival-leyends.firebasestorage.app",
  messagingSenderId: "490541853941",
  appId: "1:490541853941:web:b0f465478dd936837b69bc",
  measurementId: "G-N0BPJPXY79"
};

// Usa la configuración inyectada por el entorno o el fallback
const firebaseConfig = typeof __firebase_config !== 'undefined' 
    ? JSON.parse(__firebase_config) 
    : fallbackConfig;

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

