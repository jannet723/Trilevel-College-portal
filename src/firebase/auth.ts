// Authentication service
// To use Firebase authentication, run: npm install firebase
// Then configure Firebase in src/firebase/config.ts

// Placeholder authentication service
export const authService = {
  register: async (_email: string, _password: string) => {
    console.warn('Firebase not configured. Call npm install firebase to enable authentication.');
    return null;
  },

  login: async (_email: string, _password: string) => {
    console.warn('Firebase not configured. Call npm install firebase to enable authentication.');
    return null;
  },

  logout: async () => {
    console.warn('Firebase not configured. Call npm install firebase to enable authentication.');
    return null;
  },

  resetPassword: async (_email: string) => {
    console.warn('Firebase not configured. Call npm install firebase to enable authentication.');
    return null;
  },

  getCurrentUser: () => {
    return null;
  },
};

// Uncomment when Firebase is installed:
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   sendPasswordResetEmail,
// } from 'firebase/auth';
// import { auth } from './config';
//
// export const authService = {
//   register: async (email: string, password: string) => {
//     return await createUserWithEmailAndPassword(auth, email, password);
//   },
//   login: async (email: string, password: string) => {
//     return await signInWithEmailAndPassword(auth, email, password);
//   },
//   logout: async () => {
//     return await signOut(auth);
//   },
//   resetPassword: async (email: string) => {
//     return await sendPasswordResetEmail(auth, email);
//   },
//   getCurrentUser: () => {
//     return auth.currentUser;
//   },
// };
