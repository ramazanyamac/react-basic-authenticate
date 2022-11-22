import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnQLLpF8zrzjugfEu_ixinddGhRkECd94",
  authDomain: "storyhub-1deb7.firebaseapp.com",
  projectId: "storyhub-1deb7",
  storageBucket: "storyhub-1deb7.appspot.com",
  messagingSenderId: "10095865266",
  appId: "1:10095865266:web:3274fee92f09f2f6f2c8ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();