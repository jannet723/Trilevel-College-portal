import { useEffect, useState, type FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseById } from '../../data/courses';
import { useEnrollment } from '../../context/EnrollmentContext';
import { useAuth } from '../../context/AuthContext';

const CourseView = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user, userProfile } = useAuth();
  const { isEnrolled, enroll } = useEnrollment();
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [form, setForm] = useState({
    fullName: userProfile?.fullName || user?.displayName || '',
    email: user?.email || '',
    phone: userProfile?.phone || '',
    dateOfBirth: userProfile?.dateOfBirth || '',
    nationality: userProfile?.nationality || '',
    location: userProfile?.county || '',
    currentSchool: userProfile?.currentSchool || '',
    highestQualification: userProfile?.highestQualification || '',
    preferredStartDate: '',
    motivation: '',
    supportNeeds: '',
  });

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      fullName: userProfile?.fullName || user?.displayName || '',
      email: user?.email || '',
      phone: userProfile?.phone || '',
      dateOfBirth: userProfile?.dateOfBirth || '',
      nationality: userProfile?.nationality || '',
      location: userProfile?.county || '',
      currentSchool: userProfile?.currentSchool || '',
      highestQualification: userProfile?.highestQualification || '',
    }));
  }, [userProfile, user]);

  const course = courseId ? getCourseById(courseId) : null;
  const enrolled = courseId ? isEnrolled(courseId) : false;

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleEnrollSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!courseId || !course) return;
    if (!user) {
      navigate('/login');
      return;
    }

    setSubmitting(true);
    try {
      await enroll(
        courseId,
        course.title || 'Course',
        form.motivation.trim() || 'Enrollment application',
        {
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          dateOfBirth: form.dateOfBirth,
          nationality: form.nationality,
          location: form.location,
          currentSchool: form.currentSchool,
          highestQualification: form.highestQualification,
          preferredStartDate: form.preferredStartDate,
          motivation: form.motivation,
          supportNeeds: form.supportNeeds,
        }
      );

      setSuccessMessage('Your enrollment request has been submitted. We will contact you with the next steps.');
      setShowForm(false);
    } catch (err) {
      console.error('Enroll error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!course) return (
    <div className="p-8 text-center">
      <p className="text-gray-500">Course not found.</p>
      <button onClick={() => navigate(-1)} className="mt-4 btn-primary">Go Back</button>
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button onClick={() => navigate(-1)} className="mb-4 text-sm text-blue-600 hover:underline">
        ← Back
      </button>
      <div className="rounded-3xl border border-[#e8e2d9] bg-white/95 p-8 shadow-sm">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-[#2c2824] mb-3">{course.title}</h1>
          <p className="text-sm uppercase tracking-[0.24em] text-[#9b9288] mb-2">{course.department}</p>
          <p className="text-sm text-[#6b645a] mb-4">{course.duration} · {course.units} units · {course.level}</p>
          <p className="text-gray-700 leading-relaxed">{course.description}</p>
        </div>

        {enrolled ? (
          <div className="rounded-3xl border border-green-200 bg-green-50 p-5 text-green-700 font-medium">
            ✅ You are already enrolled in this course.
          </div>
        ) : (
          <div className="space-y-6">
            {successMessage && (
              <div className="rounded-3xl border border-green-200 bg-green-50 p-5 text-green-700">
                {successMessage}
              </div>
            )}

            {!showForm ? (
              <div className="rounded-3xl border border-[#e8e2d9] bg-[#faf8f5] p-6">
                <h2 className="text-xl font-semibold text-[#2c2824] mb-2">Enroll in this course</h2>
                <p className="text-sm text-[#6b645a] mb-4">
                  You are signed in. Complete your student details and submit the enrollment form to request admission for this programme.
                </p>
                <button
                  type="button"
                  onClick={() => setShowForm(true)}
                  className="rounded-2xl bg-[#2563eb] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#1e40af] transition"
                >
                  Complete Enrollment Form
                </button>
              </div>
            ) : (
              <form onSubmit={handleEnrollSubmit} className="space-y-6 bg-white/90 border border-[#e8e2d9] rounded-3xl p-6 shadow-sm">
                <div>
                  <h2 className="text-xl font-semibold text-[#2c2824] mb-2">Student profile & enrollment details</h2>
                  <p className="text-sm text-[#6b645a]">All fields are saved with your enrollment request.</p>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <label className="block text-sm text-[#4a4a4a]">
                    Full name
                    <input
                      type="text"
                      value={form.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      className="mt-2 w-full rounded-xl border border-[#ded7cc] px-3 py-2 text-sm"
                      required
                    />
                  </label>
                  <label className="block text-sm text-[#4a4a4a]">
                    Email address
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="mt-2 w-full rounded-xl border border-[#ded7cc] px-3 py-2 text-sm"
                      required
                    />
                  </label>
                  <label className="block text-sm text-[#4a4a4a]">
                    Phone number
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="mt-2 w-full rounded-xl border border-[#ded7cc] px-3 py-2 text-sm"
                      placeholder="e.g. +254 700 000 000"
                    />
                  </label>
                  <label className="block text-sm text-[#4a4a4a]">
                    Date of birth
                    <input
                      type="date"
                      value={form.dateOfBirth}
                      onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                      className="mt-2 w-full rounded-xl border border-[#ded7cc] px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="block text-sm text-[#4a4a4a]">
                    Nationality
                    <input
                      type="text"
                      value={form.nationality}
                      onChange={(e) => handleChange('nationality', e.target.value)}
                      className="mt-2 w-full rounded-xl border border-[#ded7cc] px-3 py-2 text-sm"
                      placeholder="Country of citizenship"
                    />
                  </label>
                  <label className="block text-sm text-[#4a4a4a]">
                    Residence / county
                    <input
                      type="text"
                      value={form.location}
                      onChange={(e) => handleChange('location', e.target.value)}
                      className="mt-2 w-full rounded-xl border border-[#ded7cc] px-3 py-2 text-sm"
                      placeholder="City or county"
                    />
                  </label>
                  <label className="block text-sm text-[#4a4a4a]">
                    Current school / workplace
                    <input
                      type="text"
                      value={form.currentSchool}
                      onChange={(e) => handleChange('currentSchool', e.target.value)}
                      className="mt-2 w-full rounded-xl border border-[#ded7cc] px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="block text-sm text-[#4a4a4a]">
                    Highest qualification
                    <input
                      type="text"
                      value={form.highestQualification}
                      onChange={(e) => handleChange('highestQualification', e.target.value)}
                      className="mt-2 w-full rounded-xl border border-[#ded7cc] px-3 py-2 text-sm"
                      placeholder="e.g. Diploma, KCSE, Bachelor’s degree"
                    />
                  </label>
                  <label className="block text-sm text-[#4a4a4a]">
                    Preferred start date
                    <input
                      type="month"
                      value={form.preferredStartDate}
                      onChange={(e) => handleChange('preferredStartDate', e.target.value)}
                      className="mt-2 w-full rounded-xl border border-[#ded7cc] px-3 py-2 text-sm"
                    />
                  </label>
                </div>

                <div className="grid gap-4">
                  <label className="block text-sm text-[#4a4a4a]">
                    Why do you want to enroll in this course?
                    <textarea
                      value={form.motivation}
                      onChange={(e) => handleChange('motivation', e.target.value)}
                      rows={5}
                      className="mt-2 w-full rounded-xl border border-[#ded7cc] px-3 py-2 text-sm"
                      placeholder="Tell us what motivates you and how this programme fits your goals"
                      required
                    />
                  </label>
                  <label className="block text-sm text-[#4a4a4a]">
                    Accessibility or support needs
                    <textarea
                      value={form.supportNeeds}
                      onChange={(e) => handleChange('supportNeeds', e.target.value)}
                      rows={4}
                      className="mt-2 w-full rounded-xl border border-[#ded7cc] px-3 py-2 text-sm"
                      placeholder="Optional: share any learning support or access needs"
                    />
                  </label>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="rounded-2xl border border-[#d4cfc8] px-5 py-3 text-sm text-[#6b645a] hover:bg-[#faf8f5] transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-2xl bg-[#2563eb] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1e40af] transition disabled:opacity-60"
                  >
                    {submitting ? 'Submitting...' : 'Submit enrollment request'}
                  </button>
                </div>
                <p className="text-xs text-[#9b9288]">By submitting, you confirm that these details are correct. Our admissions team will contact you shortly.</p>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseView;
