import { X, BookOpen, Clock, Layers } from 'lucide-react';
import type { CatalogCourse } from '../../data/courses';
import { getCourseIcon } from '../../utils/courseIcons';

interface PublicCourseDetailModalProps {
  course: CatalogCourse | null;
  onClose: () => void;
  onSignIn?: () => void;
}

const PublicCourseDetailModal = ({ course, onClose, onSignIn }: PublicCourseDetailModalProps) => {
  if (!course) return null;

  const Icon = getCourseIcon(course.iconKey);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2c2824]/25 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative w-full max-w-lg bg-white/95 backdrop-blur-xl rounded-2xl border border-[#e8e2d9] shadow-2xl overflow-hidden animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="course-detail-title"
      >
        <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-[#4a6a9b] via-[#2F2FE4] to-[#b70c0c]/60" />
        <div className="p-6 border-b border-[#e8e2d9] bg-linear-to-br from-[#faf8f5] to-white">
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-4">
              <div className="w-14 h-14 rounded-xl bg-linear-to-br from-[#e8f0fe] to-[#d4e2f7] flex items-center justify-center text-[#4a6a9b] shrink-0">
                <Icon size={26} strokeWidth={1.75} />
              </div>
              <div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#eef5f0] text-[#4a7c5e]">
                    {course.level}
                  </span>
                  <span className="text-[10px] text-[#9b9288]">{course.department}</span>
                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      course.status === 'Active' ? 'bg-[#eef5f0] text-[#4a7c5e]' : 'bg-[#fef5e8] text-[#d4a34b]'
                    }`}
                  >
                    {course.status}
                  </span>
                </div>
                <h2 id="course-detail-title" className="text-xl font-semibold text-[#2c2824]" style={{ fontFamily: 'Georgia, serif' }}>
                  {course.title}
                </h2>
                <p className="text-xs font-mono text-[#9b9288] mt-1">{course.code}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-[#9b9288] hover:bg-[#f0ece6] hover:text-[#2c2824] transition"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-sm text-[#6b645a] leading-relaxed">{course.description}</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Clock, label: 'Duration', value: course.duration },
              { icon: Layers, label: 'Units', value: String(course.units) },
              { icon: BookOpen, label: 'Format', value: course.level },
            ].map(({ icon: ItemIcon, label, value }) => (
              <div key={label} className="p-3 rounded-xl bg-[#faf8f5] border border-[#e8e2d9]/80 text-center">
                <ItemIcon size={14} className="mx-auto text-[#4a6a9b] mb-1.5" />
                <p className="text-[9px] uppercase tracking-wider text-[#9b9288]">{label}</p>
                <p className="text-xs font-semibold text-[#2c2824] mt-0.5">{value}</p>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-[#9b9288] text-center pt-2 border-t border-[#e8e2d9]">
            Sign in to enrol and access course materials.
          </p>
        </div>

        <div className="flex gap-3 px-6 py-4 border-t border-[#e8e2d9] bg-[#faf8f5]/50">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-[#e0d9d0] text-sm font-medium text-[#6b645a] hover:bg-white transition"
          >
            Close
          </button>
          {onSignIn && (
            <button
              type="button"
              onClick={onSignIn}
              className="flex-1 py-2.5 rounded-xl bg-linear-to-r from-[#2F2FE4] to-[#3d5a86] text-white text-sm font-medium hover:from-[#3d5a86] hover:to-[#2c4a7a] transition shadow-sm"
            >
              Sign in to enrol
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicCourseDetailModal;
