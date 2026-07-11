// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCMzfxu3R98PAcWUQ0l_58biOELTwR38pM",
  authDomain: "meditest-bd.firebaseapp.com",
  projectId: "meditest-bd",
  storageBucket: "meditest-bd.firebasestorage.app",
  messagingSenderId: "841583883106",
  appId: "1:841583883106:web:619cf97eb1e8c73bf3f23b",
  measurementId: "G-H2BMDR6V65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore Database
const db = getFirestore(app);

// Export Database
export { db };
