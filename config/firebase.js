import { initializeApp,getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Credenciales
const fallbackConfig = {
  apiKey: "AIzaSyCp0cfiVfx5KWgXHpiKYSlMsqvxDQJd7rw",
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

