import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration (get this from firebase console)
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAYMmBWpwIjAUvHns9kCuHH43HWPpzm7mQ",
    authDomain: "gallagrooveture.firebaseapp.com",
    projectId: "gallagrooveture",
    storageBucket: "gallagrooveture.appspot.com",
    messagingSenderId: "690808589889",
    appId: "1:690808589889:web:65a598da9a615fc09cc0c0"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// initalize components
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const db = firebase.firestore();

