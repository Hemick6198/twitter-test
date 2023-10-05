// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHYWxFtXYhNMi_WQ-3KaACRlcbEF_LxWc",
  authDomain: "twitter-clone-4938c.firebaseapp.com",
  projectId: "twitter-clone-4938c",
  storageBucket: "twitter-clone-4938c",
  messagingSenderId: "892908610556",
  appId: "1:892908610556:web:7c563a37645b346eb08879",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage();
