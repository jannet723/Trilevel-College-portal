import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { authService } from '../firebase/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  userProfile: any;
  isAdmin: boolean;
  isLoading: boolean;
  userType?: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  register: (email: string, password: string, fullName: string, role?: string) => Promise<any>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LoadingPage = () => (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#f8f6f2]">
    <style>{`
      @keyframes spin-smooth {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes pulse-glow {
        0%, 100% { box-shadow: 0 0 0 0 rgba(74,106,155,0.12); }
        50% { box-shadow: 0 0 0 16px rgba(74,106,155,0.08); }
      }
      .spinner-ring {
        animation: spin-smooth 2.2s linear infinite;
      }
      .spinner-logo {
        animation: pulse-glow 2.4s ease-in-out infinite;
      }
    `}</style>
    <div className="relative w-36 h-36">
      <div className="absolute inset-0 rounded-full bg-white/90 shadow-[0_26px_80px_-40px_rgba(74,106,155,0.24)]" />
      <div className="absolute inset-4 rounded-full border border-[#dbe4ee]" />
      <div className="absolute inset-8 rounded-full border-4 border-transparent border-t-[#4a6a9b]/80 border-r-[#4a6a9b]/20 spinner-ring" />
      <div className="absolute inset-12 rounded-full bg-[#f8f6f2] flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-[#f8f6f2] border border-[#4a6a9b]/15 flex items-center justify-center spinner-logo shadow-[0_10px_28px_-16px_rgba(74,106,155,0.28)]">
          <img src="/logo.png" alt="" className="w-12 h-12 object-contain" />
        </div>
      </div>
    </div>
  </div>
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser]               = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isLoading, setIsLoading]     = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const snap = await getDoc(doc(db, 'users', firebaseUser.uid));
        setUserProfile(snap.exists() ? snap.data() : null);
      } else {
        setUserProfile(null);
      }
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuthenticated: !!user,
      user,
      userProfile,
      isAdmin: userProfile?.role === 'admin',
      isLoading,
      userType: userProfile?.role ?? null,
      loading: isLoading,
      login:         (email, password) => authService.login(email, password),
      logout:        async () => { await authService.logout(); setUser(null); setUserProfile(null); },
      register:      (email, password, fullName, role) => authService.register(email, password, fullName, role),
      resetPassword: (email) => authService.resetPassword(email),
    }}>
      {isLoading && <LoadingPage />}
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}