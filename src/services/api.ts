import {
  collection, doc, getDocs, getDoc, addDoc,
  updateDoc, deleteDoc, query, where, orderBy,
  serverTimestamp
} from "firebase/firestore";
import { db } from "../firebase/config";

export const courseService = {
  getAll: async () => {
    const snap = await getDocs(query(collection(db, "courses"), orderBy("createdAt", "desc")));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },
  getById: async (id: string) => {
    const snap = await getDoc(doc(db, "courses", id));
    return snap.exists() ? { id: snap.id, ...snap.data() } : null;
  },
  create: async (data: any) => {
    return await addDoc(collection(db, "courses"), { ...data, createdAt: serverTimestamp() });
  },
  update: async (id: string, data: any) => {
    return await updateDoc(doc(db, "courses", id), data);
  },
  delete: async (id: string) => {
    return await deleteDoc(doc(db, "courses", id));
  },
};

export const enrollmentService = {
  getByStudent: async (studentId: string) => {
    const snap = await getDocs(
      query(collection(db, "enrollments"), where("studentId", "==", studentId))
    );
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },
  getAll: async () => {
    const snap = await getDocs(
      query(collection(db, "enrollments"), orderBy("createdAt", "desc"))
    );
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },
  enroll: async (studentId: string, courseId: string, courseTitle: string) => {
    return await addDoc(collection(db, "enrollments"), {
      studentId, courseId, courseTitle, status: "pending", createdAt: serverTimestamp(),
    });
  },
  updateStatus: async (enrollmentId: string, status: string) => {
    return await updateDoc(doc(db, "enrollments", enrollmentId), { status });
  },
};

export const userService = {
  getAll: async () => {
    const snap = await getDocs(collection(db, "users"));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },
  getById: async (uid: string) => {
    const snap = await getDoc(doc(db, "users", uid));
    return snap.exists() ? { id: snap.id, ...snap.data() } : null;
  },
  update: async (uid: string, data: any) => {
    return await updateDoc(doc(db, "users", uid), data);
  },
};