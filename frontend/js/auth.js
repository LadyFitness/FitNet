// auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getAuth, 
  onAuthStateChanged, 
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// 🔁 REPLACE WITH YOUR FIREBASE CONFIG (from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyCeKOpdD69tvwOGkebZVgbdtLoM3IVBY6g",
  authDomain: "fitnet-f5b85.firebaseapp.com",
  projectId: "fitnet-f5b85",
  storageBucket: "fitnet-f5b85.firebasestorage.app",
  messagingSenderId: "335842113445",
  appId: "1:335842113445:web:84281a26b09566ab3b1a4c",
  measurementId: "G-J5TSVG77P7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { 
  auth, 
  onAuthStateChanged, 
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  googleProvider,
  signInWithPopup
};