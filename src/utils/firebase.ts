// firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported as analyticsIsSupported } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// Add other Firebase services as needed
// import { getAuth } from "firebase/auth"; 
// import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBej_lcQ67jy7cqOG2UxsxGCv1tF4VyEsQ",
  authDomain: "gen-lang-client-0445506025.firebaseapp.com",
  databaseURL: "https://gen-lang-client-0445506025-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gen-lang-client-0445506025",
  storageBucket: "gen-lang-client-0445506025.appspot.com", // Fixed typo from `.app` to `.appspot.com`
  messagingSenderId: "832050629299",
  appId: "1:832050629299:web:b115d075ee2a3c0a2a3ec6",
  measurementId: "G-SHS0JTXZFW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Add this line:
const database = getDatabase(app);

// ✅ Export it:
export { app, analytics, database };