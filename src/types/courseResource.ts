export type CourseResourceType = 'lesson' | 'note';

export interface CourseResource {
  id: string;
  courseId: number;
  type: CourseResourceType;
  title: string;
  unit: string;
  content: string;
  order: number;
  updatedAt: string;
}

export interface CourseResourceInput {
  courseId: number;
  type: CourseResourceType;
  title: string;
  unit: string;
  content: string;
  order?: number;
}
