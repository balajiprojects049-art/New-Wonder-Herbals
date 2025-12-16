import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
// FOR DEVELOPMENT: Replace these demo values with your Firebase project credentials
// FOR PRODUCTION: Set environment variables in Vercel/hosting platform
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDEMO_KEY_REPLACE_THIS",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "new-wonder-herbals.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "new-wonder-herbals",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "new-wonder-herbals.appspot.com",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore Database
export const db = getFirestore(app);

// Initialize Firebase Storage (for product images)
export const storage = getStorage(app);

export default app;
