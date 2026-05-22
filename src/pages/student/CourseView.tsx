import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Search,
  Clock,
  Users,
  Filter,
  LayoutGrid,
  List,
  Check,
  Plus,
} from 'lucide-react';
import { CATALOG_COURSES } from '../../data/courses';
import { getCourseIcon } from '../../utils/courseIcons';
import { useEnrollment } from '../../context/EnrollmentContext';
import StudentLayout from '../../layouts/StudentLayout';

const CourseView = () => {
  const navigate = useNavigate();
  const { isEnrolled, enroll } = useEnrollment();
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const allCourses = CATALOG_COURSES.map((course) => ({
    ...course,
    icon: getCourseIcon(course.iconKey),
    enrolled: course.students,
  }));

  const filteredCourses = allCourses.filter((course) => {
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const getLevelBadgeStyle = (level: string) =>
    level === 'Diploma'
      ? 'bg-amber-50/80 text-amber-700 border-amber-200/50'
      : 'bg-blue-50/80 text-blue-700 border-blue-200/50';

  const handleEnroll = (e: React.MouseEvent, courseId: number) => {
    e.stopPropagation();
    if (enroll(courseId)) {
      navigate('/student/my-courses');
    }
  };

  const renderEnrollButton = (courseId: number, compact = false) => {
    const enrolled = isEnrolled(courseId);
    return (
      <button
        type="button"
        onClick={(e) => (enrolled ? e.stopPropagation() : handleEnroll(e, courseId))}
        disabled={enrolled}
        className={`flex items-center justify-center gap-1.5 font-medium transition-all duration-300 ${
          compact ? 'px-2.5 py-1 text-xs rounded-md' : 'w-full py-2.5 text-sm rounded-lg mt-3'
        } ${
          enrolled
            ? 'bg-[#eef5f0] text-[#4a7c5e] border border-[#ddebe2] cursor-default'
            : 'bg-linear-to-r from-[#2F2FE4] to-[#3d5a86] text-white hover:from-[#3d5a86] hover:to-[#2c4a7a] shadow-sm hover:shadow-md'
        }`}
      >
        {enrolled ? (
          <>
            <Check size={compact ? 12 : 14} />
            Enrolled
          </>
        ) : (
          <>
            <Plus size={compact ? 12 : 14} />
            Enrol Now
          </>
        )}
      </button>
    );
  };

  return (
    <StudentLayout
      title="Browse Courses"
      subtitle="Explore certificate and diploma programmes — enrol to start learning"
      backTo="/student/dashboard"
    >
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#e8e2d9] p-4 mb-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={16} className="text-[#9b9288]" />
            <span className="text-xs font-medium text-[#6b645a]">Filter:</span>
            {['all', 'Certificate', 'Diploma'].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setSelectedLevel(level)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedLevel === level
                    ? 'bg-[#2c2824] text-white shadow-sm'
                    : 'bg-[#f8f6f2] text-[#6b645a] hover:bg-[#eae5dd] border border-[#e8e2d9]'
                }`}
              >
                {level === 'all' ? 'All' : level}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1 bg-[#f8f6f2] rounded-lg border border-[#e8e2d9] p-1">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition ${viewMode === 'grid' ? 'bg-white shadow-sm text-[#2c2824]' : 'text-[#b0a89e]'}`}
              >
                <LayoutGrid size={14} />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition ${viewMode === 'list' ? 'bg-white shadow-sm text-[#2c2824]' : 'text-[#b0a89e]'}`}
              >
                <List size={14} />
              </button>
            </div>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b0a89e]" />
              <input
                type="text"
                placeholder="Search programmes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-2 text-sm border border-[#e8e2d9] rounded-xl w-56 bg-white focus:outline-none focus:ring-2 focus:ring-[#4a6a9b]/15 focus:border-[#4a6a9b]/40"
              />
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-[#9b9288] mb-4">
        Showing <span className="font-semibold text-[#2c2824]">{filteredCourses.length}</span> programmes
      </p>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCourses.map((course) => {
            const Icon = course.icon;
            return (
              <div
                key={course.id}
                className="group bg-white/90 backdrop-blur-sm rounded-2xl border border-[#e8e2d9] hover:shadow-lg hover:border-[#4a6a9b]/20 transition-all duration-300 overflow-hidden"
              >
                <div className="h-1 bg-linear-to-r from-[#4a6a9b]/0 via-[#4a6a9b]/30 to-[#2F2FE4]/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-11 h-11 rounded-xl bg-linear-to-br from-[#f8f6f2] to-white border border-[#e8e2d9] flex items-center justify-center group-hover:border-[#4a6a9b]/30 transition-colors">
                      <Icon size={20} className="text-[#6b645a] group-hover:text-[#4a6a9b] transition-colors" />
                    </div>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium border ${getLevelBadgeStyle(course.level)}`}>
                      {course.level}
                    </span>
                  </div>
                  <h3 className="font-semibold text-[#2c2824] mb-1.5 leading-snug group-hover:text-[#4a6a9b] transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-[#6b645a] mb-3 leading-relaxed line-clamp-2">{course.description}</p>
                  <div className="flex items-center gap-3 text-xs text-[#9b9288] mb-1">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={12} /> {course.units} units
                    </span>
                  </div>
                  {renderEnrollButton(course.id)}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredCourses.map((course) => {
            const Icon = course.icon;
            return (
              <div
                key={course.id}
                className="group flex flex-wrap items-center gap-4 bg-white/90 backdrop-blur-sm rounded-2xl border border-[#e8e2d9] p-4 hover:shadow-md transition-all"
              >
                <div className="w-11 h-11 rounded-xl border border-[#e8e2d9] flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-[#6b645a]" />
                </div>
                <div className="flex-1 min-w-[200px]">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-semibold text-sm text-[#2c2824]">{course.title}</h3>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] border ${getLevelBadgeStyle(course.level)}`}>
                      {course.level}
                    </span>
                  </div>
                  <p className="text-xs text-[#6b645a] line-clamp-1">{course.description}</p>
                </div>
                <div className="shrink-0">{renderEnrollButton(course.id, true)}</div>
              </div>
            );
          })}
        </div>
      )}

      {filteredCourses.length === 0 && (
        <div className="text-center py-16 bg-white/60 rounded-2xl border border-dashed border-[#d4cfc8]">
          <BookOpen size={40} className="mx-auto text-[#b0a89e] mb-3" />
          <h3 className="text-base font-semibold text-[#2c2824] mb-1">No programmes found</h3>
          <p className="text-xs text-[#6b645a]">Try adjusting your search or filters</p>
        </div>
      )}
    </StudentLayout>
  );
};

export default CourseView;
