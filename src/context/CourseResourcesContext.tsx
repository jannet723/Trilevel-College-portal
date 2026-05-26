import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
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
  addResource: (input: CourseResourceInput) => void;
  deleteResource: (resourceId: string) => void;
}

const CourseResourcesContext = createContext<CourseResourcesContextType | undefined>(undefined);

export const CourseResourcesProvider = ({ children }: { children: ReactNode }) => {
  const [resources, setResources] = useState<CourseResource[]>(() => loadResources());

  useEffect(() => {
    persistResources(resources);
  }, [resources]);

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

  const addResource = useCallback((input: CourseResourceInput) => {
    const now = new Date().toISOString();
    const existing = resources.filter((r) => r.courseId === input.courseId);
    const nextOrder = input.order ?? existing.length;

    const resource: CourseResource = {
      id: `res_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      courseId: input.courseId,
      type: input.type,
      title: input.title.trim(),
      unit: input.unit.trim() || 'General',
      content: input.content.trim(),
      order: nextOrder,
      updatedAt: now,
      ...(input.file ? { file: input.file } : {}),
    };

    setResources((prev) => [...prev, resource]);
  }, [resources]);

  const deleteResource = useCallback((resourceId: string) => {
    setResources((prev) => prev.filter((r) => r.id !== resourceId));
  }, []);

  const value = useMemo(
    () => ({
      resources,
      getCourseById,
      getResourcesForCourse,
      addResource,
      deleteResource,
    }),
    [resources, getCourseById, getResourcesForCourse, addResource, deleteResource]
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
