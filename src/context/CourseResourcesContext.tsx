import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
  serverTimestamp,
  orderBy,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { getCourseById as getCatalogCourseById, CATALOG_COURSES, type CatalogCourse } from '../data/courses';
import type { CourseResource, CourseResourceInput } from '../types/courseResource';

const STORAGE_KEY = 'trilevel_course_resources';

function loadResources(): CourseResource[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CourseResource[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistResources(resources: CourseResource[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resources));
}

interface CourseResourcesContextType {
  resources: CourseResource[];
  getCourseById: (id: string | number) => CatalogCourse | null;
  getResourcesForCourse: (courseId: string | number) => CourseResource[];
  addResource: (input: CourseResourceInput) => Promise<void>;
  deleteResource: (resourceId: string) => Promise<void>;
  isLoading: boolean;
  syncResources: () => Promise<void>;
}

const CourseResourcesContext = createContext<CourseResourcesContextType | undefined>(undefined);

export const CourseResourcesProvider = ({ children }: { children: ReactNode }) => {
  const [resources, setResources] = useState<CourseResource[]>(() => loadResources());
  const [isLoading, setIsLoading] = useState(true);

  // Initial sync from Firestore
  useEffect(() => {
    syncResourcesFromFirestore();
  }, []);

  // Persist to localStorage whenever resources change
  useEffect(() => {
    persistResources(resources);
  }, [resources]);

  const syncResourcesFromFirestore = async () => {
    try {
      setIsLoading(true);
      const resourcesRef = collection(db, 'courseResources');
      const q = query(resourcesRef, orderBy('updatedAt', 'desc'));
      const snapshot = await getDocs(q);
      
      const firestoreResources: CourseResource[] = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      } as CourseResource));
      
      setResources(firestoreResources);
    } catch (err) {
      console.error('Failed to sync resources from Firestore:', err);
      // Keep existing local resources if sync fails
    } finally {
      setIsLoading(false);
    }
  };

  const getCourseById = useCallback((id: string | number) => {
    return getCatalogCourseById(id) ?? null;
  }, []);

  const getResourcesForCourse = useCallback(
    (courseId: string | number) => {
      const n = typeof courseId === 'string' ? parseInt(courseId, 10) : courseId;
      if (Number.isNaN(n)) return [];
      return resources
        .filter((r) => r.courseId === n)
        .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
    },
    [resources]
  );

  const addResource = useCallback(
    async (input: CourseResourceInput) => {
      const now = new Date().toISOString();
      const existing = resources.filter((r) => r.courseId === input.courseId);
      const nextOrder = input.order ?? existing.length;

      const resourceData = {
        courseId: input.courseId,
        type: input.type,
        title: input.title.trim(),
        unit: input.unit.trim() || 'General',
        content: input.content.trim(),
        order: nextOrder,
        updatedAt: serverTimestamp(),
        ...(input.file ? { file: input.file } : {}),
      };

      try {
        // Add to Firestore
        const resourcesRef = collection(db, 'courseResources');
        const docRef = await addDoc(resourcesRef, resourceData);

        // Add to local state with the Firebase ID
        const resource: CourseResource = {
          id: docRef.id,
          ...resourceData,
          updatedAt: now,
        } as any;

        setResources((prev) => [...prev, resource]);
      } catch (err) {
        console.error('Failed to add resource:', err);
        // Still add to local storage as fallback
        const resource: CourseResource = {
          id: `res_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
          ...resourceData,
          updatedAt: now,
        } as any;
        setResources((prev) => [...prev, resource]);
      }
    },
    [resources]
  );

  const deleteResource = useCallback(
    async (resourceId: string) => {
      try {
        // Delete from Firestore
        await deleteDoc(doc(db, 'courseResources', resourceId));
      } catch (err) {
        console.error('Failed to delete resource from Firestore:', err);
      }

      // Delete from local state
      setResources((prev) => prev.filter((r) => r.id !== resourceId));
    },
    []
  );

  const value = useMemo(
    () => ({
      resources,
      getCourseById,
      getResourcesForCourse,
      addResource,
      deleteResource,
      isLoading,
      syncResources: syncResourcesFromFirestore,
    }),
    [resources, getCourseById, getResourcesForCourse, addResource, deleteResource, isLoading]
  );

  return (
    <CourseResourcesContext.Provider value={value}>
      {children}
    </CourseResourcesContext.Provider>
  );
};

export function useCourseResources() {
  const context = useContext(CourseResourcesContext);
  if (!context) throw new Error('useCourseResources must be used within CourseResourcesProvider');
  return context;
}

export { CATALOG_COURSES };
