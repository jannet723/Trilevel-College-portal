import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAn63MHtJDcv0duy3Wru3C-VK_cWt5jtFg",
  authDomain: "trilevel-college-portal.firebaseapp.com",
  projectId: "trilevel-college-portal",
  storageBucket: "trilevel-college-portal.firebasestorage.app",
  messagingSenderId: "965519333339",
  appId: "1:965519333339:web:609c72ae461f1c1af2f9fe",
  measurementId: "G-2T812K0TYX"
};

const app = initializeApp(firebaseConfig);
export const auth    = getAuth(app);
export const db      = getFirestore(app);
export const storage = getStorage(app);
export default app;