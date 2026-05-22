import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { CATALOG_COURSES, type CatalogCourse } from '../data/courses';

const STORAGE_KEY = 'trilevel_enrolled_courses';

export interface EnrolledCourseView {
  id: number;
  title: string;
  department: string;
  description: string;
  progress: number;
  type: 'Certificate' | 'Diploma';
  units: number;
  currentUnit: number;
  status: 'in-progress' | 'completed';
}

interface EnrollmentContextType {
  enrolledIds: number[];
  isEnrolled: (courseId: number) => boolean;
  enroll: (courseId: number) => boolean;
  unenroll: (courseId: number) => void;
  enrolledCourses: EnrolledCourseView[];
  lastAction: { type: 'enroll' | 'unenroll'; title: string } | null;
  clearLastAction: () => void;
}

const EnrollmentContext = createContext<EnrollmentContextType | undefined>(undefined);

function loadIds(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'number') : [];
  } catch {
    return [];
  }
}

function toEnrolledView(course: CatalogCourse): EnrolledCourseView {
  return {
    id: course.id,
    title: course.title,
    department: course.department,
    description: course.description,
    progress: 0,
    type: course.level,
    units: course.units,
    currentUnit: 0,
    status: 'in-progress',
  };
}

export const EnrollmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [enrolledIds, setEnrolledIds] = useState<number[]>(loadIds);
  const [lastAction, setLastAction] = useState<EnrollmentContextType['lastAction']>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(enrolledIds));
  }, [enrolledIds]);

  const isEnrolled = useCallback((courseId: number) => enrolledIds.includes(courseId), [enrolledIds]);

  const enroll = useCallback((courseId: number) => {
    const course = CATALOG_COURSES.find((c) => c.id === courseId);
    if (!course || enrolledIds.includes(courseId)) return false;
    setEnrolledIds((prev) => [...prev, courseId]);
    setLastAction({ type: 'enroll', title: course.title });
    return true;
  }, [enrolledIds]);

  const unenroll = useCallback((courseId: number) => {
    const course = CATALOG_COURSES.find((c) => c.id === courseId);
    setEnrolledIds((prev) => prev.filter((id) => id !== courseId));
    if (course) setLastAction({ type: 'unenroll', title: course.title });
  }, []);

  const enrolledCourses = useMemo(
    () =>
      enrolledIds
        .map((id) => CATALOG_COURSES.find((c) => c.id === id))
        .filter((c): c is CatalogCourse => Boolean(c))
        .map(toEnrolledView),
    [enrolledIds]
  );

  const value: EnrollmentContextType = {
    enrolledIds,
    isEnrolled,
    enroll,
    unenroll,
    enrolledCourses,
    lastAction,
    clearLastAction: () => setLastAction(null),
  };

  return <EnrollmentContext.Provider value={value}>{children}</EnrollmentContext.Provider>;
};

export const useEnrollment = () => {
  const ctx = useContext(EnrollmentContext);
  if (!ctx) throw new Error('useEnrollment must be used within EnrollmentProvider');
  return ctx;
};
