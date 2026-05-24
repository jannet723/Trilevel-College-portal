import { useParams, useNavigate } from 'react-router-dom';
import { useCourseResources } from '../../context/CourseResourcesContext';
import { useEnrollment } from '../../context/EnrollmentContext';

export default function CourseView() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { getCourseById } = useCourseResources();
  const { isEnrolled, enroll } = useEnrollment();

  const course = courseId ? getCourseById(courseId) : null;
  const enrolled = courseId ? isEnrolled(courseId) : false;

  const handleEnroll = async () => {
    if (!courseId || !course) return;
    try {
      await enroll(courseId, course.title || 'Course');
    } catch (err) {
      console.error('Enroll error:', err);
    }
  };

  if (!course) return (
    <div className="p-8 text-center">
      <p className="text-gray-500">Course not found.</p>
      <button onClick={() => navigate(-1)} className="mt-4 btn-primary">Go Back</button>
    </div>
  );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button onClick={() => navigate(-1)} className="mb-4 text-sm text-blue-600 hover:underline">
        ← Back
      </button>
      <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
      <p className="text-gray-600 mb-2">{course.category} · {course.duration}</p>
      <p className="text-gray-700 mb-6">{course.description}</p>

      {enrolled ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-700 font-medium">
          ✅ You are enrolled in this course
        </div>
      ) : (
        <button onClick={handleEnroll} className="btn-primary px-6 py-3">
          Enrol Now
        </button>
      )}
    </div>
  );
}