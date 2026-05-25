import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  updateProfile,
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
    await updateProfile(cred.user, { displayName: fullName });
    await setDoc(doc(db, "users", cred.user.uid), {
      fullName,
      email,
      role,
      createdAt: serverTimestamp(),
    });
    try {
      const actionCodeSettings: ActionCodeSettings = {
        url: window.location.origin + '/?emailVerified=1',
        handleCodeInApp: true,
      };
      await sendEmailVerification(cred.user, actionCodeSettings);
    } catch (err) {
      console.warn('sendEmailVerification failed', err);
    }
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

  sendSignInLink: async (email: string, actionCodeSettings?: ActionCodeSettings) => {
    const settings = actionCodeSettings ?? {
      url: window.location.origin + '/',
      handleCodeInApp: true,
    };
    return await sendSignInLinkToEmail(auth, email, settings);
  },

  isSignInWithEmailLink: (link: string) => {
    return isSignInWithEmailLink(auth, link);
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