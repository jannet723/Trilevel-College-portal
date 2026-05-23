import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { enrollmentService } from '../services/api';
import { useAuth } from './AuthContext';

interface EnrollmentContextType {
  enrolledIds: string[];
  enrollments: any[];
  enrolledCourses: any[];
  isEnrolled: (courseId: string) => boolean;
  enroll: (courseId: string, courseTitle: string) => Promise<void>;
  unenroll: (enrollmentId: string) => Promise<void>;
  lastAction: string | null;
  clearLastAction: () => void;
  loading: boolean;
  refresh: () => void;
}

const EnrollmentContext = createContext<EnrollmentContextType | undefined>(undefined);

export const EnrollmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading]         = useState(false);
  const [lastAction, setLastAction]   = useState<string | null>(null);

  const fetchEnrollments = async () => {
    if (!user) { setEnrollments([]); return; }
    setLoading(true);
    try {
      const data = await enrollmentService.getByStudent(user.uid);
      setEnrollments(data);
    } catch (err) {
      console.error('Failed to fetch enrollments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEnrollments(); }, [user]);

  const isEnrolled = (courseId: string) =>
    enrollments.some((e) => e.courseId === courseId);

  const enroll = async (courseId: string, courseTitle: string) => {
    if (!user) throw new Error('Not logged in');
    await enrollmentService.enroll(user.uid, courseId, courseTitle);
    setLastAction(`Enrolled in ${courseTitle}`);
    await fetchEnrollments();
  };

  const unenroll = async (_enrollmentId: string) => {
    setLastAction('Unenrolled from course');
    await fetchEnrollments();
  };

  return (
    <EnrollmentContext.Provider value={{
      enrolledIds:     enrollments.map((e) => e.courseId),
      enrollments,
      enrolledCourses: enrollments,
      isEnrolled,
      enroll,
      unenroll,
      lastAction,
      clearLastAction: () => setLastAction(null),
      loading,
      refresh: fetchEnrollments,
    }}>
      {children}
    </EnrollmentContext.Provider>
  );
};

export function useEnrollment() {
  const context = useContext(EnrollmentContext);
  if (!context) throw new Error('useEnrollment must be used within EnrollmentProvider');
  return context;
}