// firebase.js

// Firebase SDKs must be loaded in HTML BEFORE this file
// firebase-app-compat.js
// firebase-database-compat.js

const firebaseConfig = {
  apiKey: "AIzaSyDLQKdBN8lTmbu78gVhOeLWwdGyXYl6QdU",
  authDomain: "subscribers-87829.firebaseapp.com",
  databaseURL: "https://subscribers-87829-default-rtdb.firebaseio.com",
  projectId: "subscribers-87829",
  storageBucket: "subscribers-87829.firebasestorage.app",
  messagingSenderId: "81979628876",
  appId: "1:81979628876:web:c1c521977ec8b1493643e9",
  measurementId: "G-G4FB2Z9VQ8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Realtime Database reference
const db = firebase.database();
