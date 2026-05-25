import { useState, useEffect, type FormEvent } from 'react';
import { X } from 'lucide-react';
import { authService } from '../../firebase/auth';
import { getAuthErrorMessage } from '../../utils/helpers';

interface ForgotPasswordOverlayProps {
  onClose: () => void;
  onOpenSignIn?: () => void;
}

const ForgotPasswordOverlay = ({ onClose, onOpenSignIn }: ForgotPasswordOverlayProps) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setError('');
    setIsSubmitting(true);

    try {
      const actionCodeSettings = {
        url: `${window.location.origin}/reset-password`,
        handleCodeInApp: true,
      };
      await authService.resetPassword(email, actionCodeSettings);
      setSubmitted(true);
    } catch (err: any) {
      console.error('Forgot password failed', err);
      setError(getAuthErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <button
        type="button"
        className="absolute inset-0 bg-[#2c2824]/10 backdrop-blur-[10px]"
        onClick={onClose}
        aria-label="Close forgot password"
      />

      <div className="register-overlay-card relative w-full max-w-88" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-20 p-1.5 rounded-lg text-[#9b9288] hover:bg-white/80 transition"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        <div className="sign-in-card rounded-3xl px-5 pt-5 pb-4 shadow-[0_24px_60px_-16px_rgba(44,40,36,0.2)]">
          <div className="text-center mb-4 pr-6">
            <img src="/logo.png" alt="" className="w-12 h-12 mx-auto object-contain mb-2" />
            <p className="text-[11px] font-bold tracking-widest text-[#b70c0c] uppercase" style={{ fontFamily: 'Georgia, serif' }}>
              Trilevel College
            </p>
            <h2 className="text-base font-semibold text-[#2c2824] mt-2">Reset your password</h2>
            <p className="text-xs text-[#9b9288]">Enter the email address linked to your account.</p>
          </div>

          <div className="px-0">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4 px-2">
                <p className="text-sm text-[#5f5b55] mb-2">
                  We will send a secure password reset link to your email. Then follow the instructions to choose a new password.
                </p>

                <div>
                  <label htmlFor="fp-email" className="block text-sm font-medium text-[#4a4a4a] mb-2">
                    Email Address
                  </label>
                  <input
                    id="fp-email"
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

                {error && (
                  <div className="mt-2 rounded-2xl border border-[#f0d0d0] bg-[#fef5f5] px-4 py-3 text-sm text-[#b70c0c]">
                    {error}
                  </div>
                )}

                <div className="mt-2 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      if (typeof onOpenSignIn === 'function') {
                        onOpenSignIn();
                      }
                    }}
                    className="text-[#4a6a9b] hover:text-[#2c4a7a] font-semibold"
                  >
                    Back to sign in
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center px-4">
                <div className="rounded-2xl border border-[#d4f1db] bg-[#ecf8ef] px-6 py-5 text-[#2c6b41]">
                  <p className="font-semibold">Success!</p>
                  <p className="mt-2 text-sm">If an account exists for that email, a password reset link has been sent.</p>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      if (typeof onOpenSignIn === 'function') {
                        onOpenSignIn();
                      }
                    }}
                    className="text-[#4a6a9b] hover:text-[#2c4a7a] font-semibold"
                  >
                    Back to sign in
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordOverlay;
