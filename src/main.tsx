import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/dashboard.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext'
import { EnrollmentProvider } from './context/EnrollmentContext'
import { CourseResourcesProvider } from './context/CourseResourcesContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <EnrollmentProvider>
        <CourseResourcesProvider>
          <App />
        </CourseResourcesProvider>
      </EnrollmentProvider>
    </AuthProvider>
  </StrictMode>,
)
