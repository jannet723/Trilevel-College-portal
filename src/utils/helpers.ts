// Utility functions
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

export const getAuthErrorMessage = (err: any): string => {
  const code = err?.code?.toString?.() ?? '';
  if (code.includes('wrong-password') || code.includes('user-not-found') || code.includes('invalid-email')) {
    return 'Invalid email or password.';
  }
  if (code.includes('too-many-requests')) {
    return 'Too many attempts. Please try again later.';
  }
  if (code.includes('network-request-failed')) {
    return 'Network issue. Please check your connection and try again.';
  }
  return err?.message || 'Invalid email or password.';
};

export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

export const debounce = (func: Function, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
