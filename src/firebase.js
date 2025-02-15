// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import Firebase Storage
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMXrMouOMfUK1GTE9-7I2FCyeSpr1zop4",
  authDomain: "college-management-proje-70ee7.firebaseapp.com",
  projectId: "college-management-proje-70ee7",
  storageBucket: "college-management-proje-70ee7.appspot.com", // Corrected storage bucket URL
  messagingSenderId: "677615855448",
  appId: "1:677615855448:web:e5ebc76ed272a27417a72d",
  measurementId: "G-XZKHQQ83WJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication, Firestore, and Storage
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // Initialize Firebase Storage
const messaging = getMessaging(app);

// Export auth, db, storage, and messaging
export { auth, db, storage, messaging };
