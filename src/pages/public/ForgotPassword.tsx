import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { authService } from '../../firebase/auth'
import { getAuthErrorMessage } from '../../utils/helpers'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isSubmitting) return
    setError('')
    setIsSubmitting(true)

    try {
      await authService.resetPassword(email)
      setSubmitted(true)
    } catch (err: any) {
      console.error('Forgot password failed', err)
      setError(getAuthErrorMessage(err))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f6f2] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md overflow-hidden rounded-4xl border border-[#e8e2d9] bg-white shadow-[0_24px_80px_-24px_rgba(44,40,36,0.15)]">
        <div className="bg-[#faf7f3] px-8 py-10 text-center">
          <img src="/logo.png" alt="Trilevel College logo" className="mx-auto h-14 w-14 object-contain" />
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b70c0c]">
            Trilevel College
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-[#2c2824]">Reset your password</h1>
          <p className="mt-2 text-sm text-[#6b645a]">Enter the email address linked to your account.</p>
        </div>

        <div className="px-8 py-8">
          {!submitted ? (
            <>
              <p className="text-sm text-[#5f5b55] mb-6">
                We will send a secure password reset link to your email. Then follow the instructions to choose a new password.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#4a4a4a] mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-2xl border border-[#e8e2d9] bg-[#fbf7f2] px-4 py-3 text-sm text-[#2c2824] focus:border-[#a7b6c8] focus:outline-none"
                    placeholder="you@trilevel.ac.ke"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full rounded-2xl px-4 py-3 text-sm font-semibold text-white transition ${isSubmitting ? 'bg-[#7a93b0] cursor-not-allowed' : 'bg-[#2c4a7a] hover:bg-[#23486a]'}`}
                >
                  {isSubmitting ? 'Sending link...' : 'Send reset link'}
                </button>
              </form>

              {error && (
                <div className="mt-4 rounded-2xl border border-[#f0d0d0] bg-[#fef5f5] px-4 py-3 text-sm text-[#b70c0c]">
                  {error}
                </div>
              )}

              <div className="mt-6 text-center">
                <Link to="/login" className="text-[#2563eb] hover:text-[#1e40af] font-semibold">
                  Back to sign in
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="rounded-2xl border border-[#d4f1db] bg-[#ecf8ef] px-6 py-5 text-[#2c6b41]">
                <p className="font-semibold">Success!</p>
                <p className="mt-2 text-sm">If an account exists for that email, a password reset link has been sent.</p>
              </div>
              <div className="mt-6">
                <Link to="/login" className="text-[#4a6a9b] hover:text-[#2c4a7a] font-semibold">
                  Back to sign in
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
