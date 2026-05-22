import {
  Briefcase,
  Church,
  Coffee,
  Cpu,
  Heart,
  Sparkles,
  Users,
  type LucideIcon,
} from 'lucide-react';
import type { CatalogCourse } from '../data/courses';

const ICON_MAP: Record<CatalogCourse['iconKey'], LucideIcon> = {
  hospitality: Coffee,
  business: Briefcase,
  technology: Cpu,
  social: Heart,
  theology: Church,
  ai: Sparkles,
};

export function getCourseIcon(iconKey: CatalogCourse['iconKey']): LucideIcon {
  return ICON_MAP[iconKey] ?? Users;
}
