import { useEffect, useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn, UserPlus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../firebase/auth';
import { getAuthErrorMessage } from '../../utils/helpers';

const EyeIcon = ({ show }: { show: boolean }) =>
  show ? <Eye size={16} /> : <EyeOff size={16} />;

interface SignInOverlayProps {
  onClose: () => void;
  onOpenRegister: () => void;
  onOpenForgot?: () => void;
}

const SignInOverlay = ({ onClose, onOpenRegister, onOpenForgot }: SignInOverlayProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setError('');
    setIsSubmitting(true);

    try {
      const cred = await authService.login(email, password);
      const profile = await authService.getUserProfile(cred.user.uid);
      // Route based on stored role
      const isAdmin = profile?.role === 'admin';
      if (isAdmin) {
        navigate('/admin/dashboard');
      } else {
        navigate('/student/dashboard');
      }
      onClose();
    } catch (err: any) {
      console.error('Sign in failed', err);
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
        aria-label="Close sign in"
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
            <h2 className="text-base font-semibold text-[#2c2824] mt-2">Welcome back</h2>
            <p className="text-xs text-[#9b9288]">Sign in to your portal</p>
          </div>

          {/* No role selection - sign in covers both students and admins based on stored role */}

          <form onSubmit={handleSubmit} className="space-y-2.5">
            <div className={`sign-in-field flex items-center gap-2.5 rounded-lg px-3 py-2 ${emailFocused ? 'sign-in-field--active' : ''}`}>
              <Mail size={14} className={emailFocused ? 'text-[#4a6a9b]' : 'text-[#c0b8ae]'} />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                className="flex-1 bg-transparent text-xs focus:outline-none"
                required
              />
            </div>
            <div className={`sign-in-field flex items-center gap-2.5 rounded-lg px-3 py-2 ${passwordFocused ? 'sign-in-field--active' : ''}`}>
              <Lock size={14} className={passwordFocused ? 'text-[#4a6a9b]' : 'text-[#c0b8ae]'} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                className="flex-1 bg-transparent text-xs focus:outline-none"
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-[#c0b8ae] hover:text-[#4a6a9b]">
                <EyeIcon show={showPassword} />
              </button>
            </div>
            {/* admin note removed since role is determined by account data */}
            {error && (
              <p className="text-[10px] text-center text-[#b70c0c] bg-[#fef5f5] border border-[#f0d0d0] rounded-lg px-2.5 py-1.5">
                {error}
              </p>
            )}
            <div className="flex justify-between items-center text-[11px] font-medium text-[#4a6a9b]">
              <span>&nbsp;</span>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (typeof onOpenForgot === 'function') onOpenForgot();
                  else navigate('/forgot-password');
                }}
                className="text-[#4a6a9b] hover:text-[#2c4a7a] transition"
              >
                Forgot password?
              </button>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`sign-in-submit w-full py-2.5 rounded-lg text-xs font-semibold text-white flex items-center justify-center gap-1.5 ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              <LogIn size={14} />
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="my-4 flex items-center gap-2">
            <div className="flex-1 h-px bg-[#e0d9d0]/80" />
            <span className="text-[9px] text-[#b0a89e] uppercase">or</span>
            <div className="flex-1 h-px bg-[#e0d9d0]/80" />
          </div>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenRegister();
            }}
            className="w-full py-2.5 rounded-lg text-xs font-medium border border-[#e8e2d9] bg-white/70 flex items-center justify-center gap-1.5 hover:border-[#4a6a9b]/30"
          >
            <UserPlus size={14} className="text-[#4a6a9b]" />
            Create an account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInOverlay;
