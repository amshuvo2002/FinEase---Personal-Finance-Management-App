
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA8HHVO-4AqH_if72G7DS_G4cE2JLPSjoE",
  authDomain: "finease-50847.firebaseapp.com",
  projectId:  "finease-50847",
  storageBucket: "finease-50847.firebasestorage.app",
  messagingSenderId:"487165935915",
  appId: "1:487165935915:web:1eecad343ec37c941f456e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
