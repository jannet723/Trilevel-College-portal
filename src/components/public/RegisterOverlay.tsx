import { useEffect, useState } from 'react';
import {
  User,
  Mail,
  Lock,
  UserPlus,
  X,
  GraduationCap,
  Shield,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../firebase/auth';

interface RegisterOverlayProps {
  onClose: () => void;
  onOpenSignIn?: () => void;
}

const RegisterOverlay = ({ onClose, onOpenSignIn }: RegisterOverlayProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'student' as 'student' | 'admin',
  });
  const [focused, setFocused] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const cred = await authService.register(formData.email, formData.password, formData.name, formData.userType);
      const profile = await authService.getUserProfile(cred.user.uid);
      if (profile?.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/student/dashboard');
      }
      onClose();
    } catch (err: any) {
      console.error('Registration failed', err);
      setError(err?.message ?? 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center p-4 pointer-events-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="register-overlay-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-[#2c2824]/10 backdrop-blur-[10px] transition-opacity"
        onClick={onClose}
        aria-label="Close registration"
      />

      <div
        className="register-overlay-card relative w-full max-w-88 animate-fade-in-up overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-20 p-1.5 rounded-lg text-[#9b9288] hover:text-[#2c2824] hover:bg-white/80 transition"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        <div className="sign-in-card rounded-3xl px-5 pt-5 pb-4 shadow-[0_24px_60px_-16px_rgba(44,40,36,0.2)]">
          <div className="text-center mb-4 pr-6">
            <img src="/logo.png" alt="" className="w-12 h-12 mx-auto object-contain mb-2" aria-hidden />
            <p
              className="text-[11px] font-bold tracking-widest text-[#b70c0c] uppercase leading-tight"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Trilevel College
            </p>
            <p className="text-[9px] tracking-[0.15em] text-[#9b9288] uppercase">of Professional Studies</p>
            <h2
              id="register-overlay-title"
              className="text-base font-semibold text-[#2c2824] mt-2.5"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Create account
            </h2>
          </div>

          <div className="relative mb-3.5 p-0.5 rounded-lg bg-[#f0ece6]/90 border border-[#e8e2d9]/70">
            <div
              className="absolute top-0.5 bottom-0.5 w-[calc(50%-3px)] rounded-md bg-white shadow-sm ring-1 ring-[#e8e2d9]/50 transition-all duration-500 ease-in-out"
              style={{ left: formData.userType === 'student' ? '3px' : 'calc(50%)' }}
            />
            <div className="relative grid grid-cols-2">
              <button
                type="button"
                onClick={() => setFormData((p) => ({ ...p, userType: 'student' }))}
                className={`py-2 text-[10px] font-semibold flex items-center justify-center gap-1 z-10 ${
                  formData.userType === 'student' ? 'text-[#2c4a7a]' : 'text-[#9b9288]'
                }`}
              >
                <GraduationCap size={12} />
                Student
              </button>
              <button
                type="button"
                onClick={() => setFormData((p) => ({ ...p, userType: 'admin' }))}
                className={`py-2 text-[10px] font-semibold flex items-center justify-center gap-1 z-10 ${
                  formData.userType === 'admin' ? 'text-[#2c4a7a]' : 'text-[#9b9288]'
                }`}
              >
                <Shield size={12} />
                Staff
              </button>
            </div>
          </div>

          {error && (
            <p className="mb-2.5 text-[10px] text-center text-[#b70c0c] bg-[#fef5f5] border border-[#f0d0d0] rounded-lg px-2.5 py-1.5">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-2">
            <div
              className={`sign-in-field flex items-center gap-2.5 rounded-lg px-3 py-2 ${
                focused === 'name' ? 'sign-in-field--active' : ''
              }`}
            >
              <User size={14} className={focused === 'name' ? 'text-[#4a6a9b]' : 'text-[#c0b8ae]'} />
              <input
                name="name"
                required
                placeholder="Full name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused(null)}
                className="flex-1 min-w-0 bg-transparent text-xs text-[#2c2824] placeholder:text-[#b0a89e] focus:outline-none"
              />
            </div>

            <div
              className={`sign-in-field flex items-center gap-2.5 rounded-lg px-3 py-2 ${
                focused === 'email' ? 'sign-in-field--active' : ''
              }`}
            >
              <Mail size={14} className={focused === 'email' ? 'text-[#4a6a9b]' : 'text-[#c0b8ae]'} />
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                className="flex-1 min-w-0 bg-transparent text-xs text-[#2c2824] placeholder:text-[#b0a89e] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div
                className={`sign-in-field flex items-center gap-2 rounded-lg px-2.5 py-2 ${
                  focused === 'password' ? 'sign-in-field--active' : ''
                }`}
              >
                <Lock size={13} className={`shrink-0 ${focused === 'password' ? 'text-[#4a6a9b]' : 'text-[#c0b8ae]'}`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                  className="flex-1 min-w-0 bg-transparent text-xs text-[#2c2824] placeholder:text-[#b0a89e] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  className="text-[#c0b8ae] hover:text-[#4a6a9b]"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <div
                className={`sign-in-field flex items-center gap-2 rounded-lg px-2.5 py-2 ${
                  focused === 'confirmPassword' ? 'sign-in-field--active' : ''
                }`}
              >
                <Lock size={13} className={`shrink-0 ${focused === 'confirmPassword' ? 'text-[#4a6a9b]' : 'text-[#c0b8ae]'}`} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  required
                  placeholder="Confirm"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onFocus={() => setFocused('confirmPassword')}
                  onBlur={() => setFocused(null)}
                  className="flex-1 min-w-0 bg-transparent text-xs text-[#2c2824] placeholder:text-[#b0a89e] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((visible) => !visible)}
                  className="text-[#c0b8ae] hover:text-[#4a6a9b]"
                  aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`sign-in-submit w-full py-2.5 rounded-lg text-xs font-semibold text-white flex items-center justify-center gap-1.5 mt-0.5 ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              <UserPlus size={14} />
              {isSubmitting ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <p className="mt-3 text-center text-sm text-[#9b9288]">
            Have an account?{' '}
            <button
              type="button"
              onClick={() => {
                onClose();
                if (typeof onOpenSignIn === 'function') {
                  onOpenSignIn();
                } else {
                  navigate('/login');
                }
              }}
              className="font-semibold text-sm text-[#4a6a9b] hover:text-[#2c4a7a] ml-1 underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterOverlay;
