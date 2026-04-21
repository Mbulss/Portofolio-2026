// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, signInAnonymously } from "firebase/auth";
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

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Firebase Login Error:", error.code, error.message);
    if (error.code === 'auth/unauthorized-domain') {
      alert("Oops! Domain ini belum diizinkan di Firebase Console. \n\nCara Fix:\n1. Buka Firebase Console\n2. Authentication > Settings > Authorized Domains\n3. Tambahkan domain Vercel Anda di sana.");
    } else {
      alert("Login gagal: " + error.message);
    }
    throw error;
  }
};

export const loginAnonymously = async () => {
  try {
    const result = await signInAnonymously(auth);
    return result.user;
  } catch (error) {
    console.error("Firebase Anonymous Login Error:", error);
    alert("Gagal masuk sebagai anonim. Pastikan 'Anonymous' sudah diaktifkan di Firebase Console (Authentication > Sign-in method).");
    throw error;
  }
};

export const logout = () => signOut(auth);

// Firestore
export const db = getFirestore(app);
