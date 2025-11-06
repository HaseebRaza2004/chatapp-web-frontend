import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
// import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBtCrcxkwa-sKZHSkwgVfnO_6G1X0pDs_c",
  authDomain: "chat-app-c552d.firebaseapp.com",
  projectId: "chat-app-c552d",
  storageBucket: "chat-app-c552d.firebasestorage.app",
  messagingSenderId: "71880683398",
  appId: "1:71880683398:web:bee5f58cf489502a34c607",
  measurementId: "G-MK4Y6B0QC0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.useDeviceLanguage();

// export { app, auth };
export { app, auth, RecaptchaVerifier, signInWithPhoneNumber };
