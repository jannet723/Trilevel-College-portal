import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/dashboard.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext'
import { EnrollmentProvider } from './context/EnrollmentContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <EnrollmentProvider>
        <App />
      </EnrollmentProvider>
    </AuthProvider>
  </StrictMode>,
)
