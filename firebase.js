import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// If you need analytics
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcXu0ZTO1vX43qGE3ZxI38bh7hmOUkWSw",
  authDomain: "dmarental.firebaseapp.com",
  projectId: "dmarental",
  storageBucket: "dmarental.appspot.com",
  messagingSenderId: "614685490967",
  appId: "1:614685490967:web:18c1ebdd0a2251ad0a0152",
  measurementId: "G-Y4JN865SG4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// If you need analytics
const analytics = getAnalytics(app);

export { auth, googleProvider };
