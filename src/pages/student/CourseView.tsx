import React from 'react';
import { useParams } from 'react-router-dom';

const CourseView: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();

  return (
    <div className="course-view">
      <h1>Course Details</h1>
      <p>Viewing course: {courseId}</p>
    </div>
  );
};

export default CourseView;
