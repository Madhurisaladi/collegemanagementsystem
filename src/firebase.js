// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Import getAuth for Firebase Authentication
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMXrMouOMfUK1GTE9-7I2FCyeSpr1zop4",
  authDomain: "college-management-proje-70ee7.firebaseapp.com",
  projectId: "college-management-proje-70ee7",
  storageBucket: "college-management-proje-70ee7.firebasestorage.app",
  messagingSenderId: "677615855448",
  appId: "1:677615855448:web:e5ebc76ed272a27417a72d",
  measurementId: "G-XZKHQQ83WJ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

// Export both auth and db
export { auth, db };