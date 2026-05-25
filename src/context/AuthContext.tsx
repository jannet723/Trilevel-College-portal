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
      {isLoading ? (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f8f6f2] text-[#2c2824]">
          <style>{`
            @keyframes spin-smooth {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            .spin-smooth {
              animation: spin-smooth 2s linear infinite;
            }
          `}</style>
          <div className="flex flex-col items-center gap-6 px-6 py-8 text-center">
            <div className="relative h-28 w-28 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-[3px] border-[#e8e2d9] opacity-40" />
              <div className="absolute inset-1.5 rounded-full border-[3px] border-transparent border-t-[#4a6a9b] border-r-[#4a6a9b]/60 spin-smooth" />
              <img
                src="/logo.png"
                alt="Trilevel logo"
                className="h-16 w-16 rounded-full bg-white p-2 shadow-[0_8px_32px_-12px_rgba(74,106,155,0.25)]"
              />
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold tracking-tight text-[#2c2824]">Trilevel College Portal</p>
              <p className="max-w-xs text-sm leading-relaxed text-[#6b645a]">
                Loading your dashboard, catalogue and enrolled courses.
              </p>
            </div>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}