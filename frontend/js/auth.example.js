// auth.example.js


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


const firebaseConfig = {
  apiKey: "My_API_KEY",
  authDomain: "MY_AUTH_DOMAIN",
  projectId: "MY_PROJECT_ID",
  storageBucket: "MY_STORAGE_BUCKET",
  messagingSenderId: "MY_MESSAGING_SENDER_ID",
  appId: "MY_APP_ID"w
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