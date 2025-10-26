import { initializeApp,getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Credenciales
const fallbackConfig = {
  apiKey: "AIzaSyBPjk-Or_iEQDlBHY1w4EIjfzKSw-btj4U",
  authDomain: "revival-leyends.firebaseapp.com",
  projectId: "revival-leyends",
  storageBucket: "revival-leyends.firebasestorage.app",
  messagingSenderId: "490541853941",
  appId: "1:490541853941:web:b0f465478dd936837b69bc",
  measurementId: "G-N0BPJPXY79"
};

console.log("CLAVE API LEÍDA:", process.env.REACT_APP_GOOGLE_API_KEY ? "CARGADA" : "NO CARGADA o VACÍA");
console.log("CONFIGURACIÓN FIREBASE:", fallbackConfig.apiKey);

// Usa la configuración inyectada por el entorno o el fallback
const firebaseConfig = typeof __firebase_config !== 'undefined' 
    ? JSON.parse(__firebase_config) 
    : fallbackConfig;

let app;

  if (getApps().length === 0) {
  // 2. Si no hay, inicializa.
  app = initializeApp(firebaseConfig);
  } else {
  // 3. Si ya existe, obtén la instancia existente.
  app = getApp();
  }

export const db = getFirestore(app);
export default app;

