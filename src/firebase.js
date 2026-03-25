// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAL4SEzQfQAv_OwJ95g8QAqqjNQa_kWndY",
  authDomain: "portofolio-eb88b.firebaseapp.com",
  projectId: "portofolio-eb88b",
  storageBucket: "portofolio-eb88b.firebasestorage.app",
  messagingSenderId: "899105760426",
  appId: "1:899105760426:web:cb4cbecc3420fd92e51cd3",
  measurementId: "G-KR76LNMH0Y"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Auth
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const loginWithGoogle = () => signInWithPopup(auth, provider);
export const logout = () => signOut(auth);

// Firestore
export const db = getFirestore(app);
