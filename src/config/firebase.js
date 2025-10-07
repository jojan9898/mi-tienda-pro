import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRGLalhkztsbiYmA5KepNEGF8Lmm2-nqU",
  authDomain: "mi-tienda-app-8909f.firebaseapp.com",
  projectId: "mi-tienda-app-8909f",
  storageBucket: "mi-tienda-app-8909f.firebasestorage.app",
  messagingSenderId: "772141914025",
  appId: "1:772141914025:web:69565df4c078aabce896b8"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);