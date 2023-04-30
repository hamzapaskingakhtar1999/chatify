import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

import { getStorage } from "firebase/storage";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7gZeI-29jR2EsZcJEuAomuxRYSIGe4Dw",
  authDomain: "chat-lama-e2027.firebaseapp.com",
  projectId: "chat-lama-e2027",
  storageBucket: "chat-lama-e2027.appspot.com",
  messagingSenderId: "216923228592",
  appId: "1:216923228592:web:ddde06fe20e4eaef056e75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();