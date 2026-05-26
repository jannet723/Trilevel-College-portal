import { BookOpen, CheckCircle2, Clock, ChevronRight } from 'lucide-react';
import type { CatalogCourse } from '../../data/courses';
import { getCourseIcon } from '../../utils/courseIcons';

interface PublicCourseCardProps {
  course: CatalogCourse;
  variant?: 'compact' | 'full';
  onView?: (course: CatalogCourse) => void;
  enrolled?: boolean;
}

const levelStyles: Record<CatalogCourse['level'], string> = {
  Certificate: 'bg-[#e8f0fe] text-[#4a6a9b]',
  Diploma: 'bg-[#eef5f0] text-[#4a7c5e]',
};

const PublicCourseCard = ({ course, variant = 'full', onView, enrolled }: PublicCourseCardProps) => {
  const Icon = getCourseIcon(course.iconKey);
  const isCompact = variant === 'compact';

  return (
    <article
      className={`group relative bg-white/55 backdrop-blur-md border border-[#e8e2d9]/80 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/75 hover:border-[#4a6a9b]/25 hover:shadow-[0_12px_40px_-12px_rgba(74,106,155,0.18)] hover:-translate-y-0.5 ${
        isCompact ? 'p-3.5' : 'p-5'
      }`}
    >
      {enrolled && (
        <span className="absolute top-3.5 right-3.5 z-10 inline-flex items-center gap-1 rounded-full border border-[#c5ddd0] bg-[#eef5f0] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#2d6a4a] shadow-sm">
          <CheckCircle2 size={11} strokeWidth={2.25} aria-hidden />
          Enrolled
        </span>
      )}
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#4a6a9b]/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <div className={`flex ${isCompact ? 'gap-3 items-start' : 'gap-4 items-start mb-4'}`}>
        <div
          className={`shrink-0 rounded-xl bg-[#f8f6f2] border border-[#e8e2d9] flex items-center justify-center text-[#4a6a9b] group-hover:scale-105 transition-transform ${
            isCompact ? 'w-10 h-10' : 'w-12 h-12'
          }`}
        >
          <Icon size={isCompact ? 18 : 22} strokeWidth={1.75} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5 mb-1">
            <span
              className={`text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${levelStyles[course.level]}`}
            >
              {course.level}
            </span>
            <span className="text-[9px] text-[#9b9288] truncate">{course.department}</span>
          </div>
          <h3
            className={`font-semibold text-[#2c2824] leading-snug group-hover:text-[#4a6a9b] transition-colors ${
              isCompact ? 'text-sm line-clamp-2' : 'text-base'
            }`}
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {course.title}
          </h3>
          <p className="text-[10px] font-mono text-[#9b9288] mt-0.5">{course.code}</p>
        </div>
      </div>

      {!isCompact && (
        <p className="text-sm text-[#6b645a] leading-relaxed line-clamp-2 mb-4">{course.description}</p>
      )}

      <div className={`flex items-center justify-between ${isCompact ? 'mt-2 pt-2 border-t border-[#e8e2d9]/60' : ''}`}>
        <div className="flex items-center gap-3 text-[10px] text-[#9b9288]">
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen size={11} />
            {course.units} units
          </span>
        </div>
        <button
          type="button"
          onClick={() => onView?.(course)}
          className="inline-flex items-center gap-0.5 text-[11px] font-medium text-[#4a6a9b] hover:text-[#2c4a7a] transition-colors"
        >
          View
          <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </article>
  );
};

export default PublicCourseCard;
