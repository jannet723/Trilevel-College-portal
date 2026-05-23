import { useNavigate, useParams } from 'react-router-dom';
import { BookOpen, Lock, ArrowLeft } from 'lucide-react';
import StudentLayout from '../../layouts/StudentLayout';
import { getCourseById } from '../../data/courses';
import { useEnrollment } from '../../context/EnrollmentContext';
import { useCourseResources } from '../../context/CourseResourcesContext';
import CourseLearningMaterials from '../../components/course/CourseLearningMaterials';
import { getCourseIcon } from '../../utils/courseIcons';

const StudentCourseLearning = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const parsedId = Number(courseId);
  const { isEnrolled } = useEnrollment();
  const { getResourcesForCourse } = useCourseResources();

  const course = Number.isFinite(parsedId) ? getCourseById(parsedId) : undefined;
  const enrolled = course ? isEnrolled(course.id) : false;
  const resources = course ? getResourcesForCourse(course.id) : [];

  if (!course) {
    return (
      <StudentLayout title="Course" subtitle="Learning materials" backTo="/student/my-courses">
        <p className="text-sm text-[#6b645a]">This course could not be found.</p>
      </StudentLayout>
    );
  }

  const Icon = getCourseIcon(course.iconKey);

  if (!enrolled) {
    return (
      <StudentLayout title={course.title} subtitle="Learning materials" backTo="/student/my-courses">
        <div className="rounded-2xl border border-[#e8e2d9] bg-white/70 p-10 text-center max-w-lg mx-auto">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#fef5e8] flex items-center justify-center text-[#9a7530]">
            <Lock size={26} />
          </div>
          <h3 className="text-lg font-semibold text-[#2c2824] mb-2">Enrol to access materials</h3>
          <p className="text-sm text-[#6b645a] mb-6 leading-relaxed">
            You need to be enrolled in this programme before you can view lessons and notes.
          </p>
          <button
            type="button"
            onClick={() => navigate('/student/courses')}
            className="px-5 py-2.5 rounded-xl bg-[#4a6a9b] text-white text-sm font-medium"
          >
            Browse courses
          </button>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout
      title={course.title}
      subtitle="Course materials uploaded by your instructor"
      backTo="/student/my-courses"
    >
      <div className="rounded-2xl border border-[#e8e2d9] bg-white/80 overflow-hidden mb-6">
        <div className="h-1 bg-[#4a6a9b]" />
        <div className="p-5 sm:p-6 flex flex-wrap items-start gap-4">
          <div className="w-12 h-12 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] flex items-center justify-center shrink-0">
            <Icon size={22} className="text-[#4a6a9b]" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[#e8f0fe] text-[#4a6a9b]">
                {course.level}
              </span>
              <span className="text-[10px] text-[#9b9288]">{course.department}</span>
            </div>
            <h2 className="text-lg font-semibold text-[#2c2824]">{course.title}</h2>
            <p className="text-sm text-[#6b645a] mt-1 leading-relaxed">{course.description}</p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/student/my-courses')}
            className="inline-flex items-center gap-1.5 text-xs text-[#4a6a9b] hover:underline shrink-0"
          >
            <ArrowLeft size={14} />
            My courses
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <BookOpen size={18} className="text-[#4a6a9b]" />
        <h3 className="font-semibold text-[#2c2824]">Learning materials</h3>
      </div>

      <CourseLearningMaterials resources={resources} mode="student" />
    </StudentLayout>
  );
};

export default StudentCourseLearning;
