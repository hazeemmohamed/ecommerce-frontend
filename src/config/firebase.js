// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBIdiMRcxrrBlmYFEq6VsVX_P6fcLu44ys",
  authDomain: "e-commerce-6ac7e.firebaseapp.com",
  projectId: "e-commerce-6ac7e",
  storageBucket: "e-commerce-6ac7e.firebasestorage.app",
  messagingSenderId: "838423534110",
  appId: "1:838423534110:web:5437a79df4c9e42d80ec0f",
  measurementId: "G-BX0C3KNS84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth
