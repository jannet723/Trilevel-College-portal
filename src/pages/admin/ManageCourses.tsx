import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../../layouts/DashboardLayout'
import { Panel } from '../../components/UI'

const ManageCourses = () => {
  const navigate = useNavigate()

  const courses = [
    { title: 'Introduction to AI', students: 42, units: 12 },
    { title: 'Business Administration', students: 78, units: 18 },
    { title: 'Social Work & Community Dev.', students: 55, units: 10 },
  ]

  const handleSignOut = () => {
    navigate('/')
  }

  return (
    <DashboardLayout pageTitle="Manage Courses" role="admin" onSignOut={handleSignOut}>
      <div style={{ marginBottom: '20px' }}>
        <div className="sec-hd">
          <div>
            <h2>Manage Courses</h2>
            <p>All programmes at Trilevel College</p>
          </div>
          <button className="cbtn">New Course</button>
        </div>
      </div>

      <Panel title="">
        <table className="dtable">
          <thead>
            <tr>
              <th>Course</th>
              <th>Students</th>
              <th>Units</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.title}>
                <td>{course.title}</td>
                <td>{course.students}</td>
                <td>{course.units}</td>
                <td>
                  <div className="act-row">
                    <button className="ic-btn">✎</button>
                    <button className="ic-btn del">🗑</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </DashboardLayout>
  )
}

export default ManageCourses
