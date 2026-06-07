const startedKey = (courseId: string) => `trilevel_started_${courseId}`;
const viewedKey = (courseId: string) => `trilevel_viewed_${courseId}`;

export function loadViewedIds(courseId: string): Set<string> {
  try {
    const raw = localStorage.getItem(viewedKey(courseId));
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as string[];
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

export function saveViewedIds(courseId: string, ids: Set<string>) {
  localStorage.setItem(viewedKey(courseId), JSON.stringify([...ids]));
}

/** True after the student has opened the learning page or any material for this course. */
export function hasStartedLearning(courseId: string): boolean {
  if (localStorage.getItem(startedKey(courseId)) === '1') return true;
  return loadViewedIds(courseId).size > 0;
}

export function markLearningStarted(courseId: string) {
  localStorage.setItem(startedKey(courseId), '1');
}

export type LearningCtaVariant = 'start' | 'continue' | 'review';

export function getLearningCta(courseId: string, isCompleted: boolean): { label: string; variant: LearningCtaVariant } {
  if (isCompleted) return { label: 'Review Course', variant: 'review' };
  if (!hasStartedLearning(courseId)) return { label: 'Start Learning', variant: 'start' };
  return { label: 'Continue Learning', variant: 'continue' };
}

export const learningCtaClass: Record<LearningCtaVariant, string> = {
  start: 'bg-[#2563eb] text-white hover:bg-[#1e40af] shadow-sm',
  continue: 'bg-[#eef5f0] text-[#2d6a4a] border border-[#c5ddd0] hover:bg-[#e0ebe5] hover:border-[#a8cfc0]',
  review: 'bg-[#faf8f5] text-[#6b645a] border border-[#e8e2d9] hover:bg-[#f0ece6]',
};
