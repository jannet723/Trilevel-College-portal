import { useParams, useNavigate } from 'react-router-dom';
import { useCourseResources } from '../../context/CourseResourcesContext';
import { useEnrollment } from '../../context/EnrollmentContext';

export default function StudentCourseLearning() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { getCourseById, getResourcesForCourse } = useCourseResources();
  const { isEnrolled } = useEnrollment();

  const course    = courseId ? getCourseById(courseId) : null;
  const enrolled  = courseId ? isEnrolled(courseId) : false;
  const resources = courseId ? getResourcesForCourse(courseId) : [];

  if (!course) return (
    <div className="p-8 text-center">
      <p className="text-gray-500">Course not found.</p>
      <button onClick={() => navigate(-1)} className="mt-4 btn-primary">Go Back</button>
    </div>
  );

  if (!enrolled) return (
    <div className="p-8 text-center">
      <p className="text-gray-500 mb-4">You are not enrolled in this course.</p>
      <button onClick={() => navigate(-1)} className="btn-primary">Go Back</button>
    </div>
  );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button onClick={() => navigate(-1)} className="mb-4 text-sm text-blue-600 hover:underline">
        ← Back
      </button>
      <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
      <p className="text-gray-600 mb-6">{course.description}</p>

      <h2 className="text-lg font-semibold mb-3">Course Materials</h2>
      {resources.length === 0 ? (
        <p className="text-gray-400">No materials uploaded yet.</p>
      ) : (
        <ul className="space-y-3">
          {resources.map((r: any) => (
            <li key={r.id} className="border rounded-xl p-4 bg-white flex items-center justify-between">
              <span className="font-medium">{r.title}</span>
              {r.url && (
                <a href={r.url} target="_blank" rel="noreferrer"
                  className="text-blue-600 text-sm hover:underline">
                  Open →
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}