import { useState } from 'react'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement actual password reset logic
    console.log('Password reset requested for:', email)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold text-indigo-600">Trilevel College Portal</Link>
          <h2 className="text-2xl font-bold text-gray-900 mt-4">Forgot Password</h2>
        </div>

        {!submitted ? (
          <>
            <p className="text-gray-600 mb-6">
              Enter your email address and we'll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="you@example.com"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
              >
                Send Reset Link
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/login" className="text-indigo-600 hover:text-indigo-800">
                Back to Login
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              <p className="font-bold">Success!</p>
              <p>Password reset link has been sent to your email.</p>
            </div>
            <Link to="/login" className="text-indigo-600 hover:text-indigo-800">
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default ForgotPassword
