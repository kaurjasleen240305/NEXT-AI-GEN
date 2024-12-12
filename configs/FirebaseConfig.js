// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-video-gen-6aeee.firebaseapp.com",
  projectId: "ai-video-gen-6aeee",
  storageBucket: "ai-video-gen-6aeee.firebasestorage.app",
  messagingSenderId: "531714583881",
  appId: "1:531714583881:web:fee8a3cc3572bb3b343e98",
  measurementId: "G-4T8Y2JM759"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);