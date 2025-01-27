// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMXrMouOMfUK1GTE9-7I2FCyeSpr1zop4",
  authDomain: "college-management-proje-70ee7.firebaseapp.com",
  projectId: "college-management-proje-70ee7",
  storageBucket: "college-management-proje-70ee7.firebasestorage.app",
  messagingSenderId: "677615855448",
  appId: "1:677615855448:web:e5ebc76ed272a27417a72d",
  measurementId: "G-XZKHQQ83WJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Export both auth and db
export { auth, db };
