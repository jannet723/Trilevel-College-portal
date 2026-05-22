import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../../layouts/DashboardLayout'
import { Panel, Chip } from '../../components/UI'

const Approvals = () => {
  const navigate = useNavigate()

  const approvals = [
    {
      name: 'Peter Kamau',
      type: 'New Enrolment',
      programme: 'Business Admin',
      date: 'May 17',
      status: 'Pending',
    },
    {
      name: 'Brian Mutua',
      type: 'New Enrolment',
      programme: 'Hospitality',
      date: 'May 15',
      status: 'Pending',
    },
    {
      name: 'Samuel Ochieng',
      type: 'Course Change',
      programme: 'Intro to AI → Diploma AI',
      date: 'May 14',
      status: 'Pending',
    },
    {
      name: 'Lucy Wambui',
      type: 'New Registration',
      programme: 'Theology',
      date: 'May 13',
      status: 'Pending',
    },
  ]

  const handleSignOut = () => {
    navigate('/')
  }

  return (
    <DashboardLayout pageTitle="Approvals" role="admin" onSignOut={handleSignOut}>
      <div style={{ marginBottom: '20px' }}>
        <div className="sec-hd">
          <div>
            <h2>Approvals</h2>
            <p>Pending student and enrolment requests</p>
          </div>
        </div>
      </div>

      <Panel title="">
        <table className="dtable">
          <thead>
            <tr>
              <th>Student</th>
              <th>Request Type</th>
              <th>Programme</th>
              <th>Submitted</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {approvals.map((approval) => (
              <tr key={approval.name}>
                <td><strong>{approval.name}</strong></td>
                <td>{approval.type}</td>
                <td>{approval.programme}</td>
                <td>{approval.date}</td>
                <td>
                  <Chip label={approval.status} variant="pend" />
                </td>
                <td>
                  <div className="act-row">
                    <button style={{
                      padding: '5px 14px',
                      borderRadius: '6px',
                      border: 'none',
                      background: 'var(--green-dim)',
                      color: 'var(--green)',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}>
                      Approve
                    </button>
                    <button style={{
                      padding: '5px 14px',
                      borderRadius: '6px',
                      border: 'none',
                      background: 'var(--red-dim)',
                      color: 'var(--red)',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}>
                      Reject
                    </button>
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

export default Approvals
