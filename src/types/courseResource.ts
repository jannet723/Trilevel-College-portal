export type CourseResourceType = 'lesson' | 'note';

export interface CourseResourceFile {
  fileName: string;
  mimeType: string;
  size: number;
  dataUrl: string;
}

export interface CourseResource {
  id: string;
  courseId: number;
  type: CourseResourceType;
  title: string;
  unit: string;
  content: string;
  order: number;
  updatedAt: string;
  file?: CourseResourceFile;
}

export interface CourseResourceInput {
  courseId: number;
  type: CourseResourceType;
  title: string;
  unit: string;
  content: string;
  order?: number;
  file?: CourseResourceFile | null;
}
