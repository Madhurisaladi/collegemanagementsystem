// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Import getAuth for Firebase Authentication
import { getAnalytics } from "firebase/analytics";


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

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);  // Correct export of auth