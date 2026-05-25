import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/public/Home';
import Courses from '../pages/public/Courses';
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';
import ForgotPassword from '../pages/public/ForgotPassword';
import ResetPassword from '../pages/public/ResetPassword';
import StudentDashboard from '../pages/student/StudentDashboard';
import StudentCourses from '../pages/student/StudentCourses';
import MyCourses from '../pages/student/MyCourses';
import CourseView from '../pages/student/CourseView';
import StudentCourseLearning from '../pages/student/StudentCourseLearning';
import Profile from '../pages/student/Profile';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageStudents from '../pages/admin/ManageStudents';
import ManageCourses from '../pages/admin/ManageCourses';
import Approvals from '../pages/admin/Approvals';
import UploadMaterials from '../pages/admin/UploadMaterials';
import AdminProfile from '../pages/admin/AdminProfile';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Student Routes */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/my-courses" element={<MyCourses />} />
        <Route path="/student/courses" element={<StudentCourses />} />
        <Route path="/student/course/:courseId" element={<CourseView />} />
        <Route path="/student/learn/:courseId" element={<StudentCourseLearning />} />
        <Route path="/student/profile" element={<Profile />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/manage-students" element={<ManageStudents />} />
        <Route path="/admin/manage-courses" element={<ManageCourses />} />
        <Route path="/admin/approvals" element={<Approvals />} />
        <Route path="/admin/upload-materials" element={<UploadMaterials />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
