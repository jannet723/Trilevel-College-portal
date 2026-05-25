import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { authService } from '../../firebase/auth';
import { getAuthErrorMessage } from '../../utils/helpers';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(searchParams.get('oobCode') || searchParams.get('code') || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(!!code);
  const [stage, setStage] = useState<'enterCode' | 'setPassword'>(code ? 'setPassword' : 'enterCode');

  useEffect(() => {
    const oobCode = searchParams.get('oobCode') || searchParams.get('code') || '';
    if (!oobCode) {
      setIsVerifying(false);
      return;
    }

    setCode(oobCode);
    setStage('setPassword');
    authService
      .verifyPasswordResetCode(oobCode)
      .then((emailAddress) => {
        setEmail(emailAddress);
        setError('');
      })
      .catch((err: any) => {
        console.error('Password reset code verification failed', err);
        setError(getAuthErrorMessage(err) || 'This password reset link is invalid or has expired.');
        setStage('enterCode');
      })
      .finally(() => setIsVerifying(false));
  }, [searchParams]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (stage === 'enterCode') {
      if (!code.trim()) {
        setError('Please enter the reset code from your email.');
        return;
      }

      setError('');
      setIsVerifying(true);
      authService
        .verifyPasswordResetCode(code.trim())
        .then((emailAddress) => {
          setEmail(emailAddress);
          setError('');
          setStage('setPassword');
        })
        .catch((err: any) => {
          console.error('Password reset code verification failed', err);
          setError(getAuthErrorMessage(err) || 'This reset code is invalid or has expired.');
        })
        .finally(() => setIsVerifying(false));

      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      await authService.confirmPasswordReset(code, password);
      setSuccess(true);
    } catch (err: any) {
      console.error('Password reset failed', err);
      setError(getAuthErrorMessage(err) || 'Unable to reset your password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f6f2] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md overflow-hidden rounded-4xl border border-[#e8e2d9] bg-white shadow-[0_24px_60px_-24px_rgba(44,40,36,0.15)]">
        <div className="bg-[#faf7f3] px-8 py-10 text-center">
          <img src="/logo.png" alt="Trilevel College logo" className="mx-auto h-14 w-14 object-contain" />
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b70c0c]">
            Trilevel College
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-[#2c2824]">Reset your password</h1>
          <p className="mt-2 text-sm text-[#6b645a]">Securely update your account password below.</p>
        </div>

        <div className="px-8 py-8">
          {isVerifying ? (
            <p className="text-sm text-[#6b645a] text-center">Checking your reset link…</p>
          ) : success ? (
            <div className="space-y-4 text-center">
              <div className="rounded-2xl border border-[#d4f1db] bg-[#ecf8ef] px-6 py-5 text-[#2c6b41]">
                <p className="font-semibold">Password updated!</p>
                <p className="mt-2 text-sm">You may now sign in with your new password.</p>
              </div>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="w-full rounded-2xl bg-[#2c4a7a] px-4 py-3 text-sm font-semibold text-white hover:bg-[#23486a] transition"
              >
                Back to sign in
              </button>
            </div>
          ) : stage === 'enterCode' ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="text-sm text-[#6b645a]">
                Paste the reset code from your email below to continue.
              </div>
              <div>
                <label htmlFor="reset-code" className="block text-sm font-medium text-[#4a4a4a] mb-2">
                  Reset code
                </label>
                <input
                  id="reset-code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full rounded-2xl border border-[#e8e2d9] bg-[#fbf7f2] px-4 py-3 text-sm text-[#2c2824] focus:border-[#a7b6c8] focus:outline-none"
                  placeholder="Enter code from email"
                  required
                />
              </div>

              {error && (
                <div className="rounded-2xl border border-[#f0d0d0] bg-[#fef5f5] px-4 py-3 text-sm text-[#b70c0c]">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isVerifying}
                className={`w-full rounded-2xl px-4 py-3 text-sm font-semibold text-white transition ${isVerifying ? 'bg-[#7a93b0] cursor-not-allowed' : 'bg-[#2c4a7a] hover:bg-[#23486a]'}`}
              >
                {isVerifying ? 'Verifying code...' : 'Verify code'}
              </button>

              <button
                type="button"
                onClick={() => navigate('/login')}
                className="w-full rounded-2xl border border-[#e8e2d9] bg-[#faf7f3] px-4 py-3 text-sm font-semibold text-[#2c4a7a] hover:bg-[#f3f1ee] transition"
              >
                Back to sign in
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="text-sm text-[#6b645a]">
                Reset password for <strong>{email || 'your account'}</strong>.
              </div>
              <div>
                <label htmlFor="reset-password" className="block text-sm font-medium text-[#4a4a4a] mb-2">
                  New password
                </label>
                <div className="relative">
                  <input
                    id="reset-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-2xl border border-[#e8e2d9] bg-[#fbf7f2] px-4 py-3 pr-12 text-sm text-[#2c2824] focus:border-[#a7b6c8] focus:outline-none"
                    placeholder="New password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute inset-y-0 right-3 flex items-center text-[#8c8c8c] hover:text-[#4a6a9b]"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="reset-password-confirm" className="block text-sm font-medium text-[#4a4a4a] mb-2">
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    id="reset-password-confirm"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-2xl border border-[#e8e2d9] bg-[#fbf7f2] px-4 py-3 pr-12 text-sm text-[#2c2824] focus:border-[#a7b6c8] focus:outline-none"
                    placeholder="Confirm new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((value) => !value)}
                    className="absolute inset-y-0 right-3 flex items-center text-[#8c8c8c] hover:text-[#4a6a9b]"
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
                {isSubmitting ? 'Resetting password...' : 'Reset password'}
              </button>

              <button
                type="button"
                onClick={() => navigate('/login')}
                className="w-full rounded-2xl border border-[#e8e2d9] bg-[#faf7f3] px-4 py-3 text-sm font-semibold text-[#2c4a7a] hover:bg-[#f3f1ee] transition"
              >
                Back to sign in
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
