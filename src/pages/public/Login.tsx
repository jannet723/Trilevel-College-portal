import { useState, type FormEvent } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../../firebase/auth'
import { getAuthErrorMessage } from '../../utils/helpers'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isSubmitting) return
    setError('')
    setIsSubmitting(true)

    try {
      const cred = await authService.login(email, password)
      const profile = await authService.getUserProfile(cred.user.uid)
      if (profile?.role === 'admin') navigate('/admin/dashboard')
      else navigate('/student/dashboard')
    } catch (err: any) {
      console.error('Login failed', err)
      setError(getAuthErrorMessage(err))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f6f2] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-4xl border border-[#e8e2d9] bg-white shadow-[0_24px_60px_-24px_rgba(44,40,36,0.18)] overflow-hidden">
        <div className="px-8 py-10 text-center bg-[#faf7f3]">
          <img src="/logo.png" alt="Trilevel College logo" className="mx-auto h-14 w-14 object-contain" />
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b70c0c]">
            Trilevel College
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-[#2c2824]">Sign in</h1>
          <p className="mt-2 text-sm text-[#6b645a]">Access your student or admin portal.</p>
        </div>

        <div className="px-8 py-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-[#4a4a4a] mb-2">
                Email address
              </label>
              <input
                id="login-email"
                type="email"
                className="w-full rounded-2xl border border-[#e8e2d9] bg-[#fbf7f2] px-4 py-3 text-sm text-[#2c2824] focus:border-[#a7b6c8] focus:outline-none"
                placeholder="you@trilevel.ac.ke"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-[#4a4a4a] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  className="w-full rounded-2xl border border-[#e8e2d9] bg-[#fbf7f2] px-4 py-3 pr-12 text-sm text-[#2c2824] focus:border-[#a7b6c8] focus:outline-none"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute inset-y-0 right-3 flex items-center text-[#8c8c8c] hover:text-[#2563eb]"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-2xl border border-[#f0d0d0] bg-[#fef5f5] px-4 py-3 text-sm text-[#b70c0c]">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full rounded-2xl px-4 py-3 text-sm font-semibold text-white transition ${isSubmitting ? 'bg-[#7a93b0] cursor-not-allowed' : 'bg-[#2c4a7a] hover:bg-[#23486a]'}`}
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-4 flex flex-col gap-3 text-sm">
            <Link to="/?forgot=1" className="text-[#2563eb] hover:text-[#1e40af] text-center">
              Forgot password?
            </Link>
            <Link to="/?register=1" className="rounded-2xl border border-[#e8e2d9] bg-[#faf7f3] px-4 py-3 text-center text-sm font-semibold text-[#1e40af] hover:bg-[#f3f1ee]">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
