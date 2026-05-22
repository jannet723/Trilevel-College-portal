import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../../layouts/DashboardLayout'
import { Banner, StatCard, Panel, Chip } from '../../components/UI'

const AdminDashboard = () => {
  const navigate = useNavigate()

  const stats = [
    {
      label: 'Total Students',
      value: '1,240',
      icon: '👥',
      color: 'var(--accent)',
      trend: '+42 this month',
    },
    {
      label: 'Pending Approvals',
      value: '12',
      icon: '⏳',
      color: 'var(--amber)',
      trend: 'Needs review',
    },
    {
      label: 'Active Courses',
      value: '15',
      icon: '📚',
      color: 'var(--green)',
      trend: '+2 new',
    },
    {
      label: 'Total Enrolments',
      value: '3,890',
      icon: '📊',
      color: '#5a468c',
      trend: '↑ 8%',
    },
  ]

  const recentEnrolments = [
    { name: 'Amina Hassan', programme: 'Diploma in AI', date: 'May 18', status: 'Approved' },
    { name: 'Peter Kamau', programme: 'Business Admin', date: 'May 17', status: 'Pending' },
    { name: 'Grace Odhiambo', programme: 'Social Work', date: 'May 16', status: 'Approved' },
    { name: 'Brian Mutua', programme: 'Hospitality Mgt', date: 'May 15', status: 'Pending' },
    { name: 'Faith Njeri', programme: 'Computer Studies', date: 'May 14', status: 'Approved' },
  ]

  const departments = [
    { name: 'Technology', percentage: 38 },
    { name: 'Business', percentage: 24 },
    { name: 'Social Work', percentage: 18 },
    { name: 'Hospitality', percentage: 12 },
    { name: 'Theology', percentage: 8 },
  ]

  const handleSignOut = () => {
    navigate('/')
  }

  return (
    <DashboardLayout
      pageTitle="Dashboard"
      role="admin"
      onSignOut={handleSignOut}
    >
      <Banner
        title="Admin Overview"
        subtitle="Here's what's happening at Trilevel College today."
      >
        <div className="banner-actions">
          <button 
            className="btn-primary"
            onClick={() => navigate('/admin/approvals')}
          >
            Review Approvals
          </button>
          <button 
            className="btn-ghost"
            onClick={() => navigate('/admin/uploads')}
          >
            Upload Materials
          </button>
        </div>
      </Banner>

      <div className="stats-grid">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="two-col">
        <Panel title="Recent Enrolments">
          <table className="dtable">
            <thead>
              <tr>
                <th>Student</th>
                <th>Programme</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentEnrolments.map((enrolment) => (
                <tr key={enrolment.name}>
                  <td><strong>{enrolment.name}</strong></td>
                  <td>{enrolment.programme}</td>
                  <td>{enrolment.date}</td>
                  <td>
                    <Chip
                      label={enrolment.status}
                      variant={enrolment.status === 'Approved' ? 'ok' : 'pend'}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <Panel title="Enrolment by Department">
          <div style={{ padding: '16px 20px' }}>
            {departments.map((dept) => (
              <div key={dept.name} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--ink)' }}>{dept.name}</span>
                  <span style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--accent)' }}>
                    {dept.percentage}%
                  </span>
                </div>
                <div
                  style={{
                    height: '6px',
                    borderRadius: '3px',
                    background: 'var(--surface)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${dept.percentage}%`,
                      height: '100%',
                      borderRadius: '3px',
                      background: 'var(--accent)',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </DashboardLayout>
  )
}

export default AdminDashboard
