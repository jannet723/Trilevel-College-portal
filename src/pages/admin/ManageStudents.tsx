import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../../layouts/DashboardLayout'
import { Panel, Chip } from '../../components/UI'

const ManageStudents = () => {
  const navigate = useNavigate()
  const [] = useState('')

  const students = [
    {
      name: 'Jane Wanjiku',
      id: 'TLC/2024/0078',
      email: 'jane@student.trilevel.ac.ke',
      programme: 'Intro to AI',
      year: 'Year 1',
      status: 'Active',
    },
    {
      name: 'Amina Hassan',
      id: 'TLC/2024/0081',
      email: 'amina@student.trilevel.ac.ke',
      programme: 'Diploma in AI',
      year: 'Year 1',
      status: 'Active',
    },
    {
      name: 'Peter Kamau',
      id: 'TLC/2024/0085',
      email: 'peter@student.trilevel.ac.ke',
      programme: 'Business Admin',
      year: 'Year 1',
      status: 'Pending',
    },
    {
      name: 'Grace Odhiambo',
      id: 'TLC/2023/0042',
      email: 'grace@student.trilevel.ac.ke',
      programme: 'Social Work',
      year: 'Year 2',
      status: 'Active',
    },
    {
      name: 'Faith Njeri',
      id: 'TLC/2023/0051',
      email: 'faith@student.trilevel.ac.ke',
      programme: 'Computer Studies',
      year: 'Year 2',
      status: 'Active',
    },
  ]

  const handleSignOut = () => {
    navigate('/')
  }

  return (
    <DashboardLayout pageTitle="Students" role="admin" onSignOut={handleSignOut}>
      <div style={{ marginBottom: '20px' }}>
        <div className="sec-hd">
          <div>
            <h2>Students</h2>
            <p>Manage all enrolled students</p>
          </div>
          <button className="cbtn">
            <svg viewBox="0 0 24 24">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Student
          </button>
        </div>
      </div>

      <Panel title="">
        <table className="dtable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Student ID</th>
              <th>Programme</th>
              <th>Year</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>
                  <div style={{ fontWeight: 600 }}>{student.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--ink-3)' }}>{student.email}</div>
                </td>
                <td>{student.id}</td>
                <td>{student.programme}</td>
                <td>{student.year}</td>
                <td>
                  <Chip
                    label={student.status}
                    variant={student.status === 'Active' ? 'ok' : 'pend'}
                  />
                </td>
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

export default ManageStudents
