// Common types used across the application

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin' | 'instructor';
  createdAt: Date;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  enrolledStudents: number;
  createdAt: Date;
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  dueDate: Date;
  description: string;
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  submittedAt: Date;
  grade?: number;
}
