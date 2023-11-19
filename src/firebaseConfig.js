// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcDKx2W38BLwKrxN3YIOU6aeRzkHhCwKk",
  authDomain: "busybuy-2fd65.firebaseapp.com",
  projectId: "busybuy-2fd65",
  storageBucket: "busybuy-2fd65.appspot.com",
  messagingSenderId: "105667573429",
  appId: "1:105667573429:web:70e16b67880ceaefe230fc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
