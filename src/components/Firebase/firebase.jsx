import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  // Sign Up
  signUpUser = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  // Sign Up with Cloud Firestore
  signUpUserWithUID = (uid) => this.db.doc(`users/${uid}`);

  // Login
  loginUser = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  // Logout
  logoutUser = () => this.auth.signOut();

  // Reset Password
  resetPassword = (email) => this.auth.sendPasswordResetEmail(email);
}

export default Firebase;
