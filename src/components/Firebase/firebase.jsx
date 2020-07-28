import app from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAW_TLnSDntd52jK14IfSziPSh4Pq5JrYE",
  authDomain: "academy-quiz.firebaseapp.com",
  databaseURL: "https://academy-quiz.firebaseio.com",
  projectId: "academy-quiz",
  storageBucket: "academy-quiz.appspot.com",
  messagingSenderId: "134812061832",
  appId: "1:134812061832:web:725457d4a0391183060f3d",
  measurementId: "G-BF0RS54EZR",
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
  }

  // Inscription
  signUpUser = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  // Connexion
  loginUser = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  // Déconnexion
  logoutUser = () => this.auth.signOut();

  // Reset Password
  resetPassword = (email) => this.auth.sendPasswordResetEmail(email);
}

export default Firebase;
