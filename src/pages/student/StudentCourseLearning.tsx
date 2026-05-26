import { useParams, useNavigate } from 'react-router-dom';
import { useCourseResources } from '../../context/CourseResourcesContext';
import { useEnrollment } from '../../context/EnrollmentContext';
import StudentLayout from '../../layouts/StudentLayout';
import { FileText, FileDown, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export default function StudentCourseLearning() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { getCourseById, getResourcesForCourse } = useCourseResources();
  const { isEnrolled } = useEnrollment();
  const [previewId, setPreviewId] = useState<string | null>(null);

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
    <StudentLayout title={course.title} subtitle={course.subtitle || ''} backTo="/student/my-courses">
      <div className="p-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="portal-panel portal-panel--solid rounded-2xl p-6 mb-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold mb-1">{course.title}</h1>
                  <p className="text-sm text-[#6b645a]">{course.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-[#9b9288]">Progress</div>
                  <div className="font-semibold text-[#2c2824]">{course.progress ?? 0}%</div>
                </div>
              </div>
            </div>

            <div className="portal-panel rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Course Materials</h2>
                <div className="text-sm text-[#9b9288]">{resources.length} items</div>
              </div>

              {resources.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#d4cfc8] p-6 text-center text-sm text-[#9b9288]">
                  No materials uploaded yet. Check back later or contact your instructor.
                </div>
              ) : (
                <ul className="space-y-3">
                  {resources.map((r: any) => (
                    <li key={r.id} className="border rounded-xl p-4 bg-white flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#f0f4fb] flex items-center justify-center text-[#3d5a86]">
                          {r.type === 'note' ? <FileText size={18} /> : <FileDown size={18} />}
                        </div>
                        <div>
                          <div className="font-medium text-[#2c2824]">{r.title}</div>
                          {r.description && <div className="text-xs text-[#9b9288]">{r.description}</div>}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 ml-auto">
                        {r.type === 'note' && r.content && (
                          <button
                            type="button"
                            onClick={() => setPreviewId(previewId === r.id ? null : r.id)}
                            className="text-sm text-[#4a6a9b] hover:underline flex items-center gap-2"
                          >
                            <FileText size={14} /> View note
                          </button>
                        )}

                        {r.url && (
                          <a href={r.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-[#2c4a7a] hover:underline">
                            <ExternalLink size={14} /> Open
                          </a>
                        )}
                      </div>

                      {previewId === r.id && r.type === 'note' && r.content && (
                        <div className="mt-3 col-span-1 bg-[#fbfbfe] border rounded-lg p-4 text-sm text-[#2c2824]">
                          <div className="prose max-w-full whitespace-pre-wrap">{r.content}</div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="portal-panel rounded-2xl p-4">
              <div className="text-sm text-[#9b9288] mb-2">Course Info</div>
              <div className="text-sm"><strong>Code:</strong> {course.code || '—'}</div>
              <div className="text-sm"><strong>Level:</strong> {course.level || '—'}</div>
              <div className="text-sm"><strong>Instructor:</strong> {course.instructor || '—'}</div>
            </div>

            <div className="portal-panel rounded-2xl p-4">
              <div className="text-sm text-[#9b9288] mb-2">How to learn</div>
              <ol className="text-sm list-decimal list-inside space-y-2 text-[#6b645a]">
                <li>Open the note or material you'd like to study.</li>
                <li>Use the 'View note' button to read inline or 'Open' to download/view externally.</li>
                <li>Work through materials sequentially and track progress on the dashboard.</li>
                <li>Ask your instructor for missing materials via the announcements tab.</li>
              </ol>
            </div>
          </aside>
        </div>
      </div>
    </StudentLayout>
  );
}