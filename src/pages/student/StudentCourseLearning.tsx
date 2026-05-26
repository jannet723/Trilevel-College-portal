import { Link, useNavigate, useParams } from 'react-router-dom';
import { BookOpen, GraduationCap } from 'lucide-react';
import { getCourseById } from '../../data/courses';
import { useEnrollment } from '../../context/EnrollmentContext';
import { useCourseResources } from '../../context/CourseResourcesContext';
import StudentLayout from '../../layouts/StudentLayout';
import StudentLearningWorkspace from '../../components/student/StudentLearningWorkspace';

export default function StudentCourseLearning() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { isEnrolled } = useEnrollment();
  const { getResourcesForCourse } = useCourseResources();

  const course = courseId ? getCourseById(courseId) : undefined;
  const enrolled = courseId ? isEnrolled(String(courseId)) : false;
  const resources = courseId ? getResourcesForCourse(courseId) : [];

  if (!course) {
    return (
      <StudentLayout title="Course" subtitle="Learning space" backTo="/student/my-courses">
        <div className="max-w-lg mx-auto py-16 text-center portal-panel portal-panel--solid rounded-2xl p-10">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#f0ece6] flex items-center justify-center text-[#b0a89e]">
            <BookOpen size={26} />
          </div>
          <h2 className="home-display text-xl text-[#2c2824] mb-2">Course not found</h2>
          <p className="text-sm text-[#6b645a] mb-6">
            This programme may have been removed or the link is outdated.
          </p>
          <Link to="/student/my-courses" className="home-cta-primary inline-flex">
            Back to My Courses
          </Link>
        </div>
      </StudentLayout>
    );
  }

  if (!enrolled) {
    return (
      <StudentLayout title={course.title} subtitle="Learning space" backTo="/student/my-courses">
        <div className="max-w-lg mx-auto py-16 text-center portal-panel portal-panel--solid rounded-2xl p-10">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#fef5e8] flex items-center justify-center text-[#9a7530]">
            <GraduationCap size={26} />
          </div>
          <h2 className="home-display text-xl text-[#2c2824] mb-2">Enrol to access materials</h2>
          <p className="text-sm text-[#6b645a] mb-6">
            You need to be enrolled in this programme before you can open learning materials.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/courses" className="home-cta-primary inline-flex">
              Browse courses
            </Link>
            <button type="button" onClick={() => navigate(-1)} className="home-cta-ghost inline-flex">
              Go back
            </button>
          </div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout
      title="Study"
      subtitle={`${course.code} · ${course.title}`}
      backTo="/student/my-courses"
    >
      <StudentLearningWorkspace course={course} courseId={String(courseId)} resources={resources} />
    </StudentLayout>
  );
}
