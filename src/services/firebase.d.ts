declare module '../services/firebase' {
  import { FirebaseApp } from 'firebase/app';
  import { Auth } from 'firebase/auth';
  import { Firestore } from 'firebase/firestore';
  import { Storage } from 'firebase/storage';

  const app: FirebaseApp;
  export default app;

  export const auth: Auth;
  export const db: Firestore;
  export const storage: Storage;
}

declare module '../services/firebase.js' {
  import { FirebaseApp } from 'firebase/app';
  import { Auth } from 'firebase/auth';
  import { Firestore } from 'firebase/firestore';
  import { Storage } from 'firebase/storage';

  const app: FirebaseApp;
  export default app;

  export const auth: Auth;
  export const db: Firestore;
  export const storage: Storage;
}
