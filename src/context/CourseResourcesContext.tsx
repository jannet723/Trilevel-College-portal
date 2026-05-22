import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
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

interface CourseResourcesContextType {
  resources: CourseResource[];
  getResourcesForCourse: (courseId: number) => CourseResource[];
  getResourceCount: (courseId: number) => number;
  addResource: (input: CourseResourceInput) => CourseResource;
  updateResource: (id: string, updates: Partial<CourseResourceInput>) => void;
  deleteResource: (id: string) => void;
}

const CourseResourcesContext = createContext<CourseResourcesContextType | undefined>(undefined);

export const CourseResourcesProvider = ({ children }: { children: ReactNode }) => {
  const [resources, setResources] = useState<CourseResource[]>(loadResources);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resources));
  }, [resources]);

  const getResourcesForCourse = useCallback(
    (courseId: number) =>
      resources
        .filter((r) => r.courseId === courseId)
        .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title)),
    [resources]
  );

  const getResourceCount = useCallback(
    (courseId: number) => resources.filter((r) => r.courseId === courseId).length,
    [resources]
  );

  const addResource = useCallback((input: CourseResourceInput) => {
    const courseResources = resources.filter((r) => r.courseId === input.courseId);
    const maxOrder = courseResources.reduce((max, r) => Math.max(max, r.order), 0);
    const newResource: CourseResource = {
      id: `res-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      courseId: input.courseId,
      type: input.type,
      title: input.title.trim(),
      unit: input.unit.trim() || 'General',
      content: input.content.trim(),
      order: input.order ?? maxOrder + 1,
      updatedAt: new Date().toISOString(),
    };
    setResources((prev) => [...prev, newResource]);
    return newResource;
  }, [resources]);

  const updateResource = useCallback((id: string, updates: Partial<CourseResourceInput>) => {
    setResources((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              ...(updates.type !== undefined && { type: updates.type }),
              ...(updates.title !== undefined && { title: updates.title.trim() }),
              ...(updates.unit !== undefined && { unit: updates.unit.trim() || 'General' }),
              ...(updates.content !== undefined && { content: updates.content.trim() }),
              ...(updates.order !== undefined && { order: updates.order }),
              updatedAt: new Date().toISOString(),
            }
          : r
      )
    );
  }, []);

  const deleteResource = useCallback((id: string) => {
    setResources((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      resources,
      getResourcesForCourse,
      getResourceCount,
      addResource,
      updateResource,
      deleteResource,
    }),
    [resources, getResourcesForCourse, getResourceCount, addResource, updateResource, deleteResource]
  );

  return <CourseResourcesContext.Provider value={value}>{children}</CourseResourcesContext.Provider>;
};

export const useCourseResources = () => {
  const ctx = useContext(CourseResourcesContext);
  if (!ctx) throw new Error('useCourseResources must be used within CourseResourcesProvider');
  return ctx;
};
