import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCMhQ8qP-gCESRlF9j1nWGI2JmIorYtlmI",
  authDomain: "notes-app-908b2.firebaseapp.com",
  projectId: "notes-app-908b2",
  storageBucket: "notes-app-908b2.firebasestorage.app",
  messagingSenderId: "805897419194",
  appId: "1:805897419194:web:bfa3804dc71842afd54583"
};
 const app = initializeApp(firebaseConfig);  
 const db = firebase.firestore();

export default db;                                                 