import type { CourseResource } from '../types/courseResource';

export function groupResourcesByUnit(resources: CourseResource[]): { unit: string; items: CourseResource[] }[] {
  const map = new Map<string, CourseResource[]>();

  resources.forEach((resource) => {
    const unit = resource.unit.trim() || 'General';
    const list = map.get(unit) ?? [];
    list.push(resource);
    map.set(unit, list);
  });

  return Array.from(map.entries())
    .map(([unit, items]) => ({
      unit,
      items: items.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title)),
    }))
    .sort((a, b) => a.unit.localeCompare(b.unit));
}

export function countByType(resources: CourseResource[]) {
  return {
    lessons: resources.filter((r) => r.type === 'lesson').length,
    notes: resources.filter((r) => r.type === 'note').length,
    files: resources.filter((r) => r.file).length,
  };
}
