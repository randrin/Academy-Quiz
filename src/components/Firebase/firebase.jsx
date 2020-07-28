import app from "firebase/app";

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
  }
}

export default Firebase;
