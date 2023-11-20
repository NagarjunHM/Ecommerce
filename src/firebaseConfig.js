// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3eUxg3q6hQLcdhGUwHPqE9g6oEs5w05M",
  authDomain: "ecommerce-ec751.firebaseapp.com",
  projectId: "ecommerce-ec751",
  storageBucket: "ecommerce-ec751.appspot.com",
  messagingSenderId: "362280372914",
  appId: "1:362280372914:web:36c25e58f17d125357d7ab",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
