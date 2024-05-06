// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-4be66.firebaseapp.com",
  projectId: "mern-blog-4be66",
  storageBucket: "mern-blog-4be66.appspot.com",
  messagingSenderId: "128024168569",
  appId: "1:128024168569:web:e53edc3b1001a5a1f26ca8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);