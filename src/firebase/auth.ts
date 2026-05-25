import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
  verifyPasswordResetCode,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  type User,
  type ActionCodeSettings,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./config";

export const authService = {
  register: async (email: string, password: string, fullName: string, role: string = "student") => {
    await setPersistence(auth, browserLocalPersistence);
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", cred.user.uid), {
      fullName,
      email,
      role,
      createdAt: serverTimestamp(),
    });
    return cred;
  },

  login: async (email: string, password: string) => {
    await setPersistence(auth, browserLocalPersistence);
    return await signInWithEmailAndPassword(auth, email, password);
  },

  logout: async () => {
    return await signOut(auth);
  },

  resetPassword: async (email: string, actionCodeSettings?: ActionCodeSettings) => {
    return await sendPasswordResetEmail(auth, email, actionCodeSettings);
  },

  verifyPasswordResetCode: async (code: string) => {
    return await verifyPasswordResetCode(auth, code);
  },

  confirmPasswordReset: async (code: string, newPassword: string) => {
    return await confirmPasswordReset(auth, code, newPassword);
  },

  getCurrentUser: () => auth.currentUser,

  getUserProfile: async (uid: string) => {
    const snap = await getDoc(doc(db, "users", uid));
    return snap.exists() ? snap.data() : null;
  },

  updateUserProfile: async (uid: string, data: Record<string, any>) => {
    await setDoc(doc(db, 'users', uid), { ...data, updatedAt: serverTimestamp() }, { merge: true });
    const snap = await getDoc(doc(db, 'users', uid));
    return snap.exists() ? snap.data() : null;
  },

  onAuthStateChanged: (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
  },
};