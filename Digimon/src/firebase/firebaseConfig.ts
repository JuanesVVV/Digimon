// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// 1. Importa estas funciones para inicializar Auth y Firestore
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkj7DiL9XZrCobbRzTxebuFpQ6Ph3gpgg",
  authDomain: "digimon-711d2.firebaseapp.com",
  projectId: "digimon-711d2",
  storageBucket: "digimon-711d2.firebasestorage.app",
  messagingSenderId: "210671186726",
  appId: "1:210671186726:web:7c6587ba0d439e97a787e7",
  measurementId: "G-ECEY3F3WL7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

// 2. Inicializa y exporta los servicios que usarás en tus componentes
export const auth = getAuth(app);
export const db = getFirestore(app);