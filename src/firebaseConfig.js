import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD9D6eIBJZoigUpycvoe7iau2os1K0EBvc",
    authDomain: "my-articles-bd275.firebaseapp.com",
    projectId: "my-articles-bd275",
    storageBucket: "my-articles-bd275.appspot.com",
    messagingSenderId: "903439386217",
    appId: "1:903439386217:web:63c6a40abf56df088384f8",
    measurementId: "G-HJKB0VK4CY"
  };

  const app = initializeApp(firebaseConfig);

  export const storage = getStorage(app);
  export const db = getFirestore(app);
  export const auth = getAuth(app);
  