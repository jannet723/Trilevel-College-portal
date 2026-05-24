import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { courseService } from '../services/api';

interface CourseResourcesContextType {
  courses: any[];
  resources: any[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
  getCourseById: (id: string) => any | null;
  getResourcesForCourse: (courseId: string) => any[];
  addResource: (resource: any) => Promise<void>;
  deleteResource: (resourceId: string) => Promise<void>;
}

const CourseResourcesContext = createContext<CourseResourcesContextType | undefined>(undefined);

export const CourseResourcesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [courses, setCourses]     = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState<string | null>(null);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await courseService.getAll();
      setCourses(data);
    } catch (err: any) {
      setError('Failed to load courses.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCourses(); }, []);

  const getCourseById = (id: string) => courses.find((c) => c.id === id) || null;

  const getResourcesForCourse = (courseId: string) =>
    resources.filter((r) => r.courseId === courseId);

  const addResource = async (resource: any) => {
    setResources((prev) => [...prev, { ...resource, id: Date.now().toString() }]);
  };

  const deleteResource = async (resourceId: string) => {
    setResources((prev) => prev.filter((r) => r.id !== resourceId));
  };

  return (
    <CourseResourcesContext.Provider value={{
      courses, resources, loading, error,
      refresh: fetchCourses,
      getCourseById,
      getResourcesForCourse,
      addResource,
      deleteResource,
    }}>
      {children}
    </CourseResourcesContext.Provider>
  );
};

export function useCourseResources() {
  const context = useContext(CourseResourcesContext);
  if (!context) throw new Error('useCourseResources must be used within CourseResourcesProvider');
  return context;
}