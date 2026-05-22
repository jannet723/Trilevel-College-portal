import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState<'student' | 'admin'>('student')
  const [showPassword] = useState(false)
  const navigate = useNavigate()

  const stats = [
    { value: '1,240+', label: 'Enrolled Students' },
    { value: '92%', label: 'Completion Rate' },
    { value: '15', label: 'Active Courses' },
    { value: '48', label: 'Qualified Lecturers' },
  ]

  const tags = ['15 Programmes', 'Certificate & Diploma', 'Online & Blended', 'Accredited College']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement actual authentication logic
    console.log('Login attempt:', { email, password, userType })
    
    if (userType === 'student') {
      navigate('/student/dashboard')
    } else {
      navigate('/admin/dashboard')
    }
  }

  const handleStudentLogin = () => {
    handleSubmit({ preventDefault: () => {} } as React.FormEvent)
  }

  const handleAdminLogin = () => {
    setUserType('admin')
    setTimeout(() => {
      handleSubmit({ preventDefault: () => {} } as React.FormEvent)
    }, 0)
  }

  return (
    <div className="auth-shell">
      <div className="auth-left">
        <div style={{ maxWidth: '460px' }}>
          <div className="auth-brand">
            <div className="auth-mark">
              <svg viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', fontWeight: 700, color: 'var(--ink)', letterSpacing: '.01em' }}>
                Trilevel College
              </div>
              <div style={{ fontSize: '10.5px', color: 'var(--ink-3)', letterSpacing: '.05em', textTransform: 'uppercase' }}>
                of Professional Studies
              </div>
            </div>
          </div>

          <h1 className="lp-heading">Your academic<br />future starts<br /><span style={{ color: 'var(--accent)' }}>here.</span></h1>
          <p className="lp-sub">Enrol in Certificate and Diploma programmes — AI, Business, Theology, Hospitality, Social Work, and Computer Studies — delivered on a modern academic platform.</p>

          <div className="lp-tags">
            {tags.map((tag) => (
              <span key={tag} className="lp-tag">{tag}</span>
            ))}
          </div>

          <div className="lp-stats">
            {stats.map((stat) => (
              <div key={stat.label} className="lp-stat">
                <div className="lp-stat-val">{stat.value}</div>
                <div className="lp-stat-lbl">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
              <svg viewBox="0 0 24 24" style={{ stroke: '#fff', fill: 'none', strokeWidth: 2, width: '20px', height: '20px' }}>
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
          </div>

          <div className="f-heading">Welcome back</div>
          <div className="f-sub">Sign in to your learning portal</div>

          <div className="fg">
            <label className="fl">Email</label>
            <input
              className="fi"
              type="email"
              placeholder="you@trilevel.ac.ke"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="fg">
            <label className="fl">Password</label>
            <input
              className="fi"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <Link to="/forgot-password" className="f-link">Forgot password?</Link>

          <button className="fbtn solid" onClick={handleStudentLogin}>
            Sign in as Student
          </button>
          <button className="fbtn outline" onClick={handleAdminLogin}>
            Sign in as Admin
          </button>

          <div className="f-or"><span>New to Trilevel?</span></div>
          <Link to="/?register=1">
            <button
              className="fbtn"
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,.12)',
                color: 'rgba(255,255,255,.55)',
                borderRadius: '8px',
                padding: '10px',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                position: 'relative',
                zIndex: 1,
              }}
            >
              Create an account
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
